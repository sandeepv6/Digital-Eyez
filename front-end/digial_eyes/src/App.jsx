import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Webcam from "react-webcam";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center text-lg font-semibold shadow-md">
      Accessibility App
    </header>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Enhancing Accessibility</h1>
      <p className="text-lg mb-4 text-gray-800 text-center px-4">
        This application provides real-time AI-powered assistance for visually impaired users.
      </p>
      <Link to="/camera" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:opacity-90 transition">
        Start Camera
      </Link>
    </div>
  );
}

function CameraScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <Header />
      <h1 className="text-2xl text-white mb-4">Live Camera Feed</h1>
      <div className="w-full max-w-md border-4 border-white rounded-lg overflow-hidden shadow-lg">
        <Webcam className="w-full h-auto" />
      </div>
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
