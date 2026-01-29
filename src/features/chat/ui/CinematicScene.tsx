'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CinematicSceneProps {
  sceneType: 'walking' | 'battle' | 'boss' | 'victory' | 'rest';
}

type BattlePhase = 'approach' | 'hero_attack' | 'enemy_hit' | 'enemy_counter' | 'hero_dodge' | 'loop';

// 주인공 캐릭터
function Hero({ phase, position }: { phase: BattlePhase; position: number }) {
  const controls = useAnimation();

  useEffect(() => {
    const sequences: Record<BattlePhase, any> = {
      approach: {
        x: position,
        rotate: 0,
        transition: { duration: 0.5 },
      },
      hero_attack: {
        x: [position, position + 80, position + 60],
        rotate: [0, -15, 0],
        transition: { duration: 0.6 },
      },
      enemy_hit: {
        x: position + 60,
        rotate: 0,
        transition: { duration: 0.3 },
      },
      enemy_counter: {
        x: position + 60,
        rotate: 0,
        transition: { duration: 0.3 },
      },
      hero_dodge: {
        x: [position + 60, position + 40, position + 50],
        rotate: [0, 10, 0],
        transition: { duration: 0.5 },
      },
      loop: {
        x: position + 50,
        rotate: 0,
        transition: { duration: 0.3 },
      },
    };

    controls.start(sequences[phase] || sequences.approach);
  }, [phase, position, controls]);

  return (
    <motion.div animate={controls} className="absolute bottom-24">
      <div className="relative w-32 h-44">
        {/* 갑옷 빛 */}
        <motion.div
          animate={
            phase === 'hero_attack'
              ? { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }
              : { opacity: 0.3 }
          }
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30"
        />

        {/* 머리 */}
        <motion.div
          animate={
            phase === 'hero_attack'
              ? { rotate: [-5, 5, 0] }
              : phase === 'hero_dodge'
              ? { rotate: [0, -10, 0] }
              : { rotate: 0 }
          }
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-lg"
        >
          {/* 투구 */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl border-2 border-gray-500">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-6 bg-red-600 rounded-full" />
          </div>

          {/* 눈 */}
          <motion.div
            animate={
              phase === 'hero_attack'
                ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3"
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
          </motion.div>
        </motion.div>

        {/* 몸통 */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-xl shadow-2xl border-2 border-blue-400">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-yellow-400 rounded-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
          </div>
        </div>

        {/* 왼팔 */}
        <motion.div
          animate={
            phase === 'hero_attack'
              ? { rotate: [-20, -60, -30] }
              : phase === 'hero_dodge'
              ? { rotate: [-20, -40, -20] }
              : { rotate: [-20, -25, -20] }
          }
          transition={
            phase === 'hero_attack' || phase === 'hero_dodge'
              ? { duration: 0.5 }
              : { duration: 1, repeat: Infinity }
          }
          className="absolute top-20 left-1 w-7 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top shadow-lg"
        >
          <div className="absolute -top-2 -left-1 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />
        </motion.div>

        {/* 오른팔 + 검 */}
        <motion.div
          animate={
            phase === 'hero_attack'
              ? { rotate: [-30, -120, -60] }
              : { rotate: [-30, -35, -30] }
          }
          transition={
            phase === 'hero_attack'
              ? { duration: 0.5 }
              : { duration: 1, repeat: Infinity }
          }
          className="absolute top-20 right-1 w-7 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top shadow-lg"
        >
          <div className="absolute -top-2 -right-1 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />

          {/* 검 */}
          <motion.div
            animate={
              phase === 'hero_attack'
                ? {
                    filter: [
                      'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))',
                      'drop-shadow(0 0 30px rgba(59, 130, 246, 1))',
                      'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.3, repeat: phase === 'hero_attack' ? 2 : 0 }}
            className="absolute -right-2 top-8 w-4 h-32 origin-top"
          >
            <div className="w-4 h-28 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 shadow-2xl" />
            <motion.div
              animate={phase === 'hero_attack' ? { scaleY: [0, 1.5, 0], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 0.2, repeat: phase === 'hero_attack' ? 3 : 0 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-white via-cyan-300 to-transparent opacity-0"
            />
            <div className="absolute bottom-0 -left-2 w-8 h-6 bg-gradient-to-br from-amber-700 to-amber-900 rounded">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* 다리 */}
        <div className="absolute top-36 left-1/2 -translate-x-1/2 flex gap-3">
          <motion.div
            animate={
              phase === 'approach' || phase === 'loop'
                ? { scaleY: [1, 0.9, 1], y: [0, 2, 0] }
                : {}
            }
            transition={{ duration: 0.4, repeat: Infinity }}
            className="w-8 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl shadow-lg"
          />
          <motion.div
            animate={
              phase === 'approach' || phase === 'loop'
                ? { scaleY: [0.9, 1, 0.9], y: [2, 0, 2] }
                : {}
            }
            transition={{ duration: 0.4, repeat: Infinity }}
            className="w-8 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl shadow-lg"
          />
        </div>

        {/* 망토 */}
        <motion.div
          animate={{ scaleX: [1, 1.1, 1], x: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute top-18 left-1/2 -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-red-700 to-red-900 rounded-b-2xl -z-10 opacity-90"
        />

        {/* 그림자 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black/50 rounded-full blur-lg" />
      </div>
    </motion.div>
  );
}

// 적 캐릭터
function Enemy({ phase, isBoss, defeated }: { phase: BattlePhase; isBoss: boolean; defeated: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    const sequences: Record<BattlePhase, any> = {
      approach: {
        x: 0,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.5 },
      },
      hero_attack: {
        x: 0,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.3 },
      },
      enemy_hit: {
        x: [-20, -40, -25],
        rotate: [0, -20, -10],
        scale: [1, 0.85, 0.9],
        transition: { duration: 0.5 },
      },
      enemy_counter: {
        x: [-25, -10, -20],
        rotate: [-10, 5, 0],
        scale: [0.9, 1.1, 1],
        transition: { duration: 0.6 },
      },
      hero_dodge: {
        x: -20,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.3 },
      },
      loop: {
        x: -20,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.3 },
      },
    };

    controls.start(sequences[phase] || sequences.approach);
  }, [phase, controls]);

  if (defeated) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0, rotate: -90, y: 50 }}
        transition={{ duration: 1 }}
        className="absolute bottom-24 right-32"
      >
        <div className="text-8xl">💀</div>
      </motion.div>
    );
  }

  return (
    <motion.div animate={controls} className="absolute bottom-24 right-32">
      <div className={`relative ${isBoss ? 'w-48 h-56' : 'w-36 h-48'}`}>
        {/* 사악한 오라 */}
        <motion.div
          animate={
            phase === 'enemy_counter'
              ? { opacity: [0.3, 0.8, 0.3], scale: [1, 1.8, 1] }
              : { opacity: 0.2 }
          }
          transition={{ duration: 0.5, repeat: Infinity }}
          className={`absolute inset-0 ${isBoss ? 'bg-purple-600' : 'bg-red-600'} blur-2xl opacity-30`}
        />

        {/* 뿔 (보스) */}
        {isBoss && (
          <>
            <motion.div
              animate={
                phase === 'enemy_counter'
                  ? { rotate: [-25, -30, -25] }
                  : { rotate: -25 }
              }
              className="absolute -top-8 left-6 w-5 h-20 bg-gradient-to-t from-red-900 via-red-700 to-orange-600 rounded-t-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,1)]" />
            </motion.div>
            <motion.div
              animate={
                phase === 'enemy_counter'
                  ? { rotate: [25, 30, 25] }
                  : { rotate: 25 }
              }
              className="absolute -top-8 right-6 w-5 h-20 bg-gradient-to-t from-red-900 via-red-700 to-orange-600 rounded-t-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,1)]" />
            </motion.div>
          </>
        )}

        {/* 머리 */}
        <motion.div
          animate={
            phase === 'enemy_hit'
              ? { x: [-5, 5, -5, 0], rotate: [0, -10, 5, 0] }
              : phase === 'enemy_counter'
              ? { rotate: [0, -5, 0] }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 ${
            isBoss ? 'w-24 h-24' : 'w-20 h-20'
          } bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-2xl shadow-2xl border-2 ${isBoss ? 'border-purple-600' : 'border-green-600'}`}
        >
          {/* 눈 */}
          <motion.div
            animate={
              phase === 'enemy_hit'
                ? { scaleY: [1, 0.2, 1, 0.2, 1] }
                : phase === 'enemy_counter'
                ? { scale: [1, 1.4, 1], opacity: [1, 0.8, 1] }
                : { opacity: [1, 0.4, 1] }
            }
            transition={
              phase === 'enemy_hit'
                ? { duration: 0.4 }
                : { duration: phase === 'enemy_counter' ? 0.3 : 1.5, repeat: Infinity }
            }
            className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-4"
          >
            <div className={`${isBoss ? 'w-5 h-5' : 'w-4 h-4'} bg-red-600 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
            </div>
            <div className={`${isBoss ? 'w-5 h-5' : 'w-4 h-4'} bg-red-600 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
            </div>
          </motion.div>

          {/* 입 */}
          <motion.div
            animate={
              phase === 'enemy_hit'
                ? { scaleY: [1, 1.5, 1] }
                : phase === 'enemy_counter'
                ? { scaleY: [1, 1.3, 1] }
                : {}
            }
            className={`absolute ${isBoss ? 'top-14' : 'top-12'} left-1/2 -translate-x-1/2 ${
              isBoss ? 'w-18 h-8' : 'w-16 h-6'
            } bg-black/80 rounded-lg`}
          >
            <div className="flex justify-around h-full items-end px-1">
              {[...Array(isBoss ? 8 : 6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={phase === 'enemy_counter' ? { scaleY: [1, 1.3, 1] } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="w-1 h-4 bg-white rounded-t-sm"
                />
              ))}
            </div>
          </motion.div>

          {/* 상처 (피격 시) */}
          <AnimatePresence>
            {phase === 'enemy_hit' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 right-3"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0.8], x: [0, i * 3], y: [0, i * 3] }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute w-2 h-2 bg-red-600 rounded-full"
                  />
                ))}
                <div className="w-8 h-1 bg-red-600 rounded-full rotate-45" />
                <div className="w-8 h-1 bg-red-600 rounded-full -rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 몸통 */}
        <div className={`absolute ${isBoss ? 'top-28' : 'top-24'} left-1/2 -translate-x-1/2 ${
          isBoss ? 'w-32 h-28' : 'w-28 h-24'
        } bg-gradient-to-br ${
          isBoss ? 'from-purple-900 to-black' : 'from-green-800 to-green-950'
        } rounded-2xl shadow-2xl`}>
          {isBoss && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-red-600 rounded-lg">
              <motion.div
                animate={
                  phase === 'enemy_counter'
                    ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }
                    : {}
                }
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)]"
              />
            </div>
          )}
        </div>

        {/* 팔 */}
        <motion.div
          animate={
            phase === 'enemy_counter'
              ? { rotate: [20, -40, 10] }
              : { rotate: [20, 25, 20] }
          }
          transition={
            phase === 'enemy_counter'
              ? { duration: 0.6 }
              : { duration: 1, repeat: Infinity }
          }
          className={`absolute ${isBoss ? 'top-32' : 'top-28'} -left-4 ${
            isBoss ? 'w-10 h-24' : 'w-8 h-20'
          } bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-full origin-top shadow-xl`}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
            <div className="w-1 h-5 bg-gray-200 rounded-full" />
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          animate={
            phase === 'enemy_counter'
              ? { rotate: [-20, 40, -10] }
              : { rotate: [-20, -25, -20] }
          }
          transition={
            phase === 'enemy_counter'
              ? { duration: 0.6 }
              : { duration: 1, repeat: Infinity }
          }
          className={`absolute ${isBoss ? 'top-32' : 'top-28'} -right-4 ${
            isBoss ? 'w-10 h-24' : 'w-8 h-20'
          } bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-full origin-top shadow-xl`}
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
            <div className="w-1 h-5 bg-gray-200 rounded-full" />
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
          </div>
        </motion.div>

        {/* 그림자 */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/50 rounded-full blur-lg" />
      </div>
    </motion.div>
  );
}

// 이펙트
function BattleEffects({ phase }: { phase: BattlePhase }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 영웅 공격 이펙트 */}
      {phase === 'hero_attack' && (
        <>
          {/* 검기 */}
          <motion.div
            initial={{ x: 200, opacity: 0, scaleX: 0 }}
            animate={{ x: [200, 600, 700], opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/3 left-0 w-96 h-3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
          />
          {/* 충격파 */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="absolute top-1/3 right-1/3 w-24 h-24 border-4 border-cyan-400 rounded-full"
            />
          ))}
        </>
      )}

      {/* 적 피격 이펙트 */}
      {phase === 'enemy_hit' && (
        <>
          {/* 폭발 */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-radial from-orange-400 via-red-500 to-transparent rounded-full"
          />
          {/* 데미지 숫자 */}
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: -100, opacity: 0, scale: 2 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 right-1/4 text-7xl font-bold text-red-500 [text-shadow:_0_0_30px_rgb(239_68_68_/_1),_0_0_10px_rgb(0_0_0_/_1)]"
          >
            CRITICAL!
          </motion.div>
        </>
      )}

      {/* 적 반격 이펙트 */}
      {phase === 'enemy_counter' && (
        <>
          {/* 어둠의 파동 */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="absolute top-1/3 right-1/3 w-32 h-32 border-4 border-purple-600 rounded-full"
            />
          ))}
        </>
      )}
    </div>
  );
}

export function CinematicScene({ sceneType }: CinematicSceneProps) {
  const [phase, setPhase] = useState<BattlePhase>('approach');
  const [heroPosition, setHeroPosition] = useState(-100);
  const [defeated, setDefeated] = useState(false);
  const [isWalking, setIsWalking] = useState(true);

  // 전투 시퀀스
  useEffect(() => {
    if (sceneType === 'battle' || sceneType === 'boss') {
      setIsWalking(false);
      const battleSequence = [
        { time: 0, phase: 'approach' as BattlePhase },
        { time: 1000, phase: 'hero_attack' as BattlePhase },
        { time: 1800, phase: 'enemy_hit' as BattlePhase },
        { time: 2500, phase: 'enemy_counter' as BattlePhase },
        { time: 3200, phase: 'hero_dodge' as BattlePhase },
        { time: 3800, phase: 'loop' as BattlePhase },
      ];

      battleSequence.forEach(({ time, phase: p }) => {
        setTimeout(() => setPhase(p), time);
      });

      const interval = setInterval(() => {
        battleSequence.forEach(({ time, phase: p }) => {
          setTimeout(() => setPhase(p), time);
        });
      }, 4500);

      return () => clearInterval(interval);
    } else if (sceneType === 'victory') {
      setDefeated(true);
      setIsWalking(true);
    } else {
      setIsWalking(true);
      setDefeated(false);
    }
  }, [sceneType]);

  // 걷기 애니메이션
  useEffect(() => {
    if (isWalking && !defeated) {
      const walkInterval = setInterval(() => {
        setHeroPosition((prev) => {
          if (prev >= window.innerWidth + 100) {
            return -100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(walkInterval);
    }
  }, [isWalking, defeated]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-orange-900" />

      {/* 별 */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 50}%` }}
        />
      ))}

      {/* 달 */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full shadow-[0_0_60px_rgba(251,191,36,0.6)]" />

      {/* 스크롤 배경 */}
      <motion.div
        animate={{ x: [0, -100] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 right-0 h-48"
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-3 bg-gray-700 rounded-sm"
            style={{
              left: `${i * 8}%`,
              bottom: `${15 + (i % 4) * 5}px`,
            }}
          />
        ))}
        {[...Array(25)].map((_, i) => (
          <div
            key={`grass-${i}`}
            className="absolute w-1 h-8 bg-green-800 rounded-t-full"
            style={{
              left: `${4 + i * 7}%`,
              bottom: `${18 + (i % 3) * 4}px`,
            }}
          />
        ))}
      </motion.div>

      {/* 바닥 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />

      {/* 캐릭터들 */}
      {isWalking && !defeated && sceneType !== 'battle' && sceneType !== 'boss' && (
        <Hero phase="approach" position={heroPosition} />
      )}

      {(sceneType === 'battle' || sceneType === 'boss') && (
        <>
          <Hero phase={phase} position={150} />
          <Enemy phase={phase} isBoss={sceneType === 'boss'} defeated={defeated} />
          <BattleEffects phase={phase} />
        </>
      )}

      {/* 빛 효과 */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </div>
  );
}
