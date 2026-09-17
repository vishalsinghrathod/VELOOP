import React from 'react';
import { Info, Sparkles, ChevronRight } from 'lucide-react';
import styles from './CurrentLevelCard.module.css';

export default function CurrentLevelCard({ user, onOpenInfo, onCelebrateClick }) {
  const currentXP = user.currentXP;
  const maxXP = user.levelMaxXP;
  const minXP = user.levelMinXP;
  const currentLevelStr = String(user.currentLevel).padStart(2, '0');
  const nextLevelStr = String(user.nextLevel).padStart(2, '0');
  
  const xpNeeded = Math.max(0, maxXP - currentXP);
  const percentage = Math.min(100, Math.max(0, Math.round((currentXP / maxXP) * 100)));

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        {/* Hexagonal Gold Level Badge */}
        <div className={styles.badgeWrapper}>
          <div className={styles.hexagonBadge}>
            <span className={styles.badgeLabel}>LEVEL</span>
            <span className={styles.badgeNumber}>{currentLevelStr}</span>
          </div>
          <div className={styles.badgeGlow}></div>
        </div>

        {/* Level Stats Right Side */}
        <div className={styles.levelStats}>
          <div className={styles.xpTextGroup}>
            <span className={styles.currentXPValue}>{currentXP.toLocaleString()} XP</span>
            <span className={styles.xpToNextLabel}>to reach Level {nextLevelStr}</span>
          </div>

          <button 
            className={styles.infoBtn}
            onClick={() => onOpenInfo?.('level')}
            title="Level details & rules"
            aria-label="Level information"
          >
            <Info size={16} color="#cbd5e1" />
          </button>
        </div>
      </div>

      {/* XP Progress Bar Section */}
      <div className={styles.progressSection}>
        <div className={styles.progressLabels}>
          <span className={styles.xpFraction}>
            <strong>{currentXP.toLocaleString()}</strong> / {maxXP.toLocaleString()} XP
          </span>
          <span className={styles.percentageLabel}>{percentage}%</span>
        </div>

        <div className={styles.barTrack}>
          <div 
            className={styles.barFill} 
            style={{ width: `${percentage}%` }}
          >
            <span className={styles.barShimmer}></span>
          </div>
        </div>

        <div className={styles.remainingInfo}>
          <span className={styles.remainingText}>
            ⚡ <strong>{xpNeeded.toLocaleString()} XP</strong> remaining to Level {nextLevelStr}
          </span>
          <button 
            className={styles.perksPreviewBtn}
            onClick={onCelebrateClick}
            title="Preview Level Perks"
          >
            <Sparkles size={13} />
            <span>Perks</span>
          </button>
        </div>
      </div>
    </div>
  );
}
