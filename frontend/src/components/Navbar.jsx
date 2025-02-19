import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onLogout = (e)=>{
    e.preventDefault();
    dispatch(logout())
    window.location.replace("/");
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo and Primary Nav */}
          <div className="flex space-x-7">
            {/* Logo */}
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">ReviewWizard</span>
              </a>
            </div>
            {/* Primary Nav (Desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                Home
              </a>
              <a href="/dashboard" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                Dashboard
              </a>
              <a href="/reviews" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                Reviews
              </a>
              <a href="/analytics" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                Analytics
              </a>
            </div>
          </div>

          {/* Secondary Nav (Desktop) */}
          {isAuthenticated && <div className="hidden md:flex items-center space-x-3">
            <a
              href="/logout"
              className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
              onClick={onLogout}
            >
              Logout
            </a>
          </div>}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mobile-menu`}>
        <ul className="">
          <li>
            <a href="/" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/reviews" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
              Reviews
            </a>
          </li>
          <li>
            <a href="/analytics" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">
              Analytics
            </a>
          </li>
          <li>
            {isAuthenticated && <a href="/logout" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
              onClick={onLogout}
              >
              Logout
            </a>}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
