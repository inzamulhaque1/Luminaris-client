import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowUp, FaArrowDown, FaUser, FaEnvelope, FaIdBadge, FaImage, FaCrown, FaEdit, FaTrash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
        setSortedUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedArray = [...users].sort((a, b) => {
      const aValue = a[key] || "";
      const bValue = b[key] || "";
      if (typeof aValue === "string") {
        return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });
    setSortedUsers(sortedArray);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaArrowUp className="inline ml-2 text-white" />
    ) : (
      <FaArrowDown className="inline ml-2 text-white" />);
  };

  const handleUpdateRole = async (userId) => {
    if (!newRole) {
      Swal.fire("Error", "Please select a role", "error");
      return;
    }
    try {
      const response = await axiosSecure.put(`/users/${userId}`, { role: newRole });
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
        setSortedUsers(updatedUsers);
        setSelectedUser(null);
        setNewRole("");
        Swal.fire("Success", "User role updated successfully", "success");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to update role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/users/${userId}`);
        if (response.status === 200) {
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
          setSortedUsers(updatedUsers);
          Swal.fire("Deleted!", "User has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to delete user", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 bg-red-100 p-4 rounded-lg shadow-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 flex items-center justify-center">
        <FaCrown className="mr-3 text-yellow-500" /> All Users
      </h2>
      <div className="shadow-xl rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                {[
                  { key: "_id", icon: <FaIdBadge />, label: "ID" },
                  { key: "name", icon: <FaUser />, label: "Name" },
                  { key: "email", icon: <FaEnvelope />, label: "Email" },
                  { key: "role", icon: <FaCrown />, label: "Role" },
                  { key: "image", icon: <FaImage />, label: "Image" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center">
                      {col.icon}
                      <span className="ml-2">{col.label}</span>
                      {renderSortIcon(col.key)}
                    </div>
                  </th>
                ))}
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{idx + 1}</td>
                  <td className="py-4 px-6 text-gray-800 whitespace-nowrap font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{user.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : user.role === "teacher"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "student"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 hover:scale-110 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
                        title="Update Role"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-all duration-200"
                        title="Delete User"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Update Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md backdrop-brightness-75 transition-all duration-300 ease-in-out">
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <FaCrown className="mr-2 text-yellow-500" /> Update Role for {selectedUser.name}
            </h3>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateRole(selectedUser._id)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;