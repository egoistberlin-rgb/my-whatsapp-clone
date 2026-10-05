
import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ chats, selectedChat, onSelectChat }) {
    const [search, setSearch] = useState("");
    // Active filter ko track karega
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredChats = chats.filter((chat) => {
        const matchesSearch =
            chat.name
                .toLowerCase()
                .includes(search.toLowerCase());

        let matchesFilter = true;


        // Unread filter
        if (activeFilter === "Unread") {

            matchesFilter = chat.unread > 0;

        }
        if (activeFilter === "Groups") {

            matchesFilter = chat.isGroup === true;

        }
        return matchesSearch && matchesFilter;

    });



    return (
        <aside className="sidebar">

            {/* =================================
          SEARCH BAR
          Chats search karne ke liye
      ================================= */}
            <div className="chat-search">
                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    placeholder="Search or start new chat"
                    value={search}

                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            {/* =================================
          CHAT FILTERS
      ================================= */}
            <div className="chat-filters">

                <button
                    className={activeFilter === "All" ? "active" : ""}
                    onClick={() => setActiveFilter("All")}
                >
                    All
                </button>

                <button
                    className={activeFilter === "Unread" ? "active" : ""}
                    onClick={() => setActiveFilter("Unread")}
                >
                    Unread
                </button>

                <button
                    className={activeFilter === "Groups" ? "active" : ""}
                    onClick={() => setActiveFilter("Groups")}
                >
                    Groups
                </button>

            </div>


            {/* =================================
          CHAT LIST
      ================================= */}
            <div className="chat-list">

                {filteredChats.map((chat) => (
                    <div className={`chat-item ${selectedChat?.id === chat.id ? "selected" : ""
                        }`} key={chat.id} onClick={() => onSelectChat(chat)}>

                        {/* Profile */}
                        <div className="profile-wrapper">

                            <div className="profile-image" style={{ overflow: "hidden" }}>
                                {chat.avatar ? (
                                    <img
                                        src={chat.avatar}
                                        alt={chat.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    chat.name.charAt(0)
                                )}
                            </div>

                            {/* Online indicator */}
                            {chat.online && (
                                <span className="online-dot"></span>
                            )}

                        </div>


                        {/* Chat Information */}
                        <div className="chat-info">

                            <div className="chat-top">

                                <h3>{chat.name}</h3>

                                <span className="chat-time">
                                    {chat.time}
                                </span>

                            </div>


                            <div className="chat-bottom">

                                <p>{chat.message}</p>

                                {/* Unread messages */}
                                {chat.unread > 0 && (
                                    <span className="unread-count">
                                        {chat.unread}
                                    </span>
                                )}

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </aside>
    );
}

export default Sidebar;
