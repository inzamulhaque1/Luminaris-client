import { useAuth } from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth(); // Get user data from authentication hook

  if (!user) {
    return <div>Loading...</div>; // Handle case where user is not loaded
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        {/* Display user image or default if not available */}
        <img
          src={user.image || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.role}</p>
      </div>
      <div className="mt-6">
        <p className="text-lg font-medium">Email:</p>
        <p className="text-gray-700">{user.email}</p>

        <p className="text-lg font-medium mt-4">Date of Birth:</p>
        <p className="text-gray-700">{user.dateOfBirth}</p>

        <p className="text-lg font-medium mt-4">Phone Number:</p>
        <p className="text-gray-700">{user.phoneNumber}</p>

        <p className="text-lg font-medium mt-4">Address:</p>
        <p className="text-gray-700">{user.address}</p>

        {/* Conditionally display roll number and class if the user is a student */}
        {user.role === "student" && (
          <>
            <p className="text-lg font-medium mt-4">Roll Number:</p>
            <p className="text-gray-700">{user.rollNumber}</p>

            <p className="text-lg font-medium mt-4">Class:</p>
            <p className="text-gray-700">{user.class}</p>
          </>
        )}

        {/* Conditionally display subject and education qualification if the user is a teacher */}
        {user.role === "teacher" && (
          <>
            <p className="text-lg font-medium mt-4">Subject:</p>
            <p className="text-gray-700">{user.subject}</p>

            <p className="text-lg font-medium mt-4">Education Qualification:</p>
            <p className="text-gray-700">{user.educationQualification}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
