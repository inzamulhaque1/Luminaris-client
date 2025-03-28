import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Assuming this is your custom Axios hook

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null,
    rollNumber: "",
    class: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    subject: "",
    educationQualification: "",
    studentRollNumber: "",
    studentClass: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Prepare FormData for file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axiosPublic.post("/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Store token and redirect (or update UI)
      localStorage.setItem("token", response.data.token);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login or dashboard
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Sign Up
      </h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Role-Specific Fields */}
        {formData.role === "student" && (
          <>
            <div>
              <label className="block text-gray-700">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {formData.role === "teacher" && (
          <>
            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Education Qualification</label>
              <input
                type="text"
                name="educationQualification"
                value={formData.educationQualification}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {formData.role === "parent" && (
          <>
            <div>
              <label className="block text-gray-700">Student Roll Number</label>
              <input
                type="text"
                name="studentRollNumber"
                value={formData.studentRollNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Student Class</label>
              <input
                type="text"
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}

        {formData.role === "admin" && (
          <>
            <div>
              <label className="block text-gray-700">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;