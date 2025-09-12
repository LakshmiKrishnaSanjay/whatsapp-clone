import React, { useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import Chatlist from "./Chatlist";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/setup";

export default function Sidebar({ onSelectChat }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from Firebase
  const getUser = async () => {
    const userRef = collection(database, "Users");
    try {
      const data = await getDocs(userRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex flex-col w-1/3 border-r border-gray-300 bg-white">
      <SidebarHeader />
      <SidebarSearch onSearch={setSearchTerm} />
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          <Chatlist users={filteredUsers} onSelectChat={onSelectChat} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found</p>
        )}
      </div>
    </div>
  );
}
