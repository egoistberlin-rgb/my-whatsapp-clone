
import React, { useState } from "react";

export default function ExtraFeatures({ chats, setChats, isOpen, onClose }) {
  const [newName, setNewName] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");

  const [contactPic, setContactPic] = useState("https://via.placeholder.com/150");

  if (!isOpen) return null; // Agar open nahi hai toh kuch mat dikhao

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}`;

    const newContactObj = {
      id: Date.now(),
      name: newName,
      message: newMsg || "New chat started",
      time: "Just now",
      unread: 0,
      online: true,
      avatar: randomAvatar,
    };

    const updatedChats = [newContactObj, ...chats];
    setChats(updatedChats);

    // 🟢 [NEW 3]: Yahan localStorage me save kiya hai taaki refresh karne par contact gayab na ho
    localStorage.setItem("whatsapp_chats", JSON.stringify(updatedChats));

    setNewName("");
    setNewMsg("");
    setContactPic("https://via.placeholder.com/150"); // Reset photo
    alert("Contact added successfully!");

    // 🟢 [NEW 4]: Contact save hote hi automatic settings box band ho jayega
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleContactImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContactPic(imageUrl);
    }
  };



  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000
    }}>
      <div style={{
        background: "white", padding: "20px", borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)", width: "320px", border: "1px solid #ddd"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0, fontSize: "18px" }}>WhatsApp Settings</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: "16px", cursor: "pointer" }}>
            ❌
          </button>
        </div>

        {/* Section 1: Change DP */}
        <div style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
          <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
            Change Profile DP:
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={profilePic} alt="DP" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: "12px", width: "100%" }} />
          </div>
        </div>

        {/* Section 2: Add Contact */}
        <div>
          <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
            Add New Contact:
          </label>
          <form onSubmit={handleAddContact} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
              <img src={contactPic} alt="Contact" style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover" }} />
              <input type="file" accept="image/*" onChange={handleContactImageChange} style={{ fontSize: "11px" }} />
            </div>
            <input
              type="text"
              placeholder="Contact Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Initial Message"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ background: "#00a884", color: "white", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              Add Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}