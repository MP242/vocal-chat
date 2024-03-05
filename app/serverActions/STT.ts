"use server";

export async function STT(data: string) {
    const HF_API_KEY = process.env.HF_API_KEY;
    
    if (!HF_API_KEY) {
        throw new Error("Missing HF_API_KEY");
    }
    
    // const response = await fetch(
    //     "https://api-inference.huggingface.co/models/suno/bark",
    //     {
    //     headers: { Authorization: `Bearer ${HF_API_KEY}` },
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     }
    // );
    // const result = await response.text();
    // console.log("from STT result",result)
    const result = "not yet";
    return result;
}