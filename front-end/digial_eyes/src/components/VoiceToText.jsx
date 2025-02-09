import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Trash2, StopCircle } from "lucide-react";

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    // Create a single SpeechRecognition instance
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening until manually stopped
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
      setTranscript((prevTranscript) => prevTranscript + " " + text); // Append new speech
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    // Store recognition instance in ref
    recognitionRef.current = recognition;
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;

    if (!isListening) {
      setTranscript(""); // Clear previous transcript
      recognitionRef.current.start(); // Start recognition only if not already listening
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop(); // Stop recognition properly
    }
  };

  const resetTranscript = () => {
    setTranscript("");
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
          onClick={stopRecording}
          className="cursor-pointer p-2 bg-yellow-500 text-white rounded-full"
        >
          <StopCircle size={24} />
        </button>

        <button
          onClick={resetTranscript}
          className="cursor-pointer p-2 bg-gray-500 text-white rounded-full"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <h2 className="text-lg font-semibold p-2 border border-gray-300 rounded-md min-h-[40px] w-full text-center">
        {isListening ? "Listening..." : transcript || "Press the mic to start recording..."}
      </h2>
    </div>
  );
};

export default VoiceToText;
