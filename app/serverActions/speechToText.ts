"use server";

import OpenAI, { toFile } from "openai";

export const speechToText = async (base64Audio: string): Promise<string> => {
  try {
    const openai = new OpenAI();

    const audioBuffer = Buffer.from(base64Audio, "base64");

    const data = await openai.audio.transcriptions.create({
      file: await toFile(audioBuffer, "audio.wav"),
      model: "whisper-1",
    });

    return data.text;
  } catch (error: any) {
    console.error("Error processing audio:", error);
    return error;
  }
};
