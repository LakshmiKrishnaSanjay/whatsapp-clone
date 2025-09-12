import React from "react";

export default function SidebarSearch({ onSearch }) {
  return (
    <div className="p-2 bg-gray-50 border-b border-gray-300">
      <input
        type="text"
        placeholder="Search or start new chat"
        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
        onChange={(e) => onSearch(e.target.value)}   //  call parent when typing
      />
    </div>
  );
}
