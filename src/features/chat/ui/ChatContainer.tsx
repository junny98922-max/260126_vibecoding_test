'use client';

import { useChat } from '../model/useChat';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { CinematicScene } from './CinematicScene';
import { SpeechBubble } from './SpeechBubble';
import { ChoiceToggle } from './ChoiceToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type SceneType = 'walking' | 'battle' | 'boss' | 'victory' | 'rest';

function detectScene(content: string): SceneType {
  const lower = content.toLowerCase();
  if (lower.includes('승리') || lower.includes('물리쳤') || lower.includes('쓰러뜨렸')) {
    return 'victory';
  }
  if (lower.includes('보스') || lower.includes('shadow lord') || lower.includes('마왕')) {
    return 'boss';
  }
  if (lower.includes('공격') || lower.includes('전투') || lower.includes('싸우') || lower.includes('몬스터')) {
    return 'battle';
  }
  if (lower.includes('휴식') || lower.includes('쉬') || lower.includes('캠프')) {
    return 'rest';
  }
  return 'walking';
}

export function ChatContainer() {
  const { messages, isLoading, sessionId, sendMessage, startNewGame } = useChat();
  const [currentScene, setCurrentScene] = useState<SceneType>('walking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 마지막 메시지에서 장면 감지
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setCurrentScene(detectScene(lastMessage.content));
      }
    }
  }, [messages]);

  // 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      {/* 시네마틱 배경 애니메이션 */}
      <CinematicScene sceneType={currentScene} />

      {/* 오버레이 UI */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 헤더 */}
        <ChatHeader onNewGame={startNewGame} sessionId={sessionId} />

        {/* 메시지 영역 (말풍선) */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.slice(-3).map((message) => (
              <SpeechBubble
                key={message.id}
                content={message.content}
                isUser={message.role === 'user'}
              />
            ))}

            {/* 로딩 인디케이터 */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2 px-6 py-4 max-w-xs bg-purple-900/80 backdrop-blur-md rounded-3xl border-2 border-purple-500/50"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-sm text-purple-200">GM이 생각 중...</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* 선택지 영역 */}
        {!isLoading && messages.length > 0 && (
          <div className="px-4 pb-4">
            <ChoiceToggle onSelect={sendMessage} disabled={isLoading} />
          </div>
        )}

        {/* 입력창 */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
