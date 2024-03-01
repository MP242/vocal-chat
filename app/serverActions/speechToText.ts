"use server";

import OpenAI, {toFile} from "openai";
import fs from "fs";
import path from "path";

const dirPath = path.join(__dirname, 'public/audio');

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
}

export const speechToText = async (base64Audio: string): Promise<string> => {
  try {
    console.log("server --> base64Audio", base64Audio)
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
