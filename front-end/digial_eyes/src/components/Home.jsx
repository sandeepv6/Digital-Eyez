import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = "http://127.0.0.1:5000";

const Home = () => {
  const [message, setMessage] = useState("Connecting to server...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error connecting to server"));
  }, []);

  return (
    <div className="card">
      <h2 style={{ fontSize: "2rem", color: "var(--text-color)", margin: 0 }}>
        Welcome to Digital Eyez
      </h2>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>{message}</p>
      <Link
        to="/camera"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.6em 1.2em",
          background: "var(--primary-color)",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "background-color 0.25s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = "var(--primary-hover)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background = "var(--primary-color)")
        }
      >
        Start Camera
      </Link>
    </div>
  );
};

export default Home;
