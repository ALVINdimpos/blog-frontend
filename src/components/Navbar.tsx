import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

interface User {
  _id: number;
  username: string;
  email: string;
  role: number;
}

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xl font-bold">Alvin's Blog Hub</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              {!user && (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
              {user && (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors duration-200"
                    onClick={toggleDropdown}
                  >
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span>{user.username}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" mobile>
              Home
            </NavLink>
            {!user && (
              <>
                <NavLink to="/login" mobile>
                  Login
                </NavLink>
                <NavLink to="/register" mobile>
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 text-white">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    {user.username[0].toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                </div>
                <NavLink to="/profile" mobile>
                  Profile
                </NavLink>
                <NavLink to="/settings" mobile>
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-200 hover:bg-indigo-700 w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, mobile }) => (
  <Link
    to={to}
    className={`${
      mobile
        ? "block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-200 hover:bg-indigo-700"
        : "px-3 py-2 rounded-md text-sm font-medium text-white hover:text-indigo-200 hover:bg-indigo-700"
    } transition-colors duration-200`}
  >
    {children}
  </Link>
);

export default Navbar;
