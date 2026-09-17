import { useState, useEffect } from 'react';
import { INITIAL_USER_DATA } from '../data/userData';
import { INITIAL_XP_HISTORY } from '../data/xpHistoryData';
import { LEVEL_DATA } from '../data/levelData';
import confetti from 'canvas-confetti';

const STORAGE_KEY_USER = 'veloop_user_state_v1';
const STORAGE_KEY_HISTORY = 'veloop_history_state_v1';

export function useUserData() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_USER_DATA;
    } catch {
      return INITIAL_USER_DATA;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      return saved ? JSON.parse(saved) : INITIAL_XP_HISTORY;
    } catch {
      return INITIAL_XP_HISTORY;
    }
  });

  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [activeInfoModal, setActiveInfoModal] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const addXP = (xpAmount, veAmount = 0, title = 'Reward Claimed', type = 'task') => {
    setUser(prev => {
      const newXP = prev.currentXP + xpAmount;
      const newVEs = prev.walletVEs + veAmount;
      const newXPToday = prev.xpEarnedToday + xpAmount;
      const newVEsToday = prev.vesEarnedToday + veAmount;

      // Check for level progression
      if (newXP >= prev.levelMaxXP) {
        const nextLvlNum = prev.currentLevel + 1;
        const currentLvlConfig = LEVEL_DATA.find(l => l.level === nextLvlNum) || {
          requiredXP: prev.levelMaxXP + 4000,
          reward: { label: '+800 VEs & 50 Gems' }
        };

        setLevelUpData({
          oldLevel: prev.currentLevel,
          newLevel: nextLvlNum,
          rewardLabel: currentLvlConfig.reward?.label || '+500 VEs & +25 Gems',
          perks: currentLvlConfig.perks || [
            'Higher daily XP limit',
            'Access to new challenges',
            'Better reward opportunities'
          ]
        });
        setShowLevelUpModal(true);

        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#fbbf24', '#8b5cf6', '#10b981']
          });
        } catch {
          // ignore if canvas-confetti fails
        }

        return {
          ...prev,
          currentLevel: nextLvlNum,
          currentXP: newXP,
          levelMinXP: prev.levelMaxXP,
          levelMaxXP: currentLvlConfig.requiredXP || prev.levelMaxXP + 4000,
          nextLevel: nextLvlNum + 1,
          walletVEs: newVEs + 500,
          walletGems: prev.walletGems + 25,
          xpEarnedToday: newXPToday,
          vesEarnedToday: newVEsToday + 500
        };
      }

      return {
        ...prev,
        currentXP: newXP,
        walletVEs: newVEs,
        xpEarnedToday: newXPToday,
        vesEarnedToday: newVEsToday
      };
    });

    // Add entry to history
    const newEntry = {
      id: `act-${Date.now()}`,
      type: type,
      badge: title,
      xpAmount: xpAmount,
      veAmount: veAmount,
      time: 'Just now',
      timestamp: Date.now(),
      icon: type === 'game' ? 'Sparkles' : type === 'referral' ? 'Users' : type === 'watch' ? 'Play' : 'CheckSquare',
      color: type === 'game' ? '#ec4899' : type === 'referral' ? '#f59e0b' : type === 'watch' ? '#8b5cf6' : '#10b981'
    };

    setHistory(prev => [newEntry, ...prev]);
  };

  const recordGameResult = (score, xpBonus, veBonus) => {
    setUser(prev => ({
      ...prev,
      bestGameScore: Math.max(prev.bestGameScore, score)
    }));

    addXP(xpBonus, veBonus, 'XP Catcher Score Reward', 'game');
  };

  const resetToDefault = () => {
    setUser(INITIAL_USER_DATA);
    setHistory(INITIAL_XP_HISTORY);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  };

  return {
    user,
    history,
    addXP,
    recordGameResult,
    showLevelUpModal,
    setShowLevelUpModal,
    levelUpData,
    setLevelUpData,
    activeInfoModal,
    setActiveInfoModal,
    resetToDefault
  };
}
