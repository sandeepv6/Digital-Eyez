import React, { useState } from "react";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { useVoiceToText } from "react-speakup";

const VoiceToText = () => {
  const { startListening, stopListening, transcript, reset } = useVoiceToText({
    continuous: false,
    lang: "en-US",
  });

  const [userTranscript, setUserTranscript] = useState("");

  // Start recording
  const handleStart = () => {
    setUserTranscript(""); // Reset previous transcript
    startListening();
  };

  // Stop recording and update transcript
  const handleStop = () => {
    stopListening();
    setUserTranscript(transcript); // Update state with final transcript
    reset();
  };

  // Reset the transcript manually
  const handleReset = () => {
    setUserTranscript("");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <Mic onClick={handleStart} role="button" className="cursor-pointer text-green-500" />
        <MicOff onClick={handleStop} role="button" className="cursor-pointer text-red-500" />
        <Trash2 onClick={handleReset} role="button" className="cursor-pointer text-gray-500" />
      </div>
      <h2 className="text-lg font-semibold p-2 border border-gray-300 rounded-md min-h-[40px] w-full text-center">
        {userTranscript || "Press the mic to start recording..."}
      </h2>
    </div>
  );
};

export default VoiceToText;