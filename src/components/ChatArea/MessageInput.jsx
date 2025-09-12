import React, { useState } from "react";
import { Send } from "lucide-react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../firebase/setup";

export default function MessageInput({ selectedUser }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // don't send empty
    if (!selectedUser?.id) return; // no user selected

    try {
      // Ensure chat document exists for current user
      const currentUserChatDoc = doc(
        database,
        "Users",
        auth.currentUser.uid,
        "Chats",
        selectedUser.id
      );
      await setDoc(currentUserChatDoc, { createdAt: new Date() }, { merge: true });

      // Ensure chat document exists for recipient
      const recipientChatDoc = doc(
        database,
        "Users",
        selectedUser.id,
        "Chats",
        auth.currentUser.uid
      );
      await setDoc(recipientChatDoc, { createdAt: new Date() }, { merge: true });

      // Add message to current user's chat
      const currentUserMessagesRef = collection(currentUserChatDoc, "messages");
      await addDoc(currentUserMessagesRef, {
        senderId: auth.currentUser.uid,
        text: message,
        timestamp: new Date(),
      });

      // Add message to recipient's chat
      const recipientMessagesRef = collection(recipientChatDoc, "messages");
      await addDoc(recipientMessagesRef, {
        senderId: auth.currentUser.uid,
        text: message,
        timestamp: new Date(),
      });

      // Optional: console log only on send
      console.log("Message sent from:", auth.currentUser.displayName);
      console.log("Message sent to:", selectedUser.username);
      console.log("Message content:", message);

      setMessage(""); // clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent newline
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 border-t border-gray-300 w-full">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
      />
      <Send
        className="w-6 h-6 text-green-600 cursor-pointer"
        onClick={sendMessage}
      />
    </div>
  );
}
