import axios from 'axios';
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [state, setState] = useState('Admin'); // "Admin" or "Doctor"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <div className="w-full relative">
          <p>Password</p>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 pr-10"
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[38px] right-3 text-zinc-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              onClick={() => {
                setState('Doctor');
                setEmail('');
                setPassword('');
                setShowPassword(false);
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              onClick={() => {
                setState('Admin');
                setEmail('');
                setPassword('');
                setShowPassword(false);
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;