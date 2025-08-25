import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <img src={avatar} alt="User" className="w-8 h-8 rounded-full border object-cover" />
        <span className="hidden sm:block text-white">{user?.name || "User"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
          <ul className="py-2 text-sm">
            <li
              className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;