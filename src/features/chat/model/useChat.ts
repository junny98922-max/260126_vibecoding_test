'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Message } from '@/types';
import { saveMessage, getRecentMessages } from '@/shared/api/conversations';
import {
  getOrCreateSessionId,
  generateNewSessionId,
  clearSession,
  setSessionId,
} from '@/shared/lib/session';
import { OPENING_MESSAGE } from '@/shared/config/prompts';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionIdState] = useState<string>('');

  // Initialize session and load opening message
  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionIdState(id);

    // Add opening message
    const openingMsg: Message = {
      id: `opening_${Date.now()}`,
      role: 'assistant',
      content: OPENING_MESSAGE,
      timestamp: new Date(),
    };
    setMessages([openingMsg]);

    // Save opening message to DB
    saveMessage({
      session_id: id,
      role: 'assistant',
      content: OPENING_MESSAGE,
    });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: `user_${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Save user message to DB
      await saveMessage({
        session_id: sessionId,
        role: 'user',
        content: content.trim(),
      });

      try {
        // Get recent messages for context
        const recentMessages = await getRecentMessages(sessionId, 20);

        // Call API to get AI response
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            message: content.trim(),
            history: recentMessages,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Save assistant message to DB
        await saveMessage({
          session_id: sessionId,
          role: 'assistant',
          content: data.reply,
        });
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  const startNewGame = useCallback(() => {
    clearSession();
    const newId = generateNewSessionId();
    setSessionId(newId);
    setSessionIdState(newId);

    const openingMsg: Message = {
      id: `opening_${Date.now()}`,
      role: 'assistant',
      content: OPENING_MESSAGE,
      timestamp: new Date(),
    };
    setMessages([openingMsg]);

    // Save opening message to DB
    saveMessage({
      session_id: newId,
      role: 'assistant',
      content: OPENING_MESSAGE,
    });
  }, []);

  return {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    startNewGame,
  };
}
