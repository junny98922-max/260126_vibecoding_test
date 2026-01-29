'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ContinuousBackgroundProps {
  currentScene: 'battle' | 'boss' | 'exploration' | 'village' | 'rest';
}

// 주인공 캐릭터 (항상 표시)
function HeroCharacter({ isMoving, inBattle }: { isMoving: boolean; inBattle: boolean }) {
  return (
    <motion.div
      animate={
        inBattle
          ? {
              x: [0, -20, 20, -10, 10, 0],
              y: [0, -5, -3, -7, 0],
            }
          : isMoving
          ? {
              y: [0, -3, 0],
            }
          : {}
      }
      transition={
        inBattle
          ? { duration: 0.8, repeat: Infinity }
          : isMoving
          ? { duration: 0.5, repeat: Infinity }
          : {}
      }
      className="absolute bottom-32 left-1/4 -translate-x-1/2"
    >
      <div className="relative w-32 h-40">
        {/* 머리 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
          {/* 투구 */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl" />
          {/* 눈 */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]" />
          </div>
        </div>

        {/* 갑옷 */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl border-2 border-blue-400">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 border-3 border-yellow-400 rounded-full" />
        </div>

        {/* 팔 */}
        <motion.div
          animate={isMoving ? { rotate: [-20, 20, -20] } : { rotate: -20 }}
          transition={isMoving ? { duration: 0.5, repeat: Infinity } : {}}
          className="absolute top-16 left-1 w-6 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top"
        />
        <div className="absolute top-16 right-1 w-6 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top">
          {/* 검 */}
          <div className="absolute -right-1 top-6 w-3 h-24 bg-gradient-to-b from-gray-200 to-gray-400 shadow-lg" />
        </div>

        {/* 다리 */}
        <div className="absolute top-30 left-1/2 -translate-x-1/2 flex gap-2">
          <motion.div
            animate={isMoving ? { scaleY: [1, 0.9, 1], y: [0, 2, 0] } : {}}
            transition={isMoving ? { duration: 0.5, repeat: Infinity } : {}}
            className="w-7 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl"
          />
          <motion.div
            animate={isMoving ? { scaleY: [0.9, 1, 0.9], y: [2, 0, 2] } : {}}
            transition={isMoving ? { duration: 0.5, repeat: Infinity } : {}}
            className="w-7 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl"
          />
        </div>

        {/* 망토 */}
        <motion.div
          animate={
            isMoving
              ? { scaleX: [1, 1.1, 1], x: [0, -3, 0] }
              : { scaleX: [1, 1.05, 1] }
          }
          transition={{ duration: isMoving ? 0.5 : 2, repeat: Infinity }}
          className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-red-700 to-red-900 rounded-b-2xl -z-10"
        />

        {/* 그림자 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/40 rounded-full blur-md" />
      </div>
    </motion.div>
  );
}

// 배경 요소들
function BackgroundElements({ scene }: { scene: string }) {
  return (
    <>
      {/* 하늘 */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-orange-900" />

      {/* 구름 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 w-32 h-16 bg-white/10 rounded-full blur-xl"
          style={{ left: `${i * 25}%`, top: `${10 + i * 10}%` }}
        />
      ))}

      {/* 별들 */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%` }}
        />
      ))}

      {/* 바닥 - 스크롤되는 길 */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 to-transparent">
        <motion.div
          animate={{ x: [-100, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 right-0 h-32"
        >
          {/* 돌 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-2 bg-gray-700 rounded-full"
              style={{
                left: `${i * 10}%`,
                bottom: `${10 + (i % 3) * 5}px`,
              }}
            />
          ))}

          {/* 풀 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`grass-${i}`}
              className="absolute w-1 h-6 bg-green-700 rounded-t-full"
              style={{
                left: `${5 + i * 8}%`,
                bottom: `${15 + (i % 4) * 3}px`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}

// 몬스터 (전투 시)
function BattleMonster({ isBoss }: { isBoss: boolean }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, rotate: [0, 3, -3, 0] }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ rotate: { duration: 1, repeat: Infinity } }}
      className="absolute bottom-32 right-1/4 -translate-x-1/2"
    >
      <div className={`relative ${isBoss ? 'w-48 h-56' : 'w-32 h-40'}`}>
        {/* 몬스터 머리 */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 ${
            isBoss ? 'w-24 h-24' : 'w-16 h-16'
          } bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-2xl`}
        >
          {/* 뿔 (보스) */}
          {isBoss && (
            <>
              <div className="absolute -top-8 left-2 w-4 h-16 bg-gradient-to-t from-red-900 to-orange-600 rotate-[-20deg] rounded-t-full" />
              <div className="absolute -top-8 right-2 w-4 h-16 bg-gradient-to-t from-red-900 to-orange-600 rotate-[20deg] rounded-t-full" />
            </>
          )}

          {/* 눈 */}
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]" />
          </motion.div>
        </div>

        {/* 그림자 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black/40 rounded-full blur-md" />
      </div>
    </motion.div>
  );
}

export function ContinuousBackground({ currentScene }: ContinuousBackgroundProps) {
  const [isMoving, setIsMoving] = useState(true);
  const inBattle = currentScene === 'battle' || currentScene === 'boss';

  useEffect(() => {
    if (inBattle) {
      setIsMoving(false);
    } else {
      setIsMoving(true);
    }
  }, [inBattle]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BackgroundElements scene={currentScene} />
      <HeroCharacter isMoving={isMoving} inBattle={inBattle} />

      <AnimatePresence>
        {inBattle && <BattleMonster isBoss={currentScene === 'boss'} />}
      </AnimatePresence>

      {/* 전투 이펙트 */}
      {inBattle && (
        <div className="absolute inset-0 pointer-events-none">
          {/* 충격파 */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 3], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-orange-500 rounded-full"
            />
          ))}

          {/* 스파크 */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              animate={{
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{ duration: 1, delay: Math.random(), repeat: Infinity }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
            />
          ))}
        </div>
      )}

      {/* 빛 효과 */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </div>
  );
}
