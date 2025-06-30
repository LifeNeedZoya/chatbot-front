"use client";

import type React from "react";

import { ChatSessionSidebar } from "@/components/chat/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useChatContext from "@/contexts/chat";
import { BASE_API_URL } from "@/lib/axiosInstance";
import { getFromLocalStorage } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { useChat } from "ai/react";
import { Loader2, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatContent } from "./content";
import { ChatHeader } from "./header";

export const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchSessionMessages, currentMessages } = useChatContext();
  const token = getFromLocalStorage("token");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("session");

  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      api: `${BASE_API_URL}/chat/stream`,
      streamMode: "stream-data",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        session: search,
      },
    });

  const allMessages = search ? [...currentMessages, ...messages] : messages;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (search) {
      console.log("search:", search);
      fetchSessionMessages(search);
    }
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-[94vh] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:border-r lg:bg-white/80 lg:backdrop-blur-sm">
        <ChatSessionSidebar />
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <ChatSessionSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto p-4 pb-6" ref={chatContainerRef}>
          <ChatContent
            messages={allMessages as ChatMessage[]}
            isLoading={isLoading}
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 p-6 shadow-lg shadow-gray-900/5">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  placeholder="Ask me anything about any topic..."
                  onChange={handleInputChange}
                  disabled={isLoading}
                  onKeyDown={handleKeyDown}
                  className="min-h-[52px] pl-4 pr-4 py-3 text-base border-gray-300/60 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm focus:shadow-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                size="lg"
                className={`h-[52px] w-[52px] rounded-2xl shadow-md transition-all duration-200 ${
                  isLoading &&
                  "bg-gray-300 hover:bg-gray-300 cursor-not-allowed shadow-gray-300/25"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
