import { ChatOllama } from "@langchain/community/chat_models/ollama";
import formatPreviousMessages from "@/app/actions/formatMessageAction";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { saveMessageToDatabase } from "@/app/actions/historyToMongoAction";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";

//si trop de d'hallucination, je peux faire une sequentialChain
//chain 1 répond à la question.
//chain 2 fais un résumé de la réponse en francais.

//"Tu est Tom, un conseiller commercial du groupe Austral Energie, spécialisé dans l'autonomie energétique en France, pour les particuliers et les entreprises. Tu as pour but de prendre des rendez-vous avec le prospect, les personnes qui parlent avec toi n'ont pas envie de perdre leur temps, ne pose pas de question qui n'ont pas de rapport avec ton but de prendre un rendez-vous. Tu dois prendre les informations suivantes: Nom, Prénom, et Adresse mail, tu doit impérativement prendre ces informations. soit synthétique avec des phrases courtes et précises."
const TEMPLATE = `Tu es un assistant qui guide les clients de l'entreprise Austral Energie en fournissant des réponses concises et pertinentes pour ne pas surcharger l'utilisateur. N'affiche pas de note ou de remarque. Si tu ne sais pas répondre à une question, dis simplement que tu ne sais pas. Ne fais pas de dialogue tout seul. Tu dois obligatoirement répondre en Français et 'User:' ne doit pas être présent dans ta réponse.

Conversation en cours :
{chat_history}

question: {input}`;

export async function POST(req: Request) {
  try {
    const myReq = await req.json();
    console.log("myReq", myReq);
    const { messages, id, data } = myReq;

    const formattedPreviousMessages = await formatPreviousMessages(messages);
    const currentMessageContent = messages[messages.length - 1].content;
    const currentMessageRole = messages[messages.length - 1].role;

    // //a remplacer par MongoDBChatMessageHistory
    // if(messages.length > 1){
    //   const previousAiMessageContent = messages[messages.length - 2].content;
    //   const previousAiMessagerole = messages[messages.length - 2].role;
    //   console.log("previousMessageContent", previousAiMessageContent);
    //   console.log("previousAiMessagerole", previousAiMessagerole);
    //   await saveMessageToDatabase(previousAiMessagerole,id, previousAiMessageContent);
    // }
    // //a remplacer par MongoDBChatMessageHistory
    // await saveMessageToDatabase(currentMessageRole,id, currentMessageContent);

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOllama({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      model: process.env.MODEL_NAME,
    });

    const chain = prompt.pipe(model);

    const stream = await chain.invoke({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    const llmResponse = stream.content.toString().trim();

    return new NextResponse(llmResponse);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      "Une erreur s'est produite lors du traitement de votre requête.",
      {
        status: 500,
      }
    );
  }
}
