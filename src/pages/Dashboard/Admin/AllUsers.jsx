import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import React Icons

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users"); // Adjust to your endpoint
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

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedArray = [...users].sort((a, b) => {
      if (key === "image") {
        const aValue = a[key] ? a[key] : "";
        const bValue = b[key] ? b[key] : "";
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const aValue = a[key] || "";
      const bValue = b[key] || "";
      
      if (typeof aValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    setSortedUsers(sortedArray);
  };

  // Render sort icon
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaArrowUp className="inline ml-1" />
    ) : (
      <FaArrowDown className="inline ml-1" />
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 ">
              <th
                className="py-2 px-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("_id")}
              >
                ID {renderSortIcon("_id")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("name")}
              >
                Name {renderSortIcon("name")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("email")}
              >
                Email {renderSortIcon("email")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("role")}
              >
                Role {renderSortIcon("role")}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort("image")}
              >
                Image {renderSortIcon("image")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{idx+1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;