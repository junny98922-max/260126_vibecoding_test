import { create } from 'zustand';

interface BattleState {
  isInBattle: boolean;
  playerHP: number;
  playerMaxHP: number;
  enemyHP: number;
  enemyMaxHP: number;
  enemyName: string;
  isBoss: boolean;
  lastAction: 'attack' | 'defend' | 'heal' | null;
  enemyAction: 'attack' | 'defend' | null;
  battleLog: string[];
  isPlayerTurn: boolean;

  startBattle: (enemyName: string, enemyHP: number, isBoss: boolean) => void;
  endBattle: (victory: boolean) => void;
  playerAction: (action: 'attack' | 'defend' | 'heal') => void;
  resetBattle: () => void;
}

export const useBattle = create<BattleState>((set, get) => ({
  isInBattle: false,
  playerHP: 100,
  playerMaxHP: 100,
  enemyHP: 50,
  enemyMaxHP: 50,
  enemyName: '몬스터',
  isBoss: false,
  lastAction: null,
  enemyAction: null,
  battleLog: [],
  isPlayerTurn: true,

  startBattle: (enemyName, enemyHP, isBoss) => {
    set({
      isInBattle: true,
      enemyName,
      enemyHP,
      enemyMaxHP: enemyHP,
      isBoss,
      playerHP: 100,
      playerMaxHP: 100,
      battleLog: [`${enemyName}와(과) 전투가 시작되었다!`],
      isPlayerTurn: true,
      lastAction: null,
      enemyAction: null,
    });
  },

  endBattle: (victory) => {
    const { battleLog } = get();
    set({
      isInBattle: false,
      battleLog: [...battleLog, victory ? '승리했다!' : '패배했다...'],
    });
  },

  playerAction: (action) => {
    const state = get();
    if (!state.isPlayerTurn || !state.isInBattle) return;

    let newPlayerHP = state.playerHP;
    let newEnemyHP = state.enemyHP;
    const logs: string[] = [];

    // 플레이어 액션 처리
    if (action === 'attack') {
      const damage = Math.floor(Math.random() * 20) + 15; // 15-35 데미지
      newEnemyHP = Math.max(0, state.enemyHP - damage);
      logs.push(`플레이어의 공격! ${damage} 데미지!`);
    } else if (action === 'defend') {
      logs.push('플레이어는 방어 자세를 취했다!');
    } else if (action === 'heal') {
      const heal = Math.floor(Math.random() * 15) + 20; // 20-35 회복
      newPlayerHP = Math.min(state.playerMaxHP, state.playerHP + heal);
      logs.push(`포션을 사용했다! HP ${heal} 회복!`);
    }

    // 적이 쓰러졌는지 확인
    if (newEnemyHP <= 0) {
      set({
        enemyHP: 0,
        playerHP: newPlayerHP,
        lastAction: action,
        battleLog: [...state.battleLog, ...logs, `${state.enemyName}를 쓰러뜨렸다!`],
      });
      setTimeout(() => {
        get().endBattle(true);
      }, 2000);
      return;
    }

    // 적 턴
    const enemyActionType = Math.random() > 0.3 ? 'attack' : 'defend';

    if (enemyActionType === 'attack') {
      let damage = Math.floor(Math.random() * 15) + 10; // 10-25 데미지
      if (state.isBoss) damage = Math.floor(damage * 1.5); // 보스는 1.5배
      if (action === 'defend') damage = Math.floor(damage * 0.5); // 방어 시 데미지 반감

      newPlayerHP = Math.max(0, newPlayerHP - damage);
      logs.push(`${state.enemyName}의 공격! ${damage} 데미지를 받았다!`);
    } else {
      logs.push(`${state.enemyName}는 방어 자세를 취했다!`);
    }

    // 플레이어가 쓰러졌는지 확인
    if (newPlayerHP <= 0) {
      set({
        playerHP: 0,
        enemyHP: newEnemyHP,
        lastAction: action,
        enemyAction: enemyActionType,
        battleLog: [...state.battleLog, ...logs, '플레이어가 쓰러졌다...'],
      });
      setTimeout(() => {
        get().endBattle(false);
      }, 2000);
      return;
    }

    set({
      playerHP: newPlayerHP,
      enemyHP: newEnemyHP,
      lastAction: action,
      enemyAction: enemyActionType,
      battleLog: [...state.battleLog, ...logs],
      isPlayerTurn: true,
    });
  },

  resetBattle: () => {
    set({
      isInBattle: false,
      playerHP: 100,
      playerMaxHP: 100,
      enemyHP: 50,
      enemyMaxHP: 50,
      enemyName: '몬스터',
      isBoss: false,
      lastAction: null,
      enemyAction: null,
      battleLog: [],
      isPlayerTurn: true,
    });
  },
}));
