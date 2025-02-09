import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CameraScreen from "./components/CameraScreen";

function App() {
  return (
    <Router>
      <div
        className="app-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<CameraScreen />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
