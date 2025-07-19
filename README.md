# Prescripto - Appointment Booking System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

A comprehensive Hospital Management System built on the MERN stack to streamline hospital operations, enhance patient care, and improve the overall healthcare experience.

---

## 🚀 Deployment Links

* **Live User Website:** [prescripto-frontend-pi.vercel.app/](https://prescripto-frontend-pi.vercel.app/)
* **Live Admin/Doctor Website:** [prescripto-admin-mauve.vercel.app](https://prescripto-admin-mauve.vercel.app)
* **Live Backend Server:** [https://prescripto-backend-io55.onrender.com](https://prescripto-backend-io55.onrender.com)

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Running the Application](#running-the-application)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## 🌟 About The Project

**Prescripto** is a full-featured hospital management system designed to digitize and simplify interactions between patients, doctors, and hospital administrators. It provides a scalable and user-friendly platform featuring secure user authentication, efficient appointment scheduling and comprehensive patient record management. The core of the project is to solve the inefficiencies of traditional appointment and patient record management, creating a seamless and organized experience for everyone involved.

---

## ✨ Features

- **Secure User Authentication**: Robust and secure login/registration system for patients, doctors, and administrators using JWT.
- **Role-Based Dashboards**: Separate, feature-rich dashboards tailored to the needs of each user role (Admin, Doctor, Patient).
- **Efficient Appointment Scheduling**: Easily book, view and cancel appointments.
- **Comprehensive Patient Records Management**: A centralized system to store, access, and update patient health records securely.
- **Robust Payment System**: Integrated with Razorpay Payments Gateway for secure transactions.
- **Admin Control Panel**: Powerful dashboard for administrators to manage users, oversee appointments, and view system analytics.

---

## 🛠️ Tech Stack

This project is built with a modern web technology stack:

- **Frontend**: [React.js](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)

---

## 📂 Project Structure

The repository is organized into three main directories, reflecting a micro-frontend architecture:
```
├── admin/      # Contains the React source code for the Admin and Doctor panels
├── backend/    # Contains the Node.js/Express.js server, API endpoints, and database models
└── frontend/   # Contains the React source code for the Patient panel
```

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or access to a MongoDB Atlas cluster.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/pavankumar4404/prescripto-doctor-appointment-booking.git](https://github.com/pavankumar4404/prescripto-doctor-appointment-booking.git)
    cd prescripto-doctor-appointment-booking
    ```

2.  **Set up Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=8080
    ```

3.  **Set up Admin/Doctor Panel:**
    ```bash
    cd ../admin
    npm install
    ```

4.  **Set up Patient Panel:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

You will need to run the three parts of the application concurrently in separate terminal windows.

1.  **Start the Backend Server:**
    ```bash
    # In the /backend directory
    npm run server
    ```

2.  **Start the Admin/Doctor Panel:**
    ```bash
    # In the /admin directory
    npm run dev
    ```

3.  **Start the Patient Panel:**
    ```bash
    # In the /frontend directory
    npm run dev
    ```

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

---

## 📞 Contact

Kalyanam Pavan Kumar - [@pavankumar4404](https://github.com/pavankumar4404), [Linkedin](https://www.linkedin.com/in/kalyanam-pavan-kumar-120195260/)
