import { useState, useEffect } from "react";

import { FaArrowUp, FaArrowDown, FaUser, FaEnvelope, FaIdBadge, FaImage, FaCrown, FaEdit, FaTrash } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2"; // For confirmation dialogs
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
      <FaArrowUp className="inline ml-1 text-white" />
    ) : (
      <FaArrowDown className="inline ml-1 text-white" />);
  };

  // Update user role
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

  // Delete user
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
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        <FaCrown className="mr-2 text-yellow-500" /> All Users
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b cursor-pointer hover:bg-blue-700 transition duration-300" onClick={() => handleSort("_id")}>
                <div className="flex items-center"><FaIdBadge className="mr-2" /> ID {renderSortIcon("_id")}</div>
              </th>
              <th className="py-3 px-4 border-b cursor-pointer hover:bg-blue-700 transition duration-300" onClick={() => handleSort("name")}>
                <div className="flex items-center"><FaUser className="mr-2" /> Name {renderSortIcon("name")}</div>
              </th>
              <th className="py-3 px-4 border-b cursor-pointer hover:bg-blue-700 transition duration-300" onClick={() => handleSort("email")}>
                <div className="flex items-center"><FaEnvelope className="mr-2" /> Email {renderSortIcon("email")}</div>
              </th>
              <th className="py-3 px-4 border-b cursor-pointer hover:bg-blue-700 transition duration-300" onClick={() => handleSort("role")}>
                <div className="flex items-center"><FaCrown className="mr-2" /> Role {renderSortIcon("role")}</div>
              </th>
              <th className="py-3 px-4 border-b cursor-pointer hover:bg-blue-700 transition duration-300" onClick={() => handleSort("image")}>
                <div className="flex items-center"><FaImage className="mr-2" /> Image {renderSortIcon("image")}</div>
              </th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4 border-b text-left">{idx + 1}</td>
                <td className="py-3 px-4 border-b text-left">{user.name}</td>
                <td className="py-3 px-4 border-b text-left">{user.email}</td>
                <td className="py-3 px-4 border-b text-left">{user.role}</td>
                <td className="py-3 px-4 border-b text-left flex justify-start">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="py-3 px-4 border-b text-left">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    title="Update Role"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Update Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Update Role for {selectedUser.name}</h3>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateRole(selectedUser._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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