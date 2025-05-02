import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Camera, Book, Users, UserPlus, User, Briefcase, Sparkles } from "lucide-react";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && name === "image") {
      setImagePreview(URL.createObjectURL(files[0]));
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

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
      setIsLoading(false);
      
      // Show success animation
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login or dashboard
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.password || !formData.role)) {
      setError("Please fill in all required fields");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <Briefcase size={20} />;
      case 'student': return <Book size={20} />;
      case 'teacher': return <Users size={20} />;
      case 'parent': return <User size={20} />;
      default: return <UserPlus size={20} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="absolute  top-20  right-0 w-1/3 h-full opacity-10 overflow-hidden">
        <div className="w-full h-full bg-blue-600 rounded-bl-full transform rotate-45 translate-x-1/2 -translate-y-1/4"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10 overflow-hidden">
        <div className="w-full h-full bg-indigo-600 rounded-tr-full transform -rotate-45 -translate-x-1/2 translate-y-1/4"></div>
      </div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Decorative */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <Sparkles size={32} className="text-yellow-300" />
              <h1 className="text-2xl font-bold ml-2">EduConnect</h1>
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
            <p className="opacity-90 mb-6">Create your account and connect with students, teachers, and parents in our collaborative educational platform.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center opacity-80">
              <Book className="mr-3" />
              <span>Access educational resources</span>
            </div>
            <div className="flex items-center opacity-80">
              <Users className="mr-3" />
              <span>Communicate with your school community</span>
            </div>
            <div className="flex items-center opacity-80">
              <Camera className="mr-3" />
              <span>Track performance and attendance</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-400 border-opacity-30">
            <p className="text-sm opacity-70">Already have an account? <a href="/login" className="underline font-medium">Login here</a></p>
          </div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="p-8 md:w-3/5">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-600">Step {step} of {formData.role ? 2 : 1}</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Select Account Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {['student', 'teacher', 'parent', 'admin'].map((role) => (
                      <div
                        key={role}
                        onClick={() => setFormData({...formData, role})}
                        className={`flex items-center p-3 border ${
                          formData.role === role ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300 hover:border-blue-300'
                        } rounded-lg cursor-pointer transition-all`}
                      >
                        <div className={`p-2 rounded-full ${formData.role === role ? 'bg-blue-100' : 'bg-gray-100'} mr-3`}>
                          {getRoleIcon(role)}
                        </div>
                        <span className="capitalize font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Profile Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={24} className="text-gray-400" />
                      )}
                    </div>
                    <label className="flex-1">
                      <div className="py-2 px-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center">
                        Choose file
                      </div>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-700 font-medium">Additional information for {formData.role} account</p>
                </div>
                
                {/* Student specific fields */}
                {formData.role === "student" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Roll Number</label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Class</label>
                        <input
                          type="text"
                          name="class"
                          value={formData.class}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Teacher specific fields */}
                {formData.role === "teacher" && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Education Qualification</label>
                      <input
                        type="text"
                        name="educationQualification"
                        value={formData.educationQualification}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Parent specific fields */}
                {formData.role === "parent" && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Student Roll Number</label>
                      <input
                        type="text"
                        name="studentRollNumber"
                        value={formData.studentRollNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Student Class</label>
                      <input
                        type="text"
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Admin specific fields */}
                {formData.role === "admin" && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Class</label>
                      <input
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;