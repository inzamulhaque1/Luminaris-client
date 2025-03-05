import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.exp * 1000 > Date.now()) { // Check if token is not expired
          setToken(storedToken);
          // Fetch full user data from backend
          fetchUserData(storedToken);
        } else {
          localStorage.removeItem("token");
          setLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = await response.json();
      if (response.ok) {
        setUser(userData); // Set full user data
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Logout if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};