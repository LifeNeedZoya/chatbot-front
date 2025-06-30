import { Bot } from "lucide-react";

export const Pending = () => {
  return (
    <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex-shrink-0 mt-1">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
