"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  const sessionIdRef = useRef<string>(uuidv4());

  useEffect(() => {
    console.log(sessionIdRef.current);
    sessionIdRef.current = uuidv4();
  }, []);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { id: sessionIdRef.current },
  });

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
      <form onSubmit={handleSubmit}>
        <input
          className=" w-full max-w-xl border border-gray-300 mb-8 shadow-xl p-2 text-black rounded-xl bg-gray-200"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}