"use client";

import api from "@/lib/axiosInstance";
import { getFromLocalStorage } from "@/lib/utils";
import type { ChatContextType, ChatMessage, ChatSession } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatSession = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatSession must be used within a ChatSessionProvider");
  }
  return context;
};

export const ChatSessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSessions = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await api.get("/chat/");

      setSessions(data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionMessages = async (sessionId: string): Promise<void> => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const { data } = await api.get(`/chat/session/${sessionId}`);
      console.log("session id response:", data);

      setCurrentMessages(data.messages || []);
      setCurrentSession(data.session || data);
    } catch (err) {
      console.error("Error fetching session messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getFromLocalStorage("token");
    if (token) {
      fetchSessions();
    } else {
      setSessions([]);
      setCurrentSession(null);
      setCurrentMessages([]);
    }
  }, []);

  const refreshSessions = async (): Promise<void> => {
    await fetchSessions();
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentSession,
        currentMessages,
        loading,
        fetchSessions,
        fetchSessionMessages,
        setCurrentSession,
        setCurrentMessages,
        refreshSessions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useChat;
