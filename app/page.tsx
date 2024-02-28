import Chat from "@/components/chat/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-fg">
      <h1 className=" text-center text-gray-500">
        Welcome to my vocal-Chatbot
      </h1>
      <h3 className="text-center text-gray-800">Press enter to start recording !</h3>
      <Chat />
    </main>
  );
}
