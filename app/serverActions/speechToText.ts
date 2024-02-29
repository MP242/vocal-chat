"use server";

import OpenAI from "openai";
import fs from "fs";

export const speechToText = async (base64Audio: string): Promise<string> => {
  try {
    const openai = new OpenAI();

    // Convert the base64 audio data to a Buffer
    const audio = Buffer.from(base64Audio, "base64");

    // Define the file path for storing the temporary WAV file
    const filePath = "public/audio/input.wav";

    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);
    const { text } = data;
    return text;
  } catch (error: any) {
    console.error("Error processing audio:", error);
    return error;
  }
};
