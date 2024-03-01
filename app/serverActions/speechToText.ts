"use server";

import OpenAI from "openai";
import fs from "fs";
import { Readable } from "stream";

export const speechToText = async (base64Audio: string): Promise<string> => {
  try {
    console.log("server --> base64Audio", base64Audio)
    const openai = new OpenAI();

    // Convert the base64 audio data to a Buffer
    const audioBuffer = Buffer.from(base64Audio, "base64");

    // Define the file path for storing the temporary WAV file
    const filePath = "public/audio/input.wav";

    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audioBuffer);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);
    console.log("readStream", readStream)
    console.log("typeof readStream", typeof(readStream))

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });
    console.log("data.text", data.text);
    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);

    return data.text;
  } catch (error: any) {
    console.error("Error processing audio:", error);
    return error;
  }
};
