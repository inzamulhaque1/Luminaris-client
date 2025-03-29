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
  FaUserGraduate,
  FaUserFriends,
  FaShieldAlt,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user } = useAuth();
  const [snowColors, setSnowColors] = useState([]);

  // Role icons mapping
  const roleIcons = {
    student: <FaUserGraduate className="text-yellow-500" />,
    teacher: <GiTeacher className="text-blue-500" />,
    parent: <FaUserFriends className="text-purple-500" />,
    admin: <FaShieldAlt className="text-green-500" />,
  };

  // Role colors mapping
  const roleColors = {
    student: "from-yellow-100 to-yellow-50",
    teacher: "from-blue-100 to-blue-50",
    parent: "from-purple-100 to-purple-50",
    admin: "from-green-100 to-green-50",
  };

  // Role badge colors
  const roleBadgeColors = {
    student: "bg-yellow-100 text-yellow-800",
    teacher: "bg-blue-100 text-blue-800",
    parent: "bg-purple-100 text-purple-800",
    admin: "bg-green-100 text-green-800",
  };

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
    ];

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
        className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-gray-600 text-xl font-semibold">Loading profile...</div>
      </motion.div>
    );
  }

  // Role-specific fields configuration
  const roleFields = {
    student: [
      {
        label: "Roll Number",
        value: user.rollNumber,
        icon: <FaIdCard className="text-yellow-600" />,
        group: "Academic",
      },
      {
        label: "Class",
        value: user.class,
        icon: <FaBook className="text-yellow-600" />,
        group: "Academic",
      },
    ],
    teacher: [
      {
        label: "Subject",
        value: user.subject,
        icon: <FaBook className="text-blue-600" />,
        group: "Professional",
      },
      {
        label: "Education",
        value: user.educationQualification,
        icon: <FaGraduationCap className="text-blue-600" />,
        group: "Professional",
      },
    ],
    parent: [
      {
        label: "Student Roll",
        value: user.studentRollNumber,
        icon: <FaIdCard className="text-purple-600" />,
        group: "Student Info",
      },
      {
        label: "Student Class",
        value: user.studentClass,
        icon: <FaBook className="text-purple-600" />,
        group: "Student Info",
      },
    ],
    admin: [
      {
        label: "Admin Since",
        value: new Date(user.createdAt).toLocaleDateString(),
        icon: <FaShieldAlt className="text-green-600" />,
        group: "Administrative",
      },
    ],
  };

  // Common fields for all roles
  const commonFields = [
    {
      label: "Email",
      value: user.email,
      icon: <FaEnvelope className="text-indigo-600" />,
      group: "Personal",
    },
    {
      label: "Date of Birth",
      value: user.dateOfBirth,
      icon: <FaBirthdayCake className="text-indigo-600" />,
      group: "Personal",
    },
    {
      label: "Phone",
      value: user.phoneNumber,
      icon: <FaPhone className="text-indigo-600" />,
      group: "Contact",
    },
    {
      label: "Address",
      value: user.address,
      icon: <FaMapMarkerAlt className="text-indigo-600" />,
      group: "Contact",
    },
  ];

  // Combine and group fields
  const allFields = [...commonFields, ...(roleFields[user.role] || [])];
  const fieldGroups = {};

  allFields.forEach((field) => {
    if (!fieldGroups[field.group]) {
      fieldGroups[field.group] = [];
    }
    fieldGroups[field.group].push(field);
  });

  // Safely get the last 6 characters of user ID
  const userIdSuffix = user?._id ? user._id.slice(-6) : 'N/A';



  return (
    <div className={`relative  overflow-hidden bg-gradient-to-br ${roleColors[user.role]}`}>
      {/* Custom Snowfall Effect */}
      {snowColors.length > 0 && (
        <Snowfall
          snowflakeCount={150}
          images={snowColors}
          speed={[1, 3]}
          wind={[-0.5, 2]}
          radius={[1, 4]}
          style={{ position: "fixed", zIndex: 10 }}
        />
      )}

      {/* Profile Container */}
      <div className="container mx-auto px-4 py-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Profile Image */}
            <motion.div
              className="flex-shrink-0 relative self-start"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">View Full Image</span>
                </div>
              </div>
              <div className="absolute -z-10 -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-md opacity-75"></div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {user.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleBadgeColors[user.role]}`}>
                    {roleIcons[user.role]}
                    <span className="ml-2">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </span>
                </div>

                <p>Profile last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p> <br />
                

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-indigo-500 mb-1">
                      <FaEnvelope />
                    </div>
                    <div className="text-xs text-gray-500">Email Verified</div>
                    <div className="font-semibold">Yes</div>
                  </motion.div>

                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-indigo-500 mb-1">
                      <FaUser />
                    </div>
                    <div className="text-xs text-gray-500">Account Status</div>
                    <div className="font-semibold">Active</div>
                  </motion.div>

                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-indigo-500 mb-1">
                      <FaIdCard />
                    </div>
                    <div className="text-xs text-gray-500">User ID</div>
                    <div className="font-semibold truncate">{user.id}</div>
                  </motion.div>

                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-indigo-500 mb-1">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="font-semibold truncate">
                      {user.address ? (user.address.split(',')[0] || 'Not set') : 'Not set'}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-8">
            {Object.entries(fieldGroups).map(([groupName, fields], groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + groupIndex * 0.1 }}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-indigo-500 mr-3 rounded-full"></span>
                  {groupName} Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field, fieldIndex) => (
                    <motion.div
                      key={fieldIndex}
                      className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start">
                        <div className="p-2 rounded-lg bg-indigo-50 mr-4">
                          {field.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">{field.label}</h3>
                          <p className="text-gray-800 font-medium mt-1 break-words">
                            {field.value || <span className="text-gray-400">Not provided</span>}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;