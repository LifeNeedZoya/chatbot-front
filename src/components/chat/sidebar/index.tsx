"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatSession } from "@/contexts/chat";
import type { ChatSession } from "@/types";
import { MessageCircle, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const ChatSessionSidebar = () => {
  const { sessions, loading, fetchSessionMessages } = useChatSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSessionId = searchParams.get("session");

  const handleSessionClick = async (session: ChatSession): Promise<void> => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("session", session.id);
    router.push(`?${params.toString()}`);

    await fetchSessionMessages(session.id);
  };

  if (loading && sessions.length === 0) {
    return (
      <div className={`flex flex-col h-full `}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat Sessions
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">
              Loading sessions...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full `}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Chat Sessions
          <Badge variant="secondary" className="ml-auto">
            {sessions.length}
          </Badge>
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <Button
          className="w-full m-2 mx-2"
          variant={"outline"}
          onClick={() => router.push("/")}
        >
          <Plus /> <span>Add new session</span>
        </Button>
        {sessions.length === 0 ? (
          <div className="p-4 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground mb-2">
              No chat sessions yet
            </p>
            <p className="text-xs text-muted-foreground">
              Start a new conversation to see it here
            </p>
          </div>
        ) : (
          <div className="p-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  currentSessionId === session.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-accent border border-transparent"
                }`}
                onClick={() => handleSessionClick(session)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <MessageCircle className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">
                    {session.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
