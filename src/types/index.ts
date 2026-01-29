// Database types
export interface Conversation {
  id: string; // UUID in Supabase
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface NewConversation {
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
}

// UI state types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// OpenAI types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
