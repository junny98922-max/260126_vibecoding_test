'use client';

import { motion } from 'framer-motion';
import {
  Swords,
  Shield,
  Map,
  Compass,
  MessageCircle,
  Sparkles,
  Scroll,
  Crown,
  Skull,
  Wand2,
} from 'lucide-react';

interface SceneVisualProps {
  content: string;
  isUser: boolean;
}

type SceneType = 'battle' | 'exploration' | 'dialogue' | 'magic' | 'boss' | 'treasure' | 'story';

function detectScene(content: string): SceneType {
  const lower = content.toLowerCase();

  // 전투 관련
  if (
    lower.includes('공격') ||
    lower.includes('전투') ||
    lower.includes('싸우') ||
    lower.includes('hp') ||
    lower.includes('데미지') ||
    lower.includes('몬스터')
  ) {
    return 'battle';
  }

  // 보스 관련
  if (
    lower.includes('보스') ||
    lower.includes('shadow lord') ||
    lower.includes('왕') ||
    lower.includes('마왕')
  ) {
    return 'boss';
  }

  // 마법 관련
  if (
    lower.includes('마법') ||
    lower.includes('주문') ||
    lower.includes('mp') ||
    lower.includes('스킬')
  ) {
    return 'magic';
  }

  // 탐험 관련
  if (
    lower.includes('탐험') ||
    lower.includes('이동') ||
    lower.includes('지도') ||
    lower.includes('길') ||
    lower.includes('던전')
  ) {
    return 'exploration';
  }

  // 보물 관련
  if (
    lower.includes('보물') ||
    lower.includes('아이템') ||
    lower.includes('획득') ||
    lower.includes('상자')
  ) {
    return 'treasure';
  }

  // 대화 관련
  if (
    lower.includes('말') ||
    lower.includes('대화') ||
    lower.includes('npc') ||
    lower.includes('물어')
  ) {
    return 'dialogue';
  }

  return 'story';
}

function getSceneIcon(scene: SceneType) {
  const iconProps = { className: 'w-full h-full' };

  switch (scene) {
    case 'battle':
      return <Swords {...iconProps} />;
    case 'boss':
      return <Crown {...iconProps} />;
    case 'magic':
      return <Wand2 {...iconProps} />;
    case 'exploration':
      return <Compass {...iconProps} />;
    case 'treasure':
      return <Sparkles {...iconProps} />;
    case 'dialogue':
      return <MessageCircle {...iconProps} />;
    default:
      return <Scroll {...iconProps} />;
  }
}

function getSceneColor(scene: SceneType): string {
  switch (scene) {
    case 'battle':
      return 'from-red-500 to-orange-500';
    case 'boss':
      return 'from-purple-600 to-pink-600';
    case 'magic':
      return 'from-blue-500 to-cyan-500';
    case 'exploration':
      return 'from-green-500 to-emerald-500';
    case 'treasure':
      return 'from-yellow-500 to-amber-500';
    case 'dialogue':
      return 'from-indigo-500 to-violet-500';
    default:
      return 'from-gray-500 to-slate-500';
  }
}

export function SceneVisual({ content, isUser }: SceneVisualProps) {
  if (isUser) return null; // 사용자 메시지에는 표시하지 않음

  const scene = detectScene(content);
  const icon = getSceneIcon(scene);
  const colorClass = getSceneColor(scene);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        type: 'spring',
        stiffness: 200,
      }}
      className="relative"
    >
      {/* 발광 효과 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-full blur-md`}
      />

      {/* 아이콘 */}
      <div className={`relative w-16 h-16 flex items-center justify-center bg-gradient-to-br ${colorClass} rounded-full text-white shadow-lg`}>
        {icon}
      </div>

      {/* 회전하는 링 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`absolute inset-0 border-2 border-dashed ${colorClass.split(' ')[0].replace('from-', 'border-')} rounded-full opacity-30`}
      />
    </motion.div>
  );
}
