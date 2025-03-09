/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaIdCard,
} from "react-icons/fa";
import Snowfall from "react-snowfall"; // For snowfall effect
import { motion } from "framer-motion"; // For animations

const MyProfile = () => {
  const { user } = useAuth();
  const [snowColors, setSnowColors] = useState([]);

  // Generate random colors for snowflakes
  useEffect(() => {
    const colors = [];
    const colorOptions = [
      "#ff5252",
      "#ff9800",
      "#ffeb3b",
      "#4caf50",
      "#2196f3",
      "#9c27b0",
      "#e91e63",
      "#00bcd4",
      "#673ab7",
      "#3f51b5",
      "#ffffff",
      "#f44336",
      "#ff5722",
      "#ffc107",
      "#8bc34a",
      "#03a9f4",
      "#607d8b",
      "#795548",
      "#9e9e9e",
      "#cddc39",
      "#009688",
      "#ff4081",
      "#7c4dff",
      "#00e676",
      "#ff6e40",
      "#18ffff",
      "#ffd740",
      "#69f0ae",
      "#b388ff",
      "#ff8a80",
      "#64ffda",
      "#ff80ab",
      "#a7ffeb",
      "#b9f6ca",
      "#ffe57f",
      "#ff9e80",
      "#80d8ff",
      "#ea80fc",
      "#d500f9",
      "#00b0ff",
      "#76ff03",
      "#ff1744",
      "#f50057",
      "#651fff",
      "#3d5afe",
      "#00e5ff",
      "#1de9b6",
      "#ff3d00",
      "#c6ff00",
      "#ff9100",
      "#d50000",
    ];

    // Create array of 10 images with random colors
    for (let i = 0; i < 10; i++) {
      const color =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const snowflake = new Image();
      const canvas = document.createElement("canvas");
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext("2d");

      // Draw a colored circle
      ctx.beginPath();
      ctx.arc(5, 5, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      snowflake.src = canvas.toDataURL();
      colors.push(snowflake);
    }

    setSnowColors(colors);
  }, []);

  if (!user) {
    return (
      <motion.div
        className="flex justify-center items-center bg-gradient-to-b from-blue-200 to-purple-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-gray-600 text-xl font-semibold">Loading...</div>
      </motion.div>
    );
  }

  // Role-specific fields configuration
  const roleFields = {
    student: [
      {
        label: "Roll Number",
        value: user.rollNumber,
        icon: <FaIdCard className="text-blue-500" />,
      },
      {
        label: "Class",
        value: user.class,
        icon: <FaBook className="text-blue-500" />,
      },
    ],
    teacher: [
      {
        label: "Subject",
        value: user.subject,
        icon: <FaBook className="text-blue-500" />,
      },
      {
        label: "Education Qualification",
        value: user.educationQualification,
        icon: <FaGraduationCap className="text-blue-500" />,
      },
    ],
    parent: [
      {
        label: "Student Roll Number",
        value: user.studentRollNumber,
        icon: <FaIdCard className="text-blue-500" />,
      },
      {
        label: "Student Class",
        value: user.studentClass,
        icon: <FaBook className="text-blue-500" />,
      },
    ],
    admin: [],
  };

  // Common fields for all roles
  const commonFields = [
    {
      label: "Email",
      value: user.email,
      icon: <FaEnvelope className="text-blue-500" />,
    },
    {
      label: "Date of Birth",
      value: user.dateOfBirth,
      icon: <FaBirthdayCake className="text-blue-500" />,
    },
    {
      label: "Phone Number",
      value: user.phoneNumber,
      icon: <FaPhone className="text-blue-500" />,
    },
    {
      label: "Address",
      value: user.address,
      icon: <FaMapMarkerAlt className="text-blue-500" />,
    },
  ];

  // Combine common fields with role-specific fields
  const displayFields = [...commonFields, ...(roleFields[user.role] || [])];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Custom Snowfall Effect with Random Colors */}
      {snowColors.length > 0 && (
        <Snowfall
          snowflakeCount={200}
          images={snowColors}
          speed={[1, 5]}
          wind={[-1, 10]}
          radius={[1, 5]}
          style={{ position: "fixed", zIndex: 20 }}
        />
      )}

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto bg-white bg-opacity-95 shadow-2xl rounded-2xl my-5 relative z-10 border border-gray-100 p-8"
      >
        <div className="text-center">
          <motion.div
            className="relative inline-block"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {/* Container for the image and rotating border */}
            <div className="relative w-40 h-40 rounded-full mx-auto mb-6">
              {/* Rotating border */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  background:
                    "conic-gradient(from 0deg, #ff7f7f, #7fff7f, #7f7fff, #333333, #ff7f7f)", // Softer colors
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  animation: "rotateBorder 2s linear infinite",
                  filter: "blur(2px)", // Soften the edges
                }}
              ></div>

              {/* Image */}
              <motion.img
                src={user.image || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="w-full h-full rounded-full object-cover shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>

            {/* Glowing effect behind image */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-400 to-black opacity-30 blur-lg -z-10"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {user.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`inline-flex items-center px-4 py-1.5 mt-3 rounded-full text-sm font-semibold shadow-md ${
              user.role === "admin"
                ? "bg-gradient-to-r from-green-300 to-green-400 text-green-900"
                : user.role === "teacher"
                ? "bg-gradient-to-r from-blue-300 to-blue-400 text-blue-900"
                : user.role === "student"
                ? "bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900"
                : "bg-gradient-to-r from-purple-300 to-purple-400 text-purple-900"
            }`}
          >
            <motion.span
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaUser className="mr-2" />
            </motion.span>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </motion.p>
        </div>

        <div className="mt-10 space-y-6">
          {displayFields.map((field, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center w-1/3 text-lg font-semibold text-gray-700">
                <motion.span
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl"
                >
                  {field.icon}
                </motion.span>
                <span className="ml-3">{field.label}:</span>
              </div>
              <p className="w-2/3 text-gray-600 break-words font-medium">
                {field.value || "Not provided"}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer with animation */}
        <motion.div
          className="mt-10 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Profile last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
