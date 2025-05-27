import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId).select("-password");

        res.json({ success: true, userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// API to update user profile 
const updateProfile = async (req, res) => {
    try{
        const userId = req.userId;
        const { name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender});
        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageUrl});
        }

        res.json({ success: true, message: "Profile Updated Successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
    try{
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked;
        //check for slots availability
        if (slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({ success: false, message: "Slot not available" });
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now(),
        };
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

// API to get user appointments for my-appointments page
const listAppointments = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try{
        const userId = req.userId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

        //release the slot
        const {docId, slotDate, slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment cancelled successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

// Razorpay payment integration

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make payment using Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.status(400).json({
                success: false,
                message: 'Appointment Cancelled or Not Found!'
            })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.status(201).json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try{
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            res.json({ success: true, message: "Payment successful" });
        }
        else{
            res.status(400).json({ success: false, message: "Payment failed" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay };