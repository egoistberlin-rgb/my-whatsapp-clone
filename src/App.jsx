
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import ExtraFeatures from "./components/ExtraFeatures";

function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Rahul",
      message: "Bhai kal milte hain",
      time: "10:30 AM",
      unread: 2,
      online: true,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    },
    {
      id: 2,
      name: "Priya",
      message: "Photo bhej dena 👍",
      time: "09:45 AM",
      unread: 0,
      online: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      id: 3,
      name: "Aman",
      message: "Okay bro",
      time: "Yesterday",
      unread: 5,
      online: true,
      avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 4,
      name: "Family Group",
      message: "Mom: Dinner kab karoge?",
      time: "Yesterday",
      unread: 12,
      online: false,
      isGroup: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
    {
      id: 5,
      name: "College Friends",
      message: "Rohit: Meeting 5 baje hai",
      time: "Friday",
      unread: 0,
      online: false,
      isGroup: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
  ]);

  useEffect(() => {
    const savedChats = localStorage.getItem("whatsapp_chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  const [selectedChat, setSelectedChat] = useState(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="app" style={{ position: "relative" }}>
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <div
        className={`main-container ${selectedChat ? "chat-open" : "chat-closed"
          }`}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "calc(100vh - 60px)",
        }}
      >

        {(!selectedChat || window.innerWidth > 768) && (
          <Sidebar
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        )}
        <Chat
          selectedChat={selectedChat}
          onBack={() => setSelectedChat(null)}
          chats={chats}          
          setChats={setChats}
        />
      </div>

      <ExtraFeatures chats={chats} setChats={setChats} isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
}

export default App;
