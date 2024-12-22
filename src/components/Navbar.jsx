import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="bg-zinc-950 flex justify-between items-center px-10 py-4 shadow-sm ml-48 shadow-b shadow-green-400">
      {/* Search Input */}
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          <input
            type="text"
            placeholder="Search for stocks"
            className="pl-10 pr-4 py-2 border border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-green-500 cursor-pointer hover:text-green-300 transition-all duration-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>
       

       
                
        <NavLink to="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-green-700 rounded-lg p-2 transition-all duration-300">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--men-people-male-pack-avatars-icons-5187871.png?f=webp"
            alt="Profile"
            className="rounded-full w-8 h-8 border-2 border-green-600"
          />
          <span className="font-semibold text-white text-sm">Parth</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
