"use client";
import { blobToBase64 } from "@/app/actions/blobToBase64Action";
import { createMediaStream } from "@/app/actions/createMediaStreamAction";
import { useEffect, useState, useRef } from "react";
import { speechToText } from "../serverActions/speechToText";
import { whisperSTT } from "../serverActions/whisperSTT";


export const useRecordVoice = () => {
  const [text, setText] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef<BlobPart[]>([]);

  const startRecording = () => {
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const getText = async (base64data:string) => {
    try {
      // const text= await speechToText(base64data);
      const text = await whisperSTT(base64data);


      console.log("from useRecordVoice text",text)
      const monText = text.toString();
      console.log("from useRecordVoice monText",monText)
      setText(monText);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream:MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream)
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev:BlobEvent) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);

  return { recording, startRecording, stopRecording, text };
};