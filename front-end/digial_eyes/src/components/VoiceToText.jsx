import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Trash2, Send } from "lucide-react";
import { speakText } from "./TextToSpeech";

const BACKEND_URL = "http://127.0.0.1:5000"; // Ensure your Flask backend is running here

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [textAiResponse, setTextAiResponse] = useState(""); // New state for text AI response
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    // Create and configure the SpeechRecognition instance
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript;
      setTranscript((prevTranscript) => prevTranscript + " " + text);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    if (!isListening) {
      setTranscript(""); // Clear any previous transcript
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  // New function to send the transcript to the backend and update the UI with the response
  const sendTextToBackend = async () => {
    if (transcript.trim() !== "") {
      try {
        const response = await fetch(`${BACKEND_URL}/submit_prompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt_text: transcript }),
        });
        const data = await response.json();

        // Use speakText to read the AI response aloud and update the UI state
        speakText(data.AI_Response);
        setTextAiResponse(data.AI_Response);
      } catch (error) {
        console.error("Error submitting prompt:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <button
          onClick={startRecording}
          className={`cursor-pointer p-2 rounded-full ${
            isListening ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button
          onClick={resetTranscript}
          className="cursor-pointer p-2 bg-gray-500 text-white rounded-full"
        >
          <Trash2 size={24} />
        </button>

        {/* Use the new sendTextToBackend function */}
        <button
          onClick={sendTextToBackend}
          className="cursor-pointer p-2 bg-gray-500 text-white rounded-full"
        >
          <Send size={24} />
        </button>
      </div>

      <h2 className="text-lg font-semibold p-2 border border-gray-300 rounded-md min-h-[40px] w-full text-center">
        {isListening ? "Listening..." : transcript || "Press the mic to start recording..."}
      </h2>

      {/* Display the AI response from the text prompt */}
      {textAiResponse && (
        <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
          <h3 className="text-xl font-bold mb-2">AI Response</h3>
          <p>{textAiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceToText;
