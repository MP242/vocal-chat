import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const { vocalId } = await req.json();
    const speechFile = path.resolve(`./public/audio/speech_${vocalId}.mp3`);
    try {
        await fs.promises.access(speechFile);
        await fs.promises.unlink(speechFile);
        console.log(`Le fichier ${speechFile} a été supprimé depuis le backend.`);
    } catch (error) {
        console.log(`Le fichier ${speechFile} n'existe pas.`);
    }
    return NextResponse.json({ routeMp3: speechFile });
}