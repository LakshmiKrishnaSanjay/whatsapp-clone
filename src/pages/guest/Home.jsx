// src/App.jsx
import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-300">
      <div className="bg-green-500 p-16 rounded-2xl shadow-lg text-center w-100">
        {/* WhatsApp Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-16 h-16"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-6">Welcome to WhatsApp-clone</h1>

        {/* Google Sign In Button */}
        <button className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
          <svg
            className="w-5 h-5"
            viewBox="0 0 488 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 111 504 0 393 0 256S111 8 248 8c66.7 0 122.6 24.7 165 65l-67 64c-18.4-17.7-51-38.3-98-38.3-83.1 0-150.6 68-150.6 152.3 0 84.4 67.5 152.3 150.6 152.3 96.2 0 132-69.1 137.5-104.6H248v-85.3h240c2.2 12.6 3.5 24.8 3.5 39.4z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
