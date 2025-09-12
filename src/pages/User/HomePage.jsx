import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatArea from "../../components/ChatArea/ChatArea";
import DefaultChat from "../../components/ChatArea/DefaultChat";
import ChatHeader from "../../components/ChatArea/ChatHeader";

export default function Homepage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar onSelectChat={setSelectedUser} />
      <div className="flex-1 flex flex-col">
        {/* Render header only if a user is selected */}
        {selectedUser && <ChatHeader selectedUser={selectedUser} />}
        
        {selectedUser ? (
          <ChatArea chatId={selectedUser.id} user={selectedUser} />
        ) : (
          <DefaultChat />
        )}
      </div>
    </div>
  );
}
