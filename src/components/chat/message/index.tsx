import { MDRenderer } from "@/components/MDRenderer";
import type { ChatMessage } from "@/types";
import { Bot, User } from "lucide-react";

export const Message = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      } animate-in slide-in-from-bottom-2 duration-300`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      <div className="max-w-4xl rounded-2xl p-4 shadow-sm border hover:shadow-md bg-white/80 backdrop-blur-sm text-gray-800 border-gray-200/60 shadow-gray-900/5">
        <MDRenderer markdownText={message.content} isUser={isUser} />
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-md shadow-gray-600/25">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
