import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const openai = new OpenAI();
  const { text,id } = await req.json();

  console.log("text", text);

  const speechFile = path.resolve(`./public/audio/speech_${id}.mp3`);
 
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  return NextResponse.json({ routeMp3: speechFile });
}
