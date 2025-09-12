import React from "react";

export default function ChatItem({ id, name, profileImage, lastMessage, time, onClick }) {
  console.log("Rendering ChatItem for user:", name, id);
  
  return (
    <div onClick={onClick} className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
        {profileImage ? <img src={profileImage} alt={name} className="w-full h-full rounded-full object-cover" /> : name[0]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </div>
        <div className="text-sm text-gray-500 truncate">{lastMessage}</div>
      </div>
    </div>
  );
}
