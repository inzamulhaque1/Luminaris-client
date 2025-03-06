import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  // Watch the role field to conditionally render additional fields
  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email.toLowerCase());
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    // Append additional fields based on role
    if (data.role === "student") {
      formData.append("rollNumber", data.rollNumber);
      formData.append("class", data.class);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);
    } else if (data.role === "teacher") {
      formData.append("subject", data.subject);
      formData.append("educationQualification", data.educationQualification);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);
    } else if (data.role === "parent") {
      formData.append("studentRollNumber", data.studentRollNumber);
      formData.append("studentClass", data.studentClass);
      formData.append("phoneNumber", data.phoneNumber);
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Signup successful:", result);
        login(result.token, result.user); // Set user state after signup
        navigate("/"); // Redirect to home
      } else {
        console.error("Signup failed:", result.message);
        alert(`Signup failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Conditional Fields for Student */}
        {selectedRole === "student" && (
          <>
            <div>
              <input
                type="text"
                {...register("rollNumber", {
                  required: "Roll Number is required",
                })}
                placeholder="Roll Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.rollNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rollNumber.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("class", { required: "Class is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select Class</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Class {index + 1}
                  </option>
                ))}
                <option value="ssc">SSC</option>
                <option value="hsc">HSC</option>
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Conditional Fields for Teacher */}
        {selectedRole === "teacher" && (
          <>
            <div>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("educationQualification", {
                  required: "Education Qualification is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select Qualification</option>
                <option value="BCS">BCS</option>
                <option value="BSC">BSC</option>
                <option value="MSC">MSC</option>
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
              </select>
              {errors.educationQualification && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.educationQualification.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Conditional Fields for Parent */}
        {selectedRole === "parent" && (
          <>
            <div>
              <input
                type="text"
                {...register("studentRollNumber", {
                  required: "Student Roll Number is required",
                })}
                placeholder="Student Roll Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.studentRollNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.studentRollNumber.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register("studentClass", {
                  required: "Student Class is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              >
                <option value="">Select Class</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Class {index + 1}
                  </option>
                ))}
                <option value="ssc">SSC</option>
                <option value="hsc">HSC</option>
              </select>
              {errors.studentClass && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.studentClass.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
