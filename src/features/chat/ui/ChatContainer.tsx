'use client';

import { useChat } from '../model/useChat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatContainer() {
  const { messages, isLoading, sessionId, sendMessage, startNewGame } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-[#0A0118]">
      <ChatHeader onNewGame={startNewGame} sessionId={sessionId} />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
