'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Swords, MessageCircle, ArrowRight, Eye, Gift, Users } from 'lucide-react';

interface DynamicChoicesProps {
  message: string;
  onSelect: (choice: string) => void;
  disabled?: boolean;
}

interface Choice {
  text: string;
  icon: JSX.Element;
  color: string;
}

function parseChoices(message: string): Choice[] {
  const choices: Choice[] = [];

  // 패턴 1: "1. 선택지" 형식
  const numberPattern = /(\d+)\.\s*([^\n\d]+)/g;
  let match;

  while ((match = numberPattern.exec(message)) !== null) {
    const text = match[2].trim();
    if (text.length > 0 && text.length < 50) {
      choices.push({
        text,
        icon: getIconForChoice(text),
        color: getColorForChoice(text),
      });
    }
  }

  // 패턴 2: "- 선택지" 형식
  if (choices.length === 0) {
    const dashPattern = /[-•]\s*([^\n-•]+)/g;
    while ((match = dashPattern.exec(message)) !== null) {
      const text = match[1].trim();
      if (text.length > 0 && text.length < 50) {
        choices.push({
          text,
          icon: getIconForChoice(text),
          color: getColorForChoice(text),
        });
      }
    }
  }

  return choices.slice(0, 6); // 최대 6개
}

function getIconForChoice(text: string): JSX.Element {
  const lower = text.toLowerCase();
  const iconProps = { className: 'w-5 h-5' };

  if (lower.includes('공격') || lower.includes('싸우') || lower.includes('때리')) {
    return <Swords {...iconProps} />;
  }
  if (lower.includes('대화') || lower.includes('말') || lower.includes('물어')) {
    return <MessageCircle {...iconProps} />;
  }
  if (lower.includes('이동') || lower.includes('가') || lower.includes('앞으로')) {
    return <ArrowRight {...iconProps} />;
  }
  if (lower.includes('살펴') || lower.includes('조사') || lower.includes('확인')) {
    return <Eye {...iconProps} />;
  }
  if (lower.includes('받') || lower.includes('획득') || lower.includes('가져')) {
    return <Gift {...iconProps} />;
  }
  if (lower.includes('도움') || lower.includes('함께') || lower.includes('협력')) {
    return <Users {...iconProps} />;
  }

  return <ArrowRight {...iconProps} />;
}

function getColorForChoice(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('공격') || lower.includes('싸우')) {
    return 'from-red-600 to-orange-600 border-red-500 hover:border-red-400';
  }
  if (lower.includes('대화') || lower.includes('말')) {
    return 'from-cyan-600 to-blue-600 border-cyan-500 hover:border-cyan-400';
  }
  if (lower.includes('이동') || lower.includes('가')) {
    return 'from-teal-600 to-green-600 border-teal-500 hover:border-teal-400';
  }
  if (lower.includes('살펴') || lower.includes('조사')) {
    return 'from-yellow-600 to-amber-600 border-yellow-500 hover:border-yellow-400';
  }
  if (lower.includes('도망') || lower.includes('피하')) {
    return 'from-gray-600 to-slate-600 border-gray-500 hover:border-gray-400';
  }

  return 'from-purple-600 to-pink-600 border-purple-500 hover:border-purple-400';
}

export function DynamicChoices({ message, onSelect, disabled = false }: DynamicChoicesProps) {
  const choices = useMemo(() => parseChoices(message), [message]);

  if (choices.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className={`grid ${choices.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'} gap-3`}>
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(choice.text)}
            disabled={disabled}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={`relative px-4 py-4 bg-gradient-to-br ${choice.color} rounded-2xl border-2 ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } backdrop-blur-sm shadow-xl transition-all`}
          >
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10 rounded-2xl"
            />

            <div className="relative flex items-center gap-3">
              <div className="flex-shrink-0">
                {choice.icon}
              </div>
              <span className="text-sm font-bold text-white text-left line-clamp-2">
                {choice.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-center text-xs text-gray-400"
      >
        선택지를 클릭하거나 직접 입력하세요
      </motion.div>
    </motion.div>
  );
}
