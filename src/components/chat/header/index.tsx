"use client";

import { ChatSessionSidebar } from "@/components/chat/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 p-4 lg:hidden">
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <ChatSessionSidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Chat</span>
        </div>

        <div className="w-10" />
      </div>
    </div>
  );
};
