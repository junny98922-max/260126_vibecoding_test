'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';
import { NewGameModal } from './NewGameModal';

interface ChatHeaderProps {
  onNewGame: () => void;
  sessionId: string;
}

export function ChatHeader({ onNewGame, sessionId }: ChatHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  const handleNewGame = () => {
    setShowModal(false);
    onNewGame();
  };

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 md:px-6 py-4 bg-gray-800 border-b border-gray-700"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="w-10 h-10 bg-purple-900/70 rounded-lg flex items-center justify-center"
          >
            <Swords className="w-6 h-6 text-purple-400" />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-xl font-bold text-gray-100">Shadow Lord Slayer</h1>
            <p className="text-xs text-gray-400">AI TRPG Game Master</p>
          </motion.div>
        </div>
        <motion.button
          onClick={() => setShowModal(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors shadow-[0_0_10px_rgba(168,85,247,0.4)]"
        >
          새 게임
        </motion.button>
      </motion.div>

      <NewGameModal
        isOpen={showModal}
        onConfirm={handleNewGame}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
