import React from 'react';
import { Gift, Lock, ChevronRight, Sparkles, Info } from 'lucide-react';
import styles from './NextLevelReward.module.css';

export default function NextLevelReward({ user, onViewRewards, onOpenInfo }) {
  const currentLevelStr = String(user.currentLevel).padStart(2, '0');
  const nextLevelStr = String(user.nextLevel).padStart(2, '0');

  return (
    <div className={styles.rewardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.infoCol}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>Level {currentLevelStr} Rewards</h3>
            <button 
              className={styles.infoIconBtn}
              onClick={() => onOpenInfo?.('reward')}
              title="Reward details"
            >
              <Info size={14} color="#94a3b8" />
            </button>
          </div>
          <p className={styles.subtitle}>Amazing rewards await you!</p>
          
          <div className={styles.rewardPillsRow}>
            <span className={styles.rewardPillGold}>✨ +500 VEs</span>
            <span className={styles.rewardPillPurple}>💎 +25 Gems</span>
          </div>

          <button 
            className={styles.viewRewardsBtn}
            onClick={onViewRewards}
            id="btn-view-rewards"
          >
            <span>View Rewards</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* 3D Glowing Treasure Chest Illustration */}
        <div className={styles.chestGraphicCol} onClick={onViewRewards} role="button" tabIndex={0}>
          <div className={styles.chestGlow}></div>
          <div className={styles.chestSvgWrapper}>
            <svg viewBox="0 0 100 90" className={styles.chestSvg}>
              <defs>
                <linearGradient id="chestBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="60%" stopColor="#451a03" />
                  <stop offset="100%" stopColor="#291102" />
                </linearGradient>
                <linearGradient id="chestGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <filter id="chestSparkle" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Chest Back Shadow */}
              <ellipse cx="50" cy="80" rx="38" ry="8" fill="rgba(0,0,0,0.4)" />
              {/* Chest Base */}
              <rect x="15" y="42" width="70" height="34" rx="6" fill="url(#chestBody)" stroke="#92400e" strokeWidth="2" />
              {/* Gold Bands on Base */}
              <rect x="25" y="42" width="8" height="34" fill="url(#chestGold)" />
              <rect x="67" y="42" width="8" height="34" fill="url(#chestGold)" />
              {/* Base Rim */}
              <rect x="13" y="38" width="74" height="6" rx="2" fill="url(#chestGold)" />
              {/* Chest Lid (Slightly Open) */}
              <path d="M 13 36 C 13 20, 87 20, 87 36 Z" fill="url(#chestBody)" stroke="#92400e" strokeWidth="2" />
              <path d="M 25 36 C 25 24, 33 24, 33 36 Z" fill="url(#chestGold)" />
              <path d="M 67 36 C 67 24, 75 24, 75 36 Z" fill="url(#chestGold)" />
              {/* Glowing Gems Inside */}
              <circle cx="50" cy="34" r="5" fill="#a855f7" filter="url(#chestSparkle)" />
              <polygon points="50,29 54,34 50,39 46,34" fill="#d8b4fe" />
              <circle cx="40" cy="36" r="4" fill="#fbbf24" filter="url(#chestSparkle)" />
              <circle cx="60" cy="36" r="4" fill="#38bdf8" filter="url(#chestSparkle)" />
              {/* Lock Plate */}
              <circle cx="50" cy="48" r="6" fill="url(#chestGold)" />
              <circle cx="50" cy="48" r="2.5" fill="#1c1917" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
