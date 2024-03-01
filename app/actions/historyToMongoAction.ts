import clientPromise from "@/app/libs/mongodb";

export async function saveMessageToDatabase(role:string,id:string, currentMessageContent:string) {
  try {
    const client = await clientPromise;
    const collection = client.db(process.env.BDD_NAME!).collection(process.env.COLLECTION_NAME!);
    await collection.insertOne({
      role: role,
      conversationId: id,
      message: currentMessageContent,
      timestamp: new Date(),
    });
    console.log("Message saved to database successfully.");
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
}
