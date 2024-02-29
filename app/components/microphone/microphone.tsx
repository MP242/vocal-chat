"use client";

import { useEffect, useState } from "react";

interface MicrophoneProps {
  startRecording: () => void;
  stopRecording: () => void;
  loading: boolean;
}

export const Microphone = ({startRecording,stopRecording,loading}:MicrophoneProps) => {
  const [isRecording, setIsRecording] = useState(false);


  useEffect(() => {
    if(!loading){
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isRecording) {
        setIsRecording(true);
        startRecording();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isRecording) {
        setIsRecording(false);
        stopRecording();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };}
  }, [startRecording,stopRecording]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <button
        className={`border-none h-[100px] w-[100px] rounded-full ${
          isRecording ? "bg-gray-900" : "bg-gray-200"
        }`}
        disabled={loading}
      >
        <p className="text-[50px] rounded-full ">
         {loading? "❌" : "🎙️"} 
        </p>
      </button>
    </div>
  );
};
