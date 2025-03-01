import { NavLink } from "react-router-dom";


const Navbar = () => {

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white  underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-white  underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          isActive
            ? "text-white  underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-white  underline underline-offset-8"
            : "text-white hover:text-gray-300 transition-colors"
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <div className="bg-primary">
      <div className="w-10/12 flex justify-between items-center p-4 mx-auto">
        <div className="text-white font-bold text-xl">Luminaris</div>
        <div className="flex space-x-6">{links}</div>
        <div className="flex space-x-2">
          <NavLink
            to="/login"
            className="bg-white text-primary py-2 px-4 rounded-l-full hover:bg-gray-200 transition-colors font-bold "
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
      </div>
    </div>
  );
};

export default Navbar;
