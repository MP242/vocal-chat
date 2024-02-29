"use client";
import React, { useState } from 'react';
import readline from "readline";
import fs from "fs";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const buttonRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [microphone, setMicrophone] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [outputFile, setOutputFile] = useState(null);

  const handleButtonClick = () => {
    if (!isRecording) {
      startRecording();
      console.log('Enregistrement en cours... Appuyez sur "q" pour arrêter.');
    } else {
      stopRecording();
      console.log("Enregistrement terminé.");
    }
  };

  const startRecording = () => {
    let mic = new Mic();
    // const newMicrophone = new Microphone();
    const newOutputFile = fs.createWriteStream("marcOutput.wav");
    const newMicStream = newMicrophone.startRecording();
    setMicrophone(newMicrophone);
    setOutputFile(newOutputFile);
    setMicStream(newMicStream);
    setIsRecording(true);

    newMicStream.on("data", (data) => {
      newOutputFile.write(data);
    });

    newMicStream.on("error", (error) => {
      console.error("Error: ", error);
    });

    console.log("Recording... Press Enter to stop");
  };

  const stopRecording = () => {
    if (microphone) {
      microphone.stopRecording();
      outputFile.end();
      setMicrophone(null);
      setOutputFile(null);
      console.log('Recording stopped, processing audio…');
    }
    setIsRecording(false);
  };

  return (
    <div>
      <Button onClick={startRecording} />
    </div>
  );
};

export default buttonRecording;
