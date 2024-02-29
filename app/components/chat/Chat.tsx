"use client";

import { useRecordVoice } from "@/app/hooks/useRecordVoice";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Microphone } from "../microphone/microphone";
import { useChat } from "ai/react";
import { playAudio } from "@/app/actions/playAudioAction";

export default function Chat() {
  const sessionIdRef = useRef<string>(uuidv4());
  const { startRecording, stopRecording, text } = useRecordVoice();
  const [vocalId, setVocalId] = useState<string>(uuidv4());

  useEffect(() => {
    console.log(sessionIdRef.current);
    sessionIdRef.current = uuidv4();
  }, []);

  const { messages, append } = useChat({
    body: { id: sessionIdRef.current },
  });

  useEffect(() => {
    const input = text.trim();
    if (text) {
      append({ role: "user", content: input }, { data: { vocalId: vocalId } });
    }
  }, [text]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        playAudio(`/audio/speech_${vocalId}.mp3`);
        setVocalId(uuidv4());
        fetch("/api/deleteVocal", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            vocalId: vocalId,
          }),
        });
      }
    }
  }, [messages]);

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
      <Microphone
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </div>
  );
}