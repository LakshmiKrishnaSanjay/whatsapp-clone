// src/components/Sidebar/SidebarHeader.jsx
import React from "react";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/setup";
import { signOut } from "firebase/auth";

export default function SidebarHeader() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("Logout successful"); // show message
    navigate("/"); // redirect to login page
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Error logging out");
  }
};


  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
      {/* Profile Avatar */}
      <Link to="/profile">
        <img
          src={auth.currentUser?.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full  "
        />
      </Link>

<div className="flex-grow ">
  <h1 className=" ml-2 text-m font-bold text-gray-800">
    {auth.currentUser?.displayName}
  </h1>
</div>


      {/* Icons */}
      <div className="flex items-center gap-4 text-gray-600">
        <LogOutIcon
          className="w-5 h-5 cursor-pointer hover:text-gray-800"
          onClick={handleLogout} // attach logout handler
        />
      </div>
    </div>
  );
}
