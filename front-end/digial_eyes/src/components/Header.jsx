import React from "react";

const Header = () => {
  return (
    <header
      className="header"
      style={{
        padding: "1rem",
        background: "var(--primary-color)",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ margin: 0 }}>Digital Eyez</h1>
    </header>
  );
};

export default Header;
