import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Webcam from "react-webcam";

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

function CameraScreen() {
  const [prediction, setPrediction] = useState("");

  const captureAndSendImage = async (imageSrc) => {
    try {
      const response = await fetch(`${BACKEND_URL}/process_image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      const data = await response.json();
      setPrediction(data.result);
    } catch (error) {
      console.error("Error sending image:", error);
      setPrediction("Error processing image");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <Header />
      <h1 className="text-2xl text-white mb-4">Live Camera Feed</h1>
      <div className="w-full max-w-md border-4 border-white rounded-lg overflow-hidden shadow-lg">
        <Webcam
          className="w-full h-auto"
          screenshotFormat="image/jpeg"
          onUserMediaError={() => setPrediction("Error accessing camera")}
        />
      </div>
      <button
        onClick={() => {
          const webcamElement = document.querySelector("video");
          if (webcamElement) {
            const imageSrc = webcamElement.toDataURL("image/jpeg");
            captureAndSendImage(imageSrc);
          }
        }}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:opacity-90 transition"
      >
        Analyze Image
      </button>
      <p className="text-white mt-4">{prediction}</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:opacity-90 transition">
        Back to Home
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
