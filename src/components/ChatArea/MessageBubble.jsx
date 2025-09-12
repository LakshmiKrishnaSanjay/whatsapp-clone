import React from "react";
import { auth } from "../../firebase/setup";

export default function MessageBubble({ text, senderId, fileUrl, timestamp }) {
  const isMe = senderId === auth.currentUser.uid;

  // Format Firestore timestamp to readable time
  const time = timestamp?.toDate
    ? timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "";

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} gap-1`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          isMe ? "bg-green-500 text-white" : "bg-white border"
        }`}
      >
        {text && <p>{text}</p>}
        {fileUrl && (
          <div className="mt-2">
            {fileUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img src={fileUrl} alt="attachment" className="max-w-full rounded" />
            ) : (
              <video src={fileUrl} controls className="max-w-full rounded" />
            )}
          </div>
        )}
      </div>
      {time && <span className="text-xs text-gray-400">{time}</span>}
    </div>
  );
}
