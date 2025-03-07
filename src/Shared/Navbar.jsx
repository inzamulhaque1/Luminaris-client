import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Navbar = () => {
  const { user, logout, loading } = useAuth();
  console.log("User in Navbar:", user);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-white underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          isActive
            ? "text-white underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-white underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "text-white underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Dashboard
      </NavLink>
    </>
  );
  
  if (loading) {
    return <div className="bg-primary text-white p-4">Loading...</div>; // Optional loading state
  }
  return (
    <div className="bg-primary">
      <div className="w-10/12 flex justify-between items-center p-4 mx-auto">
        <div className="text-white font-bold text-xl">Luminaris</div>
        <div className="flex space-x-6">{links}</div>

        {user ? (
          <div className="flex items-center space-x-4">
            {user.image && (
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-white font-semibold">
              {user.name} ({user.role})
            </span>
            <button
              onClick={logout}
              className="bg-white text-primary py-2 px-4 rounded-full hover:bg-gray-200 transition-colors font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <NavLink
              to="/login"
              className="bg-white text-primary py-2 px-4 rounded-l-full hover:bg-gray-200 transition-colors font-bold"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-white text-primary py-2 px-4 rounded-r-full hover:bg-gray-200 transition-colors font-bold"
            >
              SignUp
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;