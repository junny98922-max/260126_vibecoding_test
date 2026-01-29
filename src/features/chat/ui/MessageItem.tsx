'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Message } from '@/types';
import { AnimatedScene } from './AnimatedScene';
import { PlayerActionScene } from './PlayerActionScene';

interface MessageItemProps {
  message: Message;
}

function MessageItemComponent({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className="space-y-4">
      {/* Animated Scene - GM 메시지에만 표시 */}
      {!isUser && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-full"
        >
          <AnimatedScene content={message.content} />
        </motion.div>
      )}

      {/* Player Action Scene - 사용자 메시지에만 표시 */}
      {isUser && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-full"
        >
          <PlayerActionScene content={message.content} />
        </motion.div>
      )}

      <motion.div
        initial={{
          opacity: 0,
          x: isUser ? 20 : -20,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
          delay: isUser ? 0 : 0.3
        }}
        className={`flex gap-3 ${
          isUser ? 'flex-row-reverse ml-auto' : ''
        } max-w-[85%] md:max-w-[80%]`}
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.5,
            delay: isUser ? 0.1 : 0.4,
            type: "spring",
            stiffness: 200
          }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isUser
              ? 'bg-gray-700 text-gray-100'
              : 'bg-purple-900/70 text-purple-200'
          }`}
        >
          {isUser ? 'P' : 'GM'}
        </motion.div>

        {/* Message bubble */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: isUser ? 0.2 : 0.5
          }}
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gray-700 border border-gray-600 rounded-tr-none'
              : 'bg-purple-900/50 border border-purple-700 rounded-tl-none'
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isUser ? 0.3 : 0.6 }}
            className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap"
          >
            {message.content}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const MessageItem = memo(MessageItemComponent);
