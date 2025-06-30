import { ChatMessage } from "@/types";
import { Bot } from "lucide-react";
import { Message } from "../message";
import { Pending } from "../pending";

export const ChatContent = ({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}) => {
  return (
    <div className="max-w-5xl mx-auto  space-y-6">
      {messages.length === 0 && (
        <div className="text-center py-20">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">
            Ai Chatbot powered by Gemini 2.0 Flash
          </h1>
          <p className="text-gray-500 font-light">Ask me anything</p>
        </div>
      )}

      {messages.map((message, i) => (
        <Message message={message as ChatMessage} key={i} />
      ))}

      {isLoading && !messages && <Pending />}
    </div>
  );
};
