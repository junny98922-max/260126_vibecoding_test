'use client';

import { motion } from 'framer-motion';
import {
  Swords,
  Shield,
  Heart,
  Zap,
  Eye,
  MessageSquare,
  ArrowRight,
  HandMetal,
} from 'lucide-react';

interface ActionVisualProps {
  content: string;
}

type ActionType = 'attack' | 'defend' | 'heal' | 'special' | 'observe' | 'talk' | 'move' | 'other';

function detectAction(content: string): ActionType {
  const lower = content.toLowerCase();

  if (
    lower.includes('공격') ||
    lower.includes('때리') ||
    lower.includes('베') ||
    lower.includes('쏘')
  ) {
    return 'attack';
  }

  if (
    lower.includes('막') ||
    lower.includes('방어') ||
    lower.includes('피하')
  ) {
    return 'defend';
  }

  if (
    lower.includes('치료') ||
    lower.includes('회복') ||
    lower.includes('포션')
  ) {
    return 'heal';
  }

  if (
    lower.includes('스킬') ||
    lower.includes('마법') ||
    lower.includes('특수')
  ) {
    return 'special';
  }

  if (
    lower.includes('살펴') ||
    lower.includes('조사') ||
    lower.includes('확인')
  ) {
    return 'observe';
  }

  if (
    lower.includes('말') ||
    lower.includes('대화') ||
    lower.includes('물어')
  ) {
    return 'talk';
  }

  if (
    lower.includes('이동') ||
    lower.includes('가') ||
    lower.includes('달리')
  ) {
    return 'move';
  }

  return 'other';
}

function getActionIcon(action: ActionType) {
  const iconProps = { className: 'w-full h-full' };

  switch (action) {
    case 'attack':
      return <Swords {...iconProps} />;
    case 'defend':
      return <Shield {...iconProps} />;
    case 'heal':
      return <Heart {...iconProps} />;
    case 'special':
      return <Zap {...iconProps} />;
    case 'observe':
      return <Eye {...iconProps} />;
    case 'talk':
      return <MessageSquare {...iconProps} />;
    case 'move':
      return <ArrowRight {...iconProps} />;
    default:
      return <HandMetal {...iconProps} />;
  }
}

function getActionColor(action: ActionType): string {
  switch (action) {
    case 'attack':
      return 'from-red-500 to-orange-600';
    case 'defend':
      return 'from-blue-500 to-indigo-600';
    case 'heal':
      return 'from-green-500 to-emerald-600';
    case 'special':
      return 'from-purple-500 to-pink-600';
    case 'observe':
      return 'from-yellow-500 to-amber-600';
    case 'talk':
      return 'from-cyan-500 to-blue-600';
    case 'move':
      return 'from-teal-500 to-green-600';
    default:
      return 'from-gray-500 to-slate-600';
  }
}

export function ActionVisual({ content }: ActionVisualProps) {
  const action = detectAction(content);
  const icon = getActionIcon(action);
  const colorClass = getActionColor(action);

  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        type: 'spring',
        stiffness: 250,
      }}
      className="relative"
    >
      {/* 펄스 효과 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-full`}
      />

      {/* 아이콘 */}
      <div className={`relative w-12 h-12 flex items-center justify-center bg-gradient-to-br ${colorClass} rounded-full text-white shadow-lg`}>
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
        >
          {icon}
        </motion.div>
      </div>

      {/* 반짝이는 입자들 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, (i - 1) * 20],
            y: [0, -20 - i * 5],
          }}
          transition={{
            duration: 1,
            delay: 0.5 + i * 0.1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className={`absolute top-0 left-1/2 w-1 h-1 bg-gradient-to-br ${colorClass} rounded-full`}
        />
      ))}
    </motion.div>
  );
}
