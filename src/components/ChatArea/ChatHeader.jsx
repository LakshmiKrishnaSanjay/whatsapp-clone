import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";

export default function ChatHeader({ selectedUser }) {
  const name = selectedUser?.username || "Unknown";
  const imgSrc = selectedUser?.profileImage || "/default-avatar.png";

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center gap-3">
        <img
          src={imgSrc}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-gray-400"
        />
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">online</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Phone className="cursor-pointer text-gray-600" />
        <Video className="cursor-pointer text-gray-600" />
        <MoreVertical className="cursor-pointer text-gray-600" />
      </div>
    </div>
  );
}
