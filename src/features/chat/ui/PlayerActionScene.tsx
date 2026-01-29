'use client';

import { motion } from 'framer-motion';

interface PlayerActionSceneProps {
  content: string;
}

type ActionType = 'attack' | 'defend' | 'heal' | 'special' | 'observe' | 'talk' | 'move' | 'other';

function detectAction(content: string): ActionType {
  const lower = content.toLowerCase();

  if (lower.includes('공격') || lower.includes('때리') || lower.includes('베') || lower.includes('쏘')) {
    return 'attack';
  }
  if (lower.includes('막') || lower.includes('방어') || lower.includes('피하')) {
    return 'defend';
  }
  if (lower.includes('치료') || lower.includes('회복') || lower.includes('포션')) {
    return 'heal';
  }
  if (lower.includes('스킬') || lower.includes('마법') || lower.includes('특수')) {
    return 'special';
  }
  if (lower.includes('살펴') || lower.includes('조사') || lower.includes('확인')) {
    return 'observe';
  }
  if (lower.includes('말') || lower.includes('대화') || lower.includes('물어')) {
    return 'talk';
  }
  if (lower.includes('이동') || lower.includes('가') || lower.includes('달리')) {
    return 'move';
  }
  return 'other';
}

// 공격 애니메이션
function AttackAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 검기 */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
        className="absolute w-40 h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent blur-sm"
      />
      <motion.div
        animate={{
          rotate: [-45, 45, -45],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="text-9xl"
      >
        ⚔️
      </motion.div>
      {/* 충격파 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 3],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute w-20 h-20 border-4 border-red-500 rounded-full"
        />
      ))}
    </div>
  );
}

// 방어 애니메이션
function DefendAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-9xl"
      >
        🛡️
      </motion.div>
      {/* 보호막 */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute w-48 h-48 border-8 border-blue-400 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        className="absolute w-56 h-56 border-8 border-blue-500 rounded-full"
      />
    </div>
  );
}

// 치료 애니메이션
function HealAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-9xl"
      >
        💚
      </motion.div>
      {/* 치유 입자 */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: [-50, -150],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
          className="absolute w-3 h-3 bg-green-400 rounded-full blur-sm"
          style={{ left: `${30 + Math.random() * 40}%` }}
        />
      ))}
    </div>
  );
}

// 특수기 애니메이션
function SpecialAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-9xl"
      >
        ✨
      </motion.div>
      {/* 마법진 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute w-40 h-40"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full"
            style={{
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
              top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              delay: i * 0.125,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// 관찰 애니메이션
function ObserveAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-9xl"
      >
        👁️
      </motion.div>
      {/* 스캔 라인 */}
      <motion.div
        animate={{ y: [-100, 100] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute w-full h-1 bg-yellow-400 blur-sm opacity-60"
      />
    </div>
  );
}

// 이동 애니메이션
function MoveAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          x: [-50, 50, -50],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-9xl"
      >
        🏃
      </motion.div>
      {/* 속도선 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [100, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            repeat: Infinity,
          }}
          className="absolute w-32 h-1 bg-cyan-400 blur-sm"
          style={{ top: `${40 + i * 5}%` }}
        />
      ))}
    </div>
  );
}

// 대화 애니메이션
function TalkAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-9xl"
      >
        💬
      </motion.div>
      {/* 말풍선 */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1.2],
            opacity: [0, 1, 0],
            y: [0, -30 - i * 15],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute w-4 h-4 bg-white rounded-full"
          style={{ left: '60%', bottom: '60%' }}
        />
      ))}
    </div>
  );
}

export function PlayerActionScene({ content }: PlayerActionSceneProps) {
  const action = detectAction(content);

  const bgGradient = {
    attack: 'from-red-900 via-orange-900 to-red-900',
    defend: 'from-blue-900 via-indigo-900 to-blue-900',
    heal: 'from-green-900 via-emerald-900 to-green-900',
    special: 'from-purple-900 via-pink-900 to-purple-900',
    observe: 'from-yellow-900 via-amber-900 to-yellow-900',
    talk: 'from-cyan-900 via-blue-900 to-cyan-900',
    move: 'from-teal-900 via-cyan-900 to-teal-900',
    other: 'from-gray-900 via-slate-900 to-gray-900',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`relative w-full h-64 bg-gradient-to-br ${bgGradient[action]} rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl`}
    >
      {/* 배경 파티클 */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 액션별 애니메이션 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {action === 'attack' && <AttackAnimation />}
        {action === 'defend' && <DefendAnimation />}
        {action === 'heal' && <HealAnimation />}
        {action === 'special' && <SpecialAnimation />}
        {action === 'observe' && <ObserveAnimation />}
        {action === 'talk' && <TalkAnimation />}
        {action === 'move' && <MoveAnimation />}
        {action === 'other' && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-9xl"
          >
            ⚡
          </motion.div>
        )}
      </div>

      {/* 빛 효과 */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
      />
    </motion.div>
  );
}
