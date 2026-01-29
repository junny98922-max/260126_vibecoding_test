'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EpicBattleScene } from './EpicBattleScene';

interface AnimatedSceneProps {
  content: string;
}

type SceneType = 'battle' | 'boss' | 'exploration' | 'treasure' | 'dialogue' | 'victory' | 'story';

function detectScene(content: string): SceneType {
  const lower = content.toLowerCase();

  if (lower.includes('승리') || lower.includes('물리쳤') || lower.includes('쓰러졌다')) {
    return 'victory';
  }
  if (lower.includes('보스') || lower.includes('shadow lord') || lower.includes('마왕')) {
    return 'boss';
  }
  if (lower.includes('공격') || lower.includes('전투') || lower.includes('싸우') || lower.includes('몬스터')) {
    return 'battle';
  }
  if (lower.includes('탐험') || lower.includes('던전') || lower.includes('동굴')) {
    return 'exploration';
  }
  if (lower.includes('보물') || lower.includes('상자') || lower.includes('아이템')) {
    return 'treasure';
  }
  if (lower.includes('말') || lower.includes('대화') || lower.includes('npc')) {
    return 'dialogue';
  }

  return 'story';
}

// 캐릭터 컴포넌트 (픽셀아트 스타일)
function Hero() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="relative"
    >
      {/* 영웅 캐릭터 */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-24 h-32"
      >
        {/* 머리 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg" />
        {/* 눈 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </div>
        {/* 갑옷 */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg" />
        {/* 팔 */}
        <motion.div
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-14 left-0 w-5 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full origin-top"
        />
        <div className="absolute top-14 right-0 w-5 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full" />
        {/* 검 */}
        <motion.div
          animate={{
            rotate: [-10, 30, -10],
            x: [0, 10, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-12 -right-2 w-2 h-16 bg-gradient-to-b from-gray-300 to-gray-500 origin-top"
        />
        {/* 다리 */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-5 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-b-lg" />
          <div className="w-5 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-b-lg" />
        </div>
      </motion.div>

      {/* 그림자 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/30 rounded-full blur-sm"
      />
    </motion.div>
  );
}

// 몬스터 컴포넌트
function Monster({ isBoss = false }: { isBoss?: boolean }) {
  const size = isBoss ? 'w-32 h-40' : 'w-20 h-28';
  const color = isBoss ? 'from-purple-900 to-red-900' : 'from-green-700 to-green-900';

  return (
    <motion.div
      initial={{ x: 100, opacity: 0, scale: 0 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', delay: 0.3 }}
      className="relative"
    >
      {/* 몬스터 */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${size}`}
      >
        {/* 몸통 */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 ${isBoss ? 'w-28 h-24' : 'w-16 h-16'} bg-gradient-to-br ${color} rounded-2xl`} />
        {/* 눈 */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3"
        >
          <div className={`${isBoss ? 'w-4 h-4' : 'w-3 h-3'} bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]`} />
          <div className={`${isBoss ? 'w-4 h-4' : 'w-3 h-3'} bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]`} />
        </motion.div>
        {/* 입 */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(isBoss ? 6 : 4)].map((_, i) => (
            <div key={i} className="w-1 h-3 bg-white/90" />
          ))}
        </div>
        {/* 뿔 (보스만) */}
        {isBoss && (
          <>
            <div className="absolute -top-2 left-2 w-3 h-12 bg-gradient-to-t from-red-900 to-red-700 rotate-[-20deg] rounded-t-full" />
            <div className="absolute -top-2 right-2 w-3 h-12 bg-gradient-to-t from-red-900 to-red-700 rotate-[20deg] rounded-t-full" />
          </>
        )}
        {/* 팔 */}
        <motion.div
          animate={{ rotate: [10, -20, 10] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className={`absolute top-12 -left-2 ${isBoss ? 'w-6 h-12' : 'w-4 h-8'} bg-gradient-to-br ${color} rounded-full origin-top`}
        />
        <motion.div
          animate={{ rotate: [-10, 20, -10] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className={`absolute top-12 -right-2 ${isBoss ? 'w-6 h-12' : 'w-4 h-8'} bg-gradient-to-br ${color} rounded-full origin-top`}
        />
      </motion.div>

      {/* 그림자 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${isBoss ? 'w-28 h-6' : 'w-16 h-4'} bg-black/30 rounded-full blur-sm`}
      />
    </motion.div>
  );
}

// 전투 이펙트
function BattleEffect() {
  return (
    <>
      {/* 충격파 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2, 3],
            opacity: [0.8, 0.5, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-yellow-500 rounded-full"
        />
      ))}
      {/* 스파크 */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
        />
      ))}
    </>
  );
}

// 보물상자
function TreasureChest() {
  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-24 h-24"
      >
        {/* 상자 */}
        <div className="absolute bottom-0 w-24 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg border-4 border-yellow-600" />
        {/* 뚜껑 */}
        <motion.div
          animate={{
            rotateX: [0, -60, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-0 w-24 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-t-lg border-4 border-yellow-600"
        />
        {/* 빛나는 효과 */}
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-yellow-300 blur-sm"
        />
      </motion.div>
    </motion.div>
  );
}

// NPC 캐릭터
function NPC() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="relative"
    >
      <motion.div
        animate={{
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-20 h-28"
      >
        {/* 머리 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full" />
        {/* 모자 */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-t-full" />
        {/* 눈 */}
        <motion.div
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2"
        >
          <div className="w-2 h-2 bg-gray-700 rounded-full" />
          <div className="w-2 h-2 bg-gray-700 rounded-full" />
        </motion.div>
        {/* 웃는 입 */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-700 rounded-full" />
        {/* 옷 */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-14 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg" />
        {/* 팔 */}
        <motion.div
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-12 -left-1 w-4 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full origin-top"
        />
        <motion.div
          animate={{ rotate: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-12 -right-1 w-4 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full origin-top"
        />
      </motion.div>
    </motion.div>
  );
}

export function AnimatedScene({ content }: AnimatedSceneProps) {
  const scene = detectScene(content);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    if (scene === 'victory') {
      setShowVictory(true);
    }
  }, [scene]);

  // 전투/보스 장면은 EpicBattleScene 사용
  if (scene === 'battle' || scene === 'boss') {
    return <EpicBattleScene content={content} isBoss={scene === 'boss'} />;
  }

  // 배경색 결정
  const bgGradient = {
    battle: 'from-red-950 via-orange-950 to-red-950',
    boss: 'from-purple-950 via-red-950 to-black',
    exploration: 'from-blue-950 via-indigo-950 to-purple-950',
    treasure: 'from-yellow-950 via-amber-950 to-orange-950',
    dialogue: 'from-indigo-950 via-purple-950 to-pink-950',
    victory: 'from-yellow-900 via-orange-900 to-yellow-900',
    story: 'from-gray-950 via-slate-950 to-gray-950',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full h-64 bg-gradient-to-br ${bgGradient[scene]} rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl`}
    >
      {/* 배경 파티클 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -200],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
            className="absolute bottom-0 w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* 장면별 콘텐츠 */}
      <div className="absolute inset-0 flex items-center justify-around px-8">

        {scene === 'exploration' && (
          <>
            <Hero />
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🏰
            </motion.div>
          </>
        )}

        {scene === 'treasure' && (
          <>
            <Hero />
            <TreasureChest />
          </>
        )}

        {scene === 'dialogue' && (
          <>
            <Hero />
            <NPC />
          </>
        )}

        {scene === 'victory' && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl"
            >
              👑
            </motion.div>
          </>
        )}

        {scene === 'story' && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl opacity-70"
          >
            📖
          </motion.div>
        )}
      </div>

      {/* 빛 효과 */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
      />
    </motion.div>
  );
}
