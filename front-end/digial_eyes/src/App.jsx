import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Webcam from "react-webcam";
import CameraScreen from "./components/CameraScreen";

const BACKEND_URL = "http://127.0.0.1:5000"; // Change this if backend is running on a different URL

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center text-lg font-semibold shadow-md">
      Accessibility App
    </header>
  );
}

function Home() {
  const [message, setMessage] = useState("Connecting to server...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error connecting to server"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Enhancing Accessibility</h1>
      <p className="text-lg mb-4 text-gray-800 text-center px-4">{message}</p>
      <Link to="/camera" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:opacity-90 transition">
        Start Camera
      </Link>
    </div>
  );
}


function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center p-3 fixed bottom-0 w-full">
      &copy; 2025 Accessibility App. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera" element={<CameraScreen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
