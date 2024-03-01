"use server";

import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const textToSpeech = async (text: string, vocalId: string) => {
  try {
    const openai = new OpenAI();

    console.log("text", text);

    const speechFile = path.resolve(`./public/audio/speech_${vocalId}.mp3`);

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    console.log(`Le fichier ${speechFile} a été créé depuis le backend.`);

    return speechFile;
  } catch (error: any) {
    console.error("Error processing audio:", error);
    return error;
  }
};
