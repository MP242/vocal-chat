import { Message } from "ai";

const formatMessage = (message: Message) => {
    return `${message.role}: ${message.content}`;
  };

const formatPreviousMessages = async (messages: Message[]) => {
    const formattedMessages = messages.slice(0, -1).map(formatMessage);
    // Si formatMessage est une fonction asynchrone, utilisez await ici
    return formattedMessages;
  };
  

export default formatPreviousMessages;