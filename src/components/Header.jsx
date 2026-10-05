
import { useState } from "react";
import "./Header.css";

function Header({ onOpenSettings }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="logo">WhatsApp</h2>
      </div>

      <div className="header-actions">
        {/* Search */}
        <button
          className="icon-btn"
          onClick={() => {
            setSearchOpen(!searchOpen);
            setMenuOpen(false);
          }}
          aria-label="Search"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {/* Camera */}
        <button className="icon-btn" aria-label="Camera">
          <i className="fa-solid fa-camera"></i>

        </button>

        {/* Menu */}
        <div className="menu-wrapper">
          <button
            className="icon-btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            aria-label="Menu"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button>New group</button>
              <button onClick={() => {
                onOpenSettings();
                setMenuOpen(false);
              }}>Settings</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
          />

          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
