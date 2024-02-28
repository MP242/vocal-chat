"use server";

import { StreamingTextResponse, Message } from "ai";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import clientPromise from "@/libs/mongodb";
import promptTemplate from "@/actions/promptActions";
import formatPreviousMessages from "@/actions/formatMessageAction";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { LLMChain } from "langchain/chains";
import { saveMessageToDatabase } from "@/actions/historyToMongoActions";

// export const runtime = "edge";



//si trop de d'hallucination, je peux faire une sequentialChain
//chain 1 répond à la question.
//chain 2 fais un résumé de la réponse en francais.

//"Tu est Tom, un conseiller commercial du groupe Austral Energie, spécialisé dans l'autonomie energétique en France, pour les particuliers et les entreprises. Tu as pour but de prendre des rendez-vous avec le prospect, les personnes qui parlent avec toi n'ont pas envie de perdre leur temps, ne pose pas de question qui n'ont pas de rapport avec ton but de prendre un rendez-vous. Tu dois prendre les informations suivantes: Nom, Prénom, et Adresse mail, tu doit impérativement prendre ces informations. soit synthétique avec des phrases courtes et précises."
const TEMPLATE = `Tu es un assistant qui guide les clients de l'entreprise Austral Energie en fournissant des réponses concises et pertinentes pour ne pas surcharger l'utilisateur. N'affiche pas de note ou de remarque. Si tu ne sais pas répondre à une question, dis simplement que tu ne sais pas. Ne fais pas de dialogue tout seul. Tu dois obligatoirement répondre en Français et 'User:' ne doit pas être présent dans ta réponse.

Conversation en cours :
{chat_history}

question: {input}`;


export async function POST(req: Request) {
  console.log(process.env.API_URL);
  console.log(process.env.MODEL_NAME);

  const { messages, id } = await req.json();
  console.log("mes messages", messages);
  console.log("id", id);

  const formattedPreviousMessages = await formatPreviousMessages(messages);
  console.log("formattedPreviousMessages", formattedPreviousMessages);
  const currentMessageContent = messages[messages.length - 1].content;
  const currentMessageRole= messages[messages.length - 1].role;
  console.log("currentMessageContent", currentMessageContent);

  if(messages.length > 1){
    const previousAiMessageContent = messages[messages.length - 2].content;
    const previousAiMessagerole = messages[messages.length - 2].role;
    console.log("previousMessageContent", previousAiMessageContent);
    console.log("previousAiMessagerole", previousAiMessagerole);
    await saveMessageToDatabase(previousAiMessagerole,id, previousAiMessageContent);
  }

  await saveMessageToDatabase(currentMessageRole,id, currentMessageContent);

  const prompt = await promptTemplate(TEMPLATE);

  const model = new ChatOllama({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    model: process.env.MODEL_NAME,
  });

  const outputParser = new BytesOutputParser();

  // const chain = new LLMChain({ llm: model, prompt,memory ,outputParser });
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);

  // return new Response("hello world");
}
