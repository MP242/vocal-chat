"use server";

export async function TTS(data: string) {
  const HF_API_KEY = process.env.HF_API_KEY;

  if (!HF_API_KEY) {
    throw new Error("Missing HF_API_KEY");
  }

  console.log("my HF_API_KEY",HF_API_KEY)
  console.log("my data",data)

  const response = await fetch(
    "https://api-inference.huggingface.co/models/suno/bark-small",
    {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify({"inputs": data}),
    }
  );
  if(!response.ok){
    console.log("from TTS response",response.status)
    throw new Error(`TTS request failed with status ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const decodedBuffer = Array.from(new Uint8Array(buffer))

  return { decodedBuffer: decodedBuffer }
}