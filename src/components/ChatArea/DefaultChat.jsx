import React from "react";

export default function DefaultChat() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <img
        src="/bg-whatsapp.svg" // keep this inside public/ folder
        alt="WhatsApp"
        className="w-48 h-48 mb-6 opacity-60"
      />
      <h2 className="text-xl font-semibold text-gray-600">
        WhatsApp Clone
      </h2>
      <p className="text-gray-500 mt-2">Select a chat to start messaging</p>
    </div>
  );
}
