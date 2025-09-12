import React from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages = [] }) {
  console.log("Rendering MessageList with messages:", messages);
  
  return (
    <div className="flex flex-col gap-2">
      {messages.length > 0 ? (
        messages.map((msg) => <MessageBubble key={msg.id} {...msg} />)
      ) : (
        <div className="text-gray-400 text-center">No messages yet</div>
      )}
    </div>
  );
}
