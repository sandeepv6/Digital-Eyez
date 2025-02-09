import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { speakText } from "./TextToSpeech";

const BACKEND_URL = "http://127.0.0.1:5000"; // Ensure your Flask backend is running here

function CameraScreen() {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState("");
  const [aiResponse, setAiResponse] = useState(""); // State for AI_Response
  const [imageSrc, setImageSrc] = useState(null);

  // Function to capture an image
  const captureImage = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      setImageSrc(capturedImage); // Display the captured image
      setAiResponse(""); // Clear previous AI response before sending a new query
      sendImageToBackend(capturedImage);
    }
  };

  // Function to send the image to Flask backend
  const sendImageToBackend = (imageSrc) => {
    fetch(`${BACKEND_URL}/process_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageSrc }),
    })
      .then((response) => response.json())
      .then((data) => {
        speakText(data.AI_Response);
        setAiResponse(data.AI_Response);
        console.log(data.AI_Response); // Update AI response with new data
        setPrediction(data.result);
        
      })
      .catch((error) => {
        console.error("Error sending image:", error);
        setPrediction("Error processing image");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <h1 className="text-2xl text-white mb-4">Live Camera Feed</h1>

      {/* Webcam Component */}
      <div className="w-full max-w-md border-4 border-white rounded-lg overflow-hidden shadow-lg">
        <Webcam
          ref={webcamRef}
          className="w-full h-auto"
          screenshotFormat="image/jpeg"
        />
      </div>

      {/* Capture and Analyze Button */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={captureImage}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          Capture Image
        </button>
      </div>

      {/* Show captured image (Optional) */}
      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-white mb-2">Captured Image</h2>
          <img
            src={imageSrc}
            alt="Captured"
            className="border-2 border-white rounded-lg"
          />
        </div>
      )}

      {/* Show AI Prediction Result */}
      {prediction && (
        <p className="text-white mt-4">Result: {prediction}</p>
      )}

      {/* Section to show AI Response */}
      {aiResponse && (
        <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
          <h3 className="text-white text-xl mb-2">AI Response</h3>
          <p className="text-white">{aiResponse}</p>
        </div>
      )}

      {/* Back Button */}
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default CameraScreen;
