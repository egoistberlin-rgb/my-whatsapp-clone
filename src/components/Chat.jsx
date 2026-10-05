
import { useEffect, useState } from "react";

import "./Chat.css";

function Chat({ selectedChat, onBack, chats, setChats }) {

  // ==========================================
  // INPUT MESSAGE
  // ==========================================

  const [message, setMessage] = useState("");


  // ==========================================
  // MESSAGES
  // ==========================================

  const [messages, setMessages] = useState(() => {

    const savedMessages =
      localStorage.getItem("whatsappMessages");

    if (savedMessages) {
      return JSON.parse(savedMessages);
    }

    return {

      1: [
        {
          id: 1,
          text: "Hey bro 👋",
          type: "received",
          time: "10:25 AM",
        },
        {
          id: 2,
          text: "Hey! Kya haal hai?",
          type: "sent",
          time: "10:26 AM",
        },
        {
          id: 3,
          text: "Main bilkul theek hu 😄",
          type: "received",
          time: "10:27 AM",
        },
      ],

      2: [
        {
          id: 4,
          text: "Hi 👋",
          type: "received",
          time: "09:40 AM",
        },
        {
          id: 5,
          text: "Hello Priya!",
          type: "sent",
          time: "09:42 AM",
        },
      ],

      3: [
        {
          id: 6,
          text: "Kaha hai bhai?",
          type: "received",
          time: "09:10 AM",
        },
      ],

      4: [
        {
          id: 7,
          text: "Dinner kab karoge?",
          type: "received",
          time: "Yesterday",
        },
      ],

      5: [
        {
          id: 8,
          text: "Meeting 5 baje hai",
          type: "received",
          time: "Friday",
        },
      ],

    };

  });


  // ==========================================
  // SAVE MESSAGES
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "whatsappMessages",
      JSON.stringify(messages)
    );

  }, [messages]);


  // ==========================================
  // NO CHAT SELECTED
  // ==========================================

  if (!selectedChat) {

    return (
      <main className="chat empty-chat">

        <i className="fa-brands fa-whatsapp"></i>

        <h2>WhatsApp Web</h2>

        <p>
          Select a chat to start messaging
        </p>

      </main>
    );

  }


  // ==========================================
  // CURRENT CHAT MESSAGES
  // ==========================================

  const currentMessages =
    messages[selectedChat.id] || [];


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = () => {

    if (!message.trim()) return;

    const newMessage = {

      id: Date.now(),

      text: message,

      type: "sent",

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

    };


    setMessages((previousMessages) => ({

      ...previousMessages,

      [selectedChat.id]: [

        ...(previousMessages[selectedChat.id] || []),

        newMessage,

      ],

    }));

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const updatedChats = chats.map((c) => {
      if (c.id === selectedChat.id) {
        return {
          ...c,
          message: message, // Jo naya message aapne type kiya
          time: currentTime, // Current time
        };
      }
      return c;
    });

    setChats(updatedChats);
    localStorage.setItem("whatsapp_chats", JSON.stringify(updatedChats));


    setMessage("");

  };


  // ==========================================
  // ENTER TO SEND
  // ==========================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }

  };


  // ==========================================
  // CHAT UI
  // ==========================================

  return (

    <main className="chat">


      {/* ======================================
          CHAT HEADER
      ====================================== */}

      <div className="chat-header">


        {/* Mobile Back Button */}

        <button
          className="mobile-back-button"
          onClick={onBack}
          aria-label="Back"
        >

          <i className="fa-solid fa-arrow-left"></i>

        </button>


        {/* User */}

        <div className="chat-user">

          <div className="chat-profile">
            {selectedChat.name.charAt(0)}
          </div>

          <div>

            <h3>
              {selectedChat.name}
            </h3>

            <span>
              {selectedChat.online
                ? "online"
                : "last seen recently"}
            </span>

          </div>

        </div>


        {/* Actions */}

        <div className="chat-actions">

          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

        </div>

      </div>


      {/* ======================================
          MESSAGES
      ====================================== */}

      <div className="messages">

        {currentMessages.map((msg) => (

          <div
            key={msg.id}
            className={`message-row ${msg.type}`}
          >

            <div className="message-bubble">

              <span className="message-text">
                {msg.text}
              </span>

              <span className="message-time">
                {msg.time}
              </span>

              {msg.type === "sent" && (

                <i className="fa-solid fa-check-double message-tick"></i>

              )}

            </div>

          </div>

        ))}

      </div>


      {/* ======================================
          MESSAGE INPUT
      ====================================== */}

      <div className="message-input-area">

        <button className="input-icon">

          <i className="fa-regular fa-face-smile"></i>

        </button>


        <button className="input-icon">

          <i className="fa-solid fa-paperclip"></i>

        </button>


        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />


        <button
          className="send-button"
          onClick={sendMessage}
        >

          <i className="fa-solid fa-paper-plane"></i>

        </button>

      </div>

    </main>

  );

}

export default Chat;
