'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBattle } from '../model/useBattle';
import { Swords, Shield, Heart } from 'lucide-react';

export function BattleInterface() {
  const {
    isInBattle,
    playerHP,
    playerMaxHP,
    enemyHP,
    enemyMaxHP,
    enemyName,
    isBoss,
    battleLog,
    isPlayerTurn,
    playerAction,
  } = useBattle();

  if (!isInBattle) return null;

  const handleAction = (action: 'attack' | 'defend' | 'heal') => {
    if (!isPlayerTurn) return;
    playerAction(action);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center pb-4 px-4"
    >
      {/* 전투 UI 패널 */}
      <div className="w-full max-w-4xl space-y-4">
        {/* HP 바 */}
        <div className="flex justify-between gap-8">
          {/* 플레이어 HP */}
          <div className="flex-1 bg-black/60 backdrop-blur-md rounded-2xl p-4 border-2 border-cyan-500/50">
            <div className="text-sm text-cyan-300 mb-2 font-bold">플레이어</div>
            <div className="relative h-6 bg-black/50 rounded-full overflow-hidden border-2 border-cyan-500">
              <motion.div
                animate={{ width: `${(playerHP / playerMaxHP) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {playerHP} / {playerMaxHP}
              </div>
            </div>
          </div>

          {/* 적 HP */}
          <div className="flex-1 bg-black/60 backdrop-blur-md rounded-2xl p-4 border-2 border-red-500/50">
            <div className="text-sm text-red-300 mb-2 font-bold text-right">
              {enemyName} {isBoss && '👑'}
            </div>
            <div className="relative h-6 bg-black/50 rounded-full overflow-hidden border-2 border-red-500">
              <motion.div
                animate={{ width: `${(enemyHP / enemyMaxHP) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {enemyHP} / {enemyMaxHP}
              </div>
            </div>
          </div>
        </div>

        {/* 전투 로그 */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border-2 border-white/20 max-h-32 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {battleLog.slice(-3).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-gray-200 py-1"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            onClick={() => handleAction('attack')}
            disabled={!isPlayerTurn}
            whileHover={isPlayerTurn ? { scale: 1.05, y: -4 } : {}}
            whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
            className={`relative px-6 py-6 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl border-2 border-red-500 ${
              !isPlayerTurn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-red-400'
            } backdrop-blur-sm shadow-2xl`}
          >
            <div className="flex flex-col items-center gap-2">
              <Swords className="w-8 h-8 text-white" />
              <span className="text-lg font-bold text-white">공격</span>
            </div>
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
            />
          </motion.button>

          <motion.button
            onClick={() => handleAction('defend')}
            disabled={!isPlayerTurn}
            whileHover={isPlayerTurn ? { scale: 1.05, y: -4 } : {}}
            whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
            className={`relative px-6 py-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl border-2 border-blue-500 ${
              !isPlayerTurn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'
            } backdrop-blur-sm shadow-2xl`}
          >
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-white" />
              <span className="text-lg font-bold text-white">방어</span>
            </div>
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
            />
          </motion.button>

          <motion.button
            onClick={() => handleAction('heal')}
            disabled={!isPlayerTurn}
            whileHover={isPlayerTurn ? { scale: 1.05, y: -4 } : {}}
            whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
            className={`relative px-6 py-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl border-2 border-green-500 ${
              !isPlayerTurn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-green-400'
            } backdrop-blur-sm shadow-2xl`}
          >
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-8 h-8 text-white" />
              <span className="text-lg font-bold text-white">회복</span>
            </div>
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
