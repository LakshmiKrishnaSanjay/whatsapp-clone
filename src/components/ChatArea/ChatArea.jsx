import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, database } from "../../firebase/setup";
import MessageList from "./MessegeList";
import MessageInput from "./MessageInput";

export default function ChatArea({ user: selectedUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedUser?.id) return;

    // Reference to the current chat messages
    const messagesRef = collection(
      database,
      "Users",
      auth.currentUser.uid,
      "Chats",
      selectedUser.id,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        sender: doc.data().senderId === auth.currentUser.uid ? "Me" : selectedUser.username
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  console.log("Rendering ChatArea with selectedUser:", selectedUser);
  console.log("Messages:", messages);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
      </div>
      <div className="shrink-0">
        <MessageInput selectedUser={selectedUser} />
      </div>
    </div>
  );
}
