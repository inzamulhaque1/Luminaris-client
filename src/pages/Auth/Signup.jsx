import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Convert the file to a format suitable for sending (e.g., base64)
      const file = data.photo[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Prepare form data
        const formData = {
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          photo: base64Image, // Send base64 string to backend
        };

        // Send data to backend
        const response = await axiosPublic.post("/users", formData);
        console.log("Response from backend:", response.data);
      };
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 m-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Profile Photo Upload */}
        <div className="mb-4 flex justify-center items-center gap-3 flex-row-reverse text-center">
          <div>
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Profile photo is required" })}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            {errors.photo && (
              <p className="text-red-500 text-xs">{errors.photo.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: "Full Name is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs">{errors.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone Number is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;