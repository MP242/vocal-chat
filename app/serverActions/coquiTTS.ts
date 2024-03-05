"use server";

export const coquiTTS = async (data: string) => {
  const COQUI_AI_TTS_URL = process.env.COQUI_AI_TTS_URL;

  if (!COQUI_AI_TTS_URL) {
    throw new Error("Missing HF_API_KEY");
  }
  console.log("COQUI_AI_TTS_URL", COQUI_AI_TTS_URL);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      text: data,
      "language-id": "fr-fr",
      "style-wav": "",
    },
  };

  const response = await fetch(COQUI_AI_TTS_URL + "/api/tts", requestOptions);
  if (!response.ok) {
    throw new Error(`TTS request failed with status ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const decodedBuffer = Array.from(new Uint8Array(buffer));

  return { decodedBuffer: decodedBuffer };
};
