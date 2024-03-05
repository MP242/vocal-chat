"use client";

import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Microphone } from "../microphone/microphone";
import { useChat } from "ai/react";
import { textToSpeech } from "@/app/serverActions/textToSpeech";
import { TTS } from "@/app/serverActions/TTS";


export const Chat = () => {
  const sessionIdRef = useRef<string>(uuidv4());
  const { startRecording, stopRecording, text } = useRecordVoice();
  const [vocalId, setVocalId] = useState<string>(uuidv4());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(sessionIdRef.current);
    sessionIdRef.current = uuidv4();
  }, []);

  const { messages, append } = useChat({
    body: { id: sessionIdRef.current },
  });

  useEffect(() => {
    console.log("L26 chatCompo - text", text);
    if (text) {
      const input = text.trim();
      append({ role: "user", content: input }, { data: { vocalId: vocalId } });
      setLoading(true);
    }
  }, [text]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        serverCreateVocal(lastMessage.content).then(Res => {
          const { decodedBuffer } = Res;

          const buffer = new Uint8Array(decodedBuffer);

          const blob = new Blob([buffer], { type: 'audio/mpeg' });
          // Créer un objet URL pour le Blob
          const audioURL = URL.createObjectURL(blob);
          // Créer un élément audio et configurer sa source
          const audio = new Audio(audioURL);
          // Lecture de l'audio
          audio.play();

          setVocalId(uuidv4());
          setLoading(false);
        }).catch(error => {
          console.error("Error decoding audio buffer:", error);
        });
      }
    }
  }, [messages]);

  const serverCreateVocal = async (text: string) => {
    // const response = await textToSpeech(text);
    const response = await TTS(text);

    return response;
  };

  return (
    <div className="mx-auto  w-full max-w-xl  flex flex-col stretchrounded-xl gap-5">
      <div className="mx-auto min-h-[300px] w-full max-w-xl flex flex-col stretch bg-gray-200 rounded-xl">
        {messages.length > 0
          ? messages.map((m) => (
              <div
                key={m.id}
                className={`m-4 flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`text-black rounded-xl p-3 max-w-xs ${
                    m.role === "user" ? "bg-green" : "bg-gray-400"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))
          : null}
      </div>
      {loading && <p>Loading...</p>}
      <Microphone
        startRecording={startRecording}
        stopRecording={stopRecording}
        loading={loading}
      />
    </div>
  );
};
