'use client';

import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  content: string;
  isUser: boolean;
}

export function SpeechBubble({ content, isUser }: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className={`relative max-w-2xl ${isUser ? 'ml-auto' : 'mr-auto'}`}
    >
      {/* 말풍선 */}
      <div
        className={`px-6 py-4 rounded-3xl backdrop-blur-md ${
          isUser
            ? 'bg-blue-900/80 border-2 border-blue-500/50'
            : 'bg-purple-900/80 border-2 border-purple-500/50'
        } shadow-2xl`}
      >
        {/* 말풍선 꼬리 */}
        <div
          className={`absolute ${
            isUser ? 'right-8 -bottom-3' : 'left-8 -bottom-3'
          } w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] ${
            isUser ? 'border-t-blue-900/80' : 'border-t-purple-900/80'
          }`}
        />

        {/* 발화자 표시 */}
        <div className={`text-xs font-bold mb-2 ${isUser ? 'text-blue-300' : 'text-purple-300'}`}>
          {isUser ? '플레이어' : 'GM'}
        </div>

        {/* 내용 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-100 text-base leading-relaxed whitespace-pre-wrap"
        >
          {content}
        </motion.div>

        {/* 빛 효과 */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-3xl ${
            isUser ? 'bg-blue-400/10' : 'bg-purple-400/10'
          } pointer-events-none`}
        />
      </div>

      {/* 그림자 */}
      <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl -z-10 translate-y-2" />
    </motion.div>
  );
}
