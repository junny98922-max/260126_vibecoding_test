'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewGameModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function NewGameModal({ isOpen, onConfirm, onCancel }: NewGameModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">새 게임 시작</DialogTitle>
          <DialogDescription className="text-gray-400">
            현재 진행 중인 게임을 종료하고 새로운 게임을 시작하시겠습니까?
            <br />
            현재 대화 내역은 저장되지만, 새로운 세션이 시작됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors"
          >
            취소
          </motion.button>
          <motion.button
            onClick={onConfirm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            새 게임 시작
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
