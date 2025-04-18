import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);
  
  // Handle scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // NavLink styling function for desktop
  const getDesktopLinkStyles = ({ isActive }) => 
    isActive
      ? "text-white underline underline-offset-8"
      : "text-white hover:text-gray-300 transition-colors";
      
  // Special styling for mobile menu links with animation
  const getMobileLinkStyles = ({ isActive }) => {
    const baseStyle = "text-xl transition-all duration-500 relative overflow-hidden";
    const activeStyle = isActive ? "font-bold" : "";
    
    return `${baseStyle} ${activeStyle}`;
  };

  const links = [
    { to: "/", label: "Home" },
    
    { to: "/dashboard", label: "Dashboard" },

 
  ];
  
  if (loading) {
    return <div className="bg-primary text-white p-4">Loading...</div>;
  }

  return (
    <nav className={`bg-primary w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-white font-bold text-xl z-10">Luminaris</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getDesktopLinkStyles}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-10"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu with animated text colors */}
        <div 
          className={`fixed inset-0 bg-primary flex flex-col justify-center items-center md:hidden transition-all duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-8 items-center w-full px-8">
            {links.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getMobileLinkStyles}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  color: isOpen ? '#ffffff' : '#cccccc', // Start with white, animate to different color
                  textShadow: isOpen ? '0 0 10px rgba(255,255,255,0.7)' : 'none',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0,
                  transition: 'color 0.6s ease, text-shadow 0.6s ease, transform 0.4s ease, opacity 0.4s ease',
                  transitionDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff9999'; // Hover color (lighter red)
                  e.currentTarget.style.textShadow = '0 0 15px rgba(255,153,153,0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff'; // Back to white
                  e.currentTarget.style.textShadow = '0 0 10px rgba(255,255,255,0.7)';
                }}
                onClick={closeMenu}
              >
                {link.label}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-white"
                  style={{
                    width: isOpen ? '100%' : '0',
                    transition: 'width 0.4s ease',
                    transitionDelay: `${(index * 0.1) + 0.3}s`
                  }}
                ></span>
              </NavLink>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div 
              className="mt-6 w-full"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease',
                transitionDelay: '0.5s'
              }}
            >
              {user ? (
                <div className="flex flex-col items-center space-y-4">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <span className="text-white font-semibold text-center">
                    {user.name} <br />({user.role})
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="bg-white text-primary py-2 px-6 rounded-full hover:bg-gray-200 transition-colors font-bold w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 w-full">
                  <NavLink
                    to="/login"
                    className="bg-white text-primary py-3 px-4 rounded-full hover:bg-gray-200 transition-colors font-bold text-center w-full"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-white text-primary py-3 px-4 rounded-full hover:bg-gray-200 transition-colors font-bold text-center w-full"
                    onClick={closeMenu}
                  >
                    SignUp
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;