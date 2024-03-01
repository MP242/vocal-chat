import {Chat} from "@/app/components/chat/Chat";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center px-24 bg-fg">
      <h1 className=" text-center text-gray-500 pt-5">
        Welcome to my vocal-Chatbot
      </h1>
      <h3 className="text-center text-gray-800">Press Enter to start recording and keep it pressed until the end of the message!</h3>
      <Chat />
    </main>
  );
}
