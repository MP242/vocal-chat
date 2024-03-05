"use server";

import { toFile } from "openai";

export const whisperSTT = async (base64Audio: string): Promise<string> => {
  const WHISPER_AI_STT_URL = process.env.WHISPER_AI_STT_URL;

  if (!WHISPER_AI_STT_URL) {
    throw new Error("Missing WHISPER_AI_STT_URL");
  }

  const audioBuffer = Buffer.from(base64Audio, "base64");
  const file = await toFile(audioBuffer, "audio.wav");

  const formData = new FormData();
  formData.append("file", file, "audio.wav");

  try {
    const response = await fetch(WHISPER_AI_STT_URL + "/whisper", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const result = await response.json();

    return result.results[0].transcript;
  } catch (error) {
    console.error("Error calling Whisper API:", error);
    throw error;
  }
};
