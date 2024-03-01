"use server";

import OpenAI from "openai";

export const textToSpeech = async (text: string) => {
  try {
    const openai = new OpenAI();
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    const buffer = await mp3.arrayBuffer();
    const decodedBuffer = Array.from(new Uint8Array(buffer))

    return { decodedBuffer: decodedBuffer }
  } catch (error: any) {
    console.error("Error processing audio:", error);
    return error;
  }
};
