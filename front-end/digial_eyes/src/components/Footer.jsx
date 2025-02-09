import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        padding: "1rem",
        background: "var(--bg-dark)",
        color: "#fff",
        textAlign: "center",
        fontSize: "0.9em",
      }}
    >
      &copy; {new Date().getFullYear()} Digital Eyez. All rights reserved.
    </footer>
  );
};

export default Footer;
