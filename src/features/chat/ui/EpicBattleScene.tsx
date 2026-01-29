'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EpicBattleSceneProps {
  content: string;
  isBoss?: boolean;
}

// 더 디테일한 영웅 캐릭터
function DetailedHero({ phase }: { phase: number }) {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Phase 0: 대기 (0-1초)
      if (phase === 0) {
        await controls.start({
          x: 0,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.5 },
        });
      }
      // Phase 1: 공격 준비 (1-2초)
      else if (phase === 1) {
        await controls.start({
          x: -20,
          scale: 1.1,
          transition: { duration: 0.5 },
        });
      }
      // Phase 2: 공격! (2-3초)
      else if (phase === 2) {
        await controls.start({
          x: 100,
          scale: 1.2,
          transition: { duration: 0.3, type: 'spring', stiffness: 300 },
        });
      }
      // Phase 3: 복귀 (3-4초)
      else if (phase === 3) {
        await controls.start({
          x: 0,
          scale: 1,
          transition: { duration: 0.5 },
        });
      }
    };
    sequence();
  }, [phase, controls]);

  return (
    <motion.div animate={controls} className="relative w-40 h-48">
      {/* 갑옷 빛 */}
      <motion.div
        animate={{
          opacity: phase === 2 ? [0.5, 1, 0.5] : 0.3,
          scale: phase === 2 ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3, repeat: phase === 2 ? Infinity : 0 }}
        className="absolute inset-0 bg-blue-400 blur-xl opacity-30"
      />

      <div className="relative">
        {/* 머리 - 더 디테일하게 */}
        <motion.div
          animate={phase === 2 ? { rotate: [0, -10, 0] } : {}}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-lg"
        >
          {/* 헬멧 */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-6 bg-red-600 rounded-full" />

          {/* 눈 - 강렬한 눈빛 */}
          <motion.div
            animate={{
              opacity: phase === 2 ? [1, 0.5, 1] : 1,
            }}
            transition={{ duration: 0.2, repeat: phase === 2 ? 3 : 0 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3"
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
          </motion.div>

          {/* 입 */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-700 rounded-full" />
        </motion.div>

        {/* 갑옷 - 더 디테일하게 */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-xl shadow-2xl border-2 border-blue-400">
          {/* 갑옷 문양 */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-yellow-400 rounded-full" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
        </div>

        {/* 왼팔 */}
        <motion.div
          animate={
            phase === 1
              ? { rotate: -45 }
              : phase === 2
              ? { rotate: -90 }
              : { rotate: -20 }
          }
          className="absolute top-24 left-2 w-7 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top shadow-lg"
        >
          {/* 어깨 갑옷 */}
          <div className="absolute -top-2 -left-1 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />
        </motion.div>

        {/* 오른팔 + 검 */}
        <motion.div
          animate={
            phase === 1
              ? { rotate: -90 }
              : phase === 2
              ? { rotate: -45 }
              : { rotate: -30 }
          }
          className="absolute top-24 right-2 w-7 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full origin-top shadow-lg"
        >
          {/* 어깨 갑옷 */}
          <div className="absolute -top-2 -right-1 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full" />

          {/* 검 */}
          <motion.div
            animate={
              phase === 2
                ? {
                    filter: [
                      'drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))',
                      'drop-shadow(0 0 20px rgba(239, 68, 68, 1))',
                      'drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))',
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.3, repeat: phase === 2 ? 3 : 0 }}
            className="absolute -right-2 top-8 w-4 h-32 origin-top"
          >
            {/* 검날 */}
            <div className="w-4 h-28 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 clip-path-sword shadow-2xl" />
            {/* 검 빛 */}
            <motion.div
              animate={phase === 2 ? { scaleY: [0, 1, 0], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 0.2, repeat: phase === 2 ? 5 : 0 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-white via-cyan-200 to-transparent opacity-0"
            />
            {/* 손잡이 */}
            <div className="absolute bottom-0 -left-2 w-8 h-6 bg-gradient-to-br from-amber-700 to-amber-900 rounded" />
            {/* 보석 */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </motion.div>
        </motion.div>

        {/* 다리 */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 flex gap-3">
          <motion.div
            animate={phase === 2 ? { scaleY: [1, 0.9, 1] } : {}}
            className="w-8 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl shadow-lg"
          >
            <div className="absolute bottom-0 w-full h-4 bg-gray-800 rounded-b-xl" />
          </motion.div>
          <motion.div
            animate={phase === 2 ? { scaleY: [1, 0.9, 1] } : {}}
            className="w-8 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-b-xl shadow-lg"
          >
            <div className="absolute bottom-0 w-full h-4 bg-gray-800 rounded-b-xl" />
          </motion.div>
        </div>

        {/* 망토 */}
        <motion.div
          animate={
            phase === 2
              ? { scaleX: [1, 1.3, 1], x: [-5, 10, -5] }
              : { scaleX: [1, 1.05, 1] }
          }
          transition={{ duration: phase === 2 ? 0.3 : 2, repeat: Infinity }}
          className="absolute top-22 left-1/2 -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-red-700 to-red-900 rounded-b-2xl -z-10 opacity-80"
        />
      </div>

      {/* 그림자 */}
      <motion.div
        animate={{
          scale: phase === 2 ? [1, 0.8, 1] : [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/50 rounded-full blur-md"
      />
    </motion.div>
  );
}

// 더 디테일한 몬스터
function DetailedMonster({ phase, isBoss }: { phase: number; isBoss: boolean }) {
  const controls = useAnimation();
  const size = isBoss ? 'scale-150' : 'scale-100';

  useEffect(() => {
    const sequence = async () => {
      // Phase 0-1: 대기
      if (phase <= 1) {
        await controls.start({
          x: 0,
          rotate: 0,
          scale: 1,
          transition: { duration: 0.5 },
        });
      }
      // Phase 2: 피격!
      else if (phase === 2) {
        await controls.start({
          x: -50,
          rotate: -15,
          scale: 0.9,
          transition: { duration: 0.2 },
        });
      }
      // Phase 3: 분노
      else if (phase === 3) {
        await controls.start({
          x: 0,
          rotate: [0, 5, -5, 0],
          scale: 1.1,
          transition: { duration: 0.5 },
        });
      }
      // Phase 4: 반격 준비
      else if (phase === 4) {
        await controls.start({
          x: 20,
          scale: 1.2,
          transition: { duration: 0.5 },
        });
      }
    };
    sequence();
  }, [phase, controls]);

  return (
    <motion.div animate={controls} className={`relative w-40 h-48 ${size}`}>
      {/* 사악한 오라 */}
      <motion.div
        animate={{
          opacity: phase === 3 || phase === 4 ? [0.3, 0.7, 0.3] : 0.2,
          scale: phase === 3 || phase === 4 ? [1, 1.5, 1] : 1,
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className={`absolute inset-0 ${
          isBoss ? 'bg-purple-600' : 'bg-green-600'
        } blur-2xl opacity-30`}
      />

      <div className="relative">
        {/* 뿔 (보스용) */}
        {isBoss && (
          <>
            <motion.div
              animate={phase === 3 ? { rotate: [-20, -15, -20] } : {}}
              className="absolute -top-4 left-4 w-5 h-20 bg-gradient-to-t from-red-900 via-red-700 to-orange-600 rotate-[-25deg] rounded-t-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,1)]" />
            </motion.div>
            <motion.div
              animate={phase === 3 ? { rotate: [20, 15, 20] } : {}}
              className="absolute -top-4 right-4 w-5 h-20 bg-gradient-to-t from-red-900 via-red-700 to-orange-600 rotate-[25deg] rounded-t-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,1)]" />
            </motion.div>
          </>
        )}

        {/* 머리 */}
        <motion.div
          animate={phase === 2 ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
          className={`absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-2xl shadow-2xl border-2 ${
            isBoss ? 'border-purple-600' : 'border-green-600'
          }`}
        >
          {/* 눈 - 사악한 눈빛 */}
          <motion.div
            animate={{
              opacity: [1, 0.3, 1],
              scale: phase === 3 ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: phase === 3 ? 0.3 : 1, repeat: Infinity }}
            className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-4"
          >
            <div className={`w-4 h-4 ${
              isBoss ? 'bg-red-600' : 'bg-yellow-500'
            } rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
            </div>
            <div className={`w-4 h-4 ${
              isBoss ? 'bg-red-600' : 'bg-yellow-500'
            } rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
            </div>
          </motion.div>

          {/* 입 - 이빨 */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-6 bg-black/80 rounded-lg">
            <div className="flex justify-around h-full items-end px-1">
              {[...Array(isBoss ? 8 : 6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={phase === 3 ? { scaleY: [1, 1.3, 1] } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="w-1 h-4 bg-white rounded-t-sm"
                />
              ))}
            </div>
          </div>

          {/* 상처 (피격시) */}
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-2 w-6 h-6"
            >
              <div className="w-full h-1 bg-red-600 rounded-full rotate-45" />
              <div className="w-full h-1 bg-red-600 rounded-full -rotate-45" />
            </motion.div>
          )}
        </motion.div>

        {/* 몸통 */}
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-28 h-24 bg-gradient-to-br ${
          isBoss ? 'from-purple-900 to-black' : 'from-green-800 to-green-950'
        } rounded-2xl shadow-2xl`}>
          {/* 가슴 갑옷 (보스용) */}
          {isBoss && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-red-600 rounded-lg">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)]" />
            </div>
          )}
        </div>

        {/* 팔 */}
        <motion.div
          animate={
            phase === 4
              ? { rotate: [20, -30, 20] }
              : phase === 2
              ? { rotate: [10, 30, 10] }
              : { rotate: [10, 20, 10] }
          }
          transition={{ duration: 0.5, repeat: phase !== 2 ? Infinity : 0 }}
          className={`absolute top-28 -left-4 w-8 h-20 bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-full origin-top shadow-xl`}
        >
          {/* 발톱 */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
            <div className="w-1 h-5 bg-gray-200 rounded-full" />
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          animate={
            phase === 4
              ? { rotate: [-20, 30, -20] }
              : phase === 2
              ? { rotate: [-10, -30, -10] }
              : { rotate: [-10, -20, -10] }
          }
          transition={{ duration: 0.5, repeat: phase !== 2 ? Infinity : 0 }}
          className={`absolute top-28 -right-4 w-8 h-20 bg-gradient-to-br ${
            isBoss ? 'from-purple-800 to-purple-950' : 'from-green-700 to-green-900'
          } rounded-full origin-top shadow-xl`}
        >
          {/* 발톱 */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
            <div className="w-1 h-5 bg-gray-200 rounded-full" />
            <div className="w-1 h-4 bg-gray-200 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* 그림자 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-black/50 rounded-full blur-lg"
      />
    </motion.div>
  );
}

export function EpicBattleScene({ content, isBoss = false }: EpicBattleSceneProps) {
  const [phase, setPhase] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // 7초 전투 시퀀스
    const timeline = [
      { time: 0, phase: 0 },    // 대기
      { time: 1000, phase: 1 }, // 영웅 공격 준비
      { time: 2000, phase: 2 }, // 영웅 공격! + 몬스터 피격
      { time: 2000, shake: true }, // 화면 흔들림
      { time: 2200, shake: false },
      { time: 3000, phase: 3 }, // 몬스터 분노
      { time: 4000, phase: 4 }, // 몬스터 반격 준비
      { time: 5000, phase: 0 }, // 리셋
    ];

    timeline.forEach(({ time, phase: p, shake: s }) => {
      setTimeout(() => {
        if (p !== undefined) setPhase(p);
        if (s !== undefined) setShake(s);
      }, time);
    });

    // 7초마다 반복
    const interval = setInterval(() => {
      timeline.forEach(({ time, phase: p, shake: s }) => {
        setTimeout(() => {
          if (p !== undefined) setPhase(p);
          if (s !== undefined) setShake(s);
        }, time);
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={shake ? { x: [-5, 5, -5, 5, 0], y: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.2 }}
      className={`relative w-full h-80 bg-gradient-to-br ${
        isBoss
          ? 'from-purple-950 via-red-950 to-black'
          : 'from-red-950 via-orange-950 to-black'
      } rounded-3xl overflow-hidden border-4 border-red-900/50 shadow-2xl`}
    >
      {/* 배경 번개 */}
      {(phase === 2 || phase === 4) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.2, repeat: 3 }}
          className="absolute inset-0 bg-white"
        />
      )}

      {/* 배경 파티클 */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.8, 0],
              y: [100, -100],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, bottom: 0 }}
          />
        ))}
      </div>

      {/* 전투 장면 */}
      <div className="absolute inset-0 flex items-end justify-around px-12 pb-8">
        <DetailedHero phase={phase} />

        {/* 충돌 이펙트 */}
        {phase === 2 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* 폭발 */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 bg-gradient-radial from-yellow-300 via-orange-500 to-red-600 rounded-full"
            />
            {/* 충격파 링 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-8 border-yellow-400 rounded-full"
              />
            ))}
            {/* 스파크 */}
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              return (
                <motion.div
                  key={`spark-${i}`}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos(angle) * 150,
                    y: Math.sin(angle) * 150,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,1)]"
                />
              );
            })}
          </div>
        )}

        <DetailedMonster phase={phase} isBoss={isBoss} />
      </div>

      {/* 데미지 숫자 */}
      {phase === 2 && (
        <motion.div
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -100, opacity: 0, scale: 2 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 right-1/4 text-6xl font-bold text-red-500 [text-shadow:_0_0_20px_rgb(239_68_68_/_1)]"
        >
          {isBoss ? '999' : '342'}
        </motion.div>
      )}

      {/* 하단 체력바 */}
      <div className="absolute bottom-4 left-0 right-0 px-8 flex justify-between gap-8">
        {/* 영웅 HP */}
        <div className="flex-1">
          <div className="text-xs text-cyan-300 mb-1 font-bold">HERO HP</div>
          <div className="h-4 bg-black/50 rounded-full overflow-hidden border-2 border-cyan-500">
            <motion.div
              initial={{ width: '100%' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </div>
        </div>

        {/* 몬스터 HP */}
        <div className="flex-1">
          <div className="text-xs text-red-300 mb-1 font-bold text-right">
            {isBoss ? 'BOSS HP' : 'MONSTER HP'}
          </div>
          <div className="h-4 bg-black/50 rounded-full overflow-hidden border-2 border-red-500">
            <motion.div
              animate={{
                width: phase >= 2 ? (isBoss ? '70%' : '40%') : '100%',
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* 빛 효과 */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
