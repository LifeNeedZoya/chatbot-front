export interface SimpleMarkdownRendererProps {
  markdownText: string;
  className?: string;
  isUser: boolean;
}

export interface CodeProps {
  inline?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface HeadingProps {
  children?: React.ReactNode;
}

export interface ParagraphProps {
  children?: React.ReactNode;
}

export interface ListProps {
  children?: React.ReactNode;
}

export interface BlockquoteProps {
  children?: React.ReactNode;
}

export interface LinkProps {
  href?: string;
  children?: React.ReactNode;
}

export interface IError {
  detail: {
    message: string;
    type: string;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  session_id: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  currentMessages: ChatMessage[];
  loading: boolean;
  fetchSessions: () => Promise<void>;
  fetchSessionMessages: (sessionId: string) => Promise<void>;
  setCurrentSession: (session: ChatSession | null) => void;
  setCurrentMessages: (messages: ChatMessage[]) => void;
  refreshSessions: () => Promise<void>;
}
