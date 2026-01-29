'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Swords, Shield, Heart, Eye, MessageCircle, ArrowRight } from 'lucide-react';

interface Choice {
  id: string;
  text: string;
  type: 'attack' | 'defend' | 'heal' | 'observe' | 'talk' | 'move';
}

interface ChoiceToggleProps {
  onSelect: (choice: string) => void;
  disabled?: boolean;
}

const SAMPLE_CHOICES: Choice[] = [
  { id: '1', text: '공격한다', type: 'attack' },
  { id: '2', text: '방어한다', type: 'defend' },
  { id: '3', text: '회복한다', type: 'heal' },
  { id: '4', text: '주변을 살핀다', type: 'observe' },
  { id: '5', text: '대화를 시도한다', type: 'talk' },
  { id: '6', text: '앞으로 나아간다', type: 'move' },
];

function getIcon(type: Choice['type']) {
  const iconProps = { className: 'w-5 h-5' };
  switch (type) {
    case 'attack':
      return <Swords {...iconProps} />;
    case 'defend':
      return <Shield {...iconProps} />;
    case 'heal':
      return <Heart {...iconProps} />;
    case 'observe':
      return <Eye {...iconProps} />;
    case 'talk':
      return <MessageCircle {...iconProps} />;
    case 'move':
      return <ArrowRight {...iconProps} />;
  }
}

function getColor(type: Choice['type']) {
  switch (type) {
    case 'attack':
      return 'from-red-600 to-orange-600 border-red-500 hover:border-red-400';
    case 'defend':
      return 'from-blue-600 to-indigo-600 border-blue-500 hover:border-blue-400';
    case 'heal':
      return 'from-green-600 to-emerald-600 border-green-500 hover:border-green-400';
    case 'observe':
      return 'from-yellow-600 to-amber-600 border-yellow-500 hover:border-yellow-400';
    case 'talk':
      return 'from-cyan-600 to-blue-600 border-cyan-500 hover:border-cyan-400';
    case 'move':
      return 'from-teal-600 to-green-600 border-teal-500 hover:border-teal-400';
  }
}

export function ChoiceToggle({ onSelect, disabled = false }: ChoiceToggleProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (choice: Choice) => {
    if (disabled) return;
    setSelectedId(choice.id);
    // 약간의 딜레이 후 선택 전송
    setTimeout(() => {
      onSelect(choice.text);
      setSelectedId(null);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SAMPLE_CHOICES.map((choice, index) => {
          const isSelected = selectedId === choice.id;
          const colorClass = getColor(choice.type);

          return (
            <motion.button
              key={choice.id}
              onClick={() => handleSelect(choice)}
              disabled={disabled}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`relative px-6 py-4 bg-gradient-to-br ${colorClass} rounded-2xl border-2 ${
                isSelected ? 'ring-4 ring-white/50' : ''
              } ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              } backdrop-blur-sm shadow-xl transition-all`}
            >
              {/* 배경 빛 효과 */}
              <motion.div
                animate={
                  isSelected
                    ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }
                    : { opacity: [0.2, 0.4, 0.2] }
                }
                transition={{ duration: isSelected ? 0.5 : 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/10 rounded-2xl"
              />

              {/* 내용 */}
              <div className="relative flex items-center gap-3">
                <div className="flex-shrink-0">
                  {getIcon(choice.type)}
                </div>
                <span className="text-sm font-bold text-white">
                  {choice.text}
                </span>
              </div>

              {/* 선택 체크 */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 또는 직접 입력 안내 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center text-sm text-gray-400"
      >
        또는 하단에 직접 입력하세요
      </motion.div>
    </motion.div>
  );
}
