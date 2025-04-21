import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email: data.email.toLowerCase() }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        login(result.token, result.user);
        navigate("/");
      } else {
        setLoginError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setLoginError(err,"An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-1/3 h-full opacity-10 overflow-hidden">
        <div className="w-full h-full bg-blue-600 rounded-bl-full transform rotate-45 translate-x-1/2 -translate-y-1/4"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10 overflow-hidden">
        <div className="w-full h-full bg-indigo-600 rounded-tr-full transform -rotate-45 -translate-x-1/2 translate-y-1/4"></div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Floating card effect */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform rotate-1 opacity-70"></div>
        
        {/* Main card */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top decorative bar */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="p-8">
            {/* Logo and heading */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-2">
                <Sparkles size={28} className="text-blue-600" />
                <h1 className="text-2xl font-bold ml-2 text-gray-800">Luminaries</h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-1">Sign in to access your account</p>
            </div>
            
            {/* Error message */}
            {loginError && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {loginError}
                </p>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="text-red-600" size={18} /> : <Eye className="text-green-600" size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-600 text-white py-3 rounded-lg hover:from-pink-500 hover:to-pink-500 transition-all font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative mt-8 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to EduConnect?</span>
              </div>
            </div>
            
            {/* Signup link */}
            <div className="text-center">
              <a 
                href="/signup" 
                className="inline-block w-full py-3 px-4 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all text-center"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;