import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { logout, user } = useAuth();

  // Define role-based routes
  const getNavLinksByRole = (role) => {
    const commonLinks = [
      {
        to: "/", // Root route
        icon: "🏠",
        label: "Home",
        end: true, // Exact match for "/"
      },
      {
        to: "/dashboard", // Exact dashboard route
        icon: "📊",
        label: "Dashboard",
        end: true, // Exact match for "/dashboard"
      },
      {
        to: "/profile", // Profile route
        icon: "📅",
        label: "Profile",
        end: true, // Exact match for "/profile"
      },
    ];

    const roleSpecificLinks = {
      admin: [
        ...commonLinks,
        {
          to: "/dashboard/all-users", // Full path to avoid overlap
          icon: "👤",
          label: "All Users",
          end: true, // Exact match for "/dashboard/all-users"
        },
      ],
      teacher: [
        ...commonLinks,
        // Example teacher-specific route
        // {
        //   to: "/dashboard/teacher-classes",
        //   icon: "📚",
        //   label: "My Classes",
        //   end: true,
        // },
      ],
      student: [
        ...commonLinks,
        // Example student-specific route
        // {
        //   to: "/dashboard/student-assignments",
        //   icon: "📝",
        //   label: "Assignments",
        //   end: true,
        // },
      ],
      parent: [
        ...commonLinks,
        // Example parent-specific route
        // {
        //   to: "/dashboard/parent-student-progress",
        //   icon: "📈",
        //   label: "Student Progress",
        //   end: true,
        // },
      ],
    };

    // Return links based on role, fallback to commonLinks if role is undefined
    return roleSpecificLinks[role] || commonLinks;
  };

  const navLinks = getNavLinksByRole(user?.role);

  return (
    <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-8">ALEX</h1>
      <nav className="space-y-4 flex-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end} // Use 'end' prop for exact matching
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">{link.icon}</span> {link.label}
          </NavLink>
        ))}
        <NavLink
          onClick={logout}
          className="flex items-center p-3 rounded-md text-white hover:bg-blue-700 transition-colors"
        >
          <span className="mr-3">➡️</span> Sign out
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;