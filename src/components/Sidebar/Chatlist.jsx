import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/setup";
import ChatItem from "./ChatItem";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default function Chatlist({ users = [], onSelectChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchLastMessages = async () => {
      const filteredUsers = users.filter(user => user.id !== auth.currentUser?.uid);

      const chatsWithLastMessage = await Promise.all(
        filteredUsers.map(async (user) => {
          const messagesRef = collection(database, "Users", auth.currentUser.uid, "Chats", user.id, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
          const snapshot = await getDocs(q);
          const lastMessage = snapshot.docs[0]?.data()?.text || "No messages yet";

          return { ...user, lastMessage };
        })
      );

      setChats(chatsWithLastMessage);
    };

    fetchLastMessages();
  }, [users]);

  return (
    <div>
      {chats.map(user => (
        <ChatItem
          key={user.id}
          id={user.id}
          name={user.username || "Unnamed User"}
          profileImage={user.profileImage || "/default.jpg"}
          lastMessage={user.lastMessage}
          time={user.time || ""}
          onClick={() => onSelectChat(user)}
        />
      ))}
    </div>
  );
}
