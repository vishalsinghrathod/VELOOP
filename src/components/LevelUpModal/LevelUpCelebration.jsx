import React from 'react';
import { Sparkles, Check, CheckCircle2 } from 'lucide-react';
import styles from './LevelUpModal.module.css';

export default function LevelUpCelebration({ 
  levelNumber = 5, 
  rewards = { ves: 500, gems: 25 },
  perks = [
    "Higher daily XP limit",
    "Access to new challenges",
    "Better reward opportunities"
  ],
  onClaim,
  embedded = false
}) {
  const levelStr = String(levelNumber).padStart(2, '0');

  return (
    <div className={embedded ? styles.embeddedContainer : styles.overlay}>
      <div className={`${styles.modal} ${embedded ? styles.modalEmbedded : ''}`}>
        {/* Glow and Sparkle Ray Animation */}
        <div className={styles.burstGlow}></div>

        <div className={styles.sparkleIconTop}>
          <Sparkles size={24} color="#fbbf24" />
        </div>

        {/* Title */}
        <h2 className={styles.mainTitle}>LEVEL UP!</h2>
        <p className={styles.subtitle}>You've reached</p>

        {/* Giant Glowing Level Hexagon Badge */}
        <div className={styles.badgeWrapper}>
          <div className={styles.hexagonBadge}>
            <span className={styles.badgeLabel}>LEVEL</span>
            <span className={styles.badgeNumber}>{levelStr}</span>
          </div>
          <div className={styles.outerRays}></div>
        </div>

        {/* Reward Cards: VEs and Gems */}
        <div className={styles.rewardCardsGrid}>
          {/* Gold Coins Card */}
          <div className={styles.rewardCard}>
            <span className={styles.rewardValueGold}>+{rewards.ves} VEs</span>
            <div className={styles.coinGraphicBox}>
              <svg viewBox="0 0 70 45" className={styles.coinsSvg}>
                <ellipse cx="25" cy="32" rx="16" ry="7" fill="#b45309" />
                <ellipse cx="25" cy="30" rx="16" ry="7" fill="#f59e0b" />
                <ellipse cx="25" cy="28" rx="16" ry="7" fill="#fbbf24" />
                <ellipse cx="45" cy="34" rx="15" ry="6" fill="#b45309" />
                <ellipse cx="45" cy="32" rx="15" ry="6" fill="#f59e0b" />
                <ellipse cx="45" cy="30" rx="15" ry="6" fill="#fbbf24" />
                <ellipse cx="35" cy="20" rx="14" ry="6" fill="#fef08a" />
              </svg>
            </div>
          </div>

          {/* Purple Gems Card */}
          <div className={styles.rewardCard}>
            <span className={styles.rewardValuePurple}>+{rewards.gems} Gems</span>
            <div className={styles.gemGraphicBox}>
              <svg viewBox="0 0 70 45" className={styles.gemsSvg}>
                <defs>
                  <linearGradient id="modalGemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e9d5ff" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </linearGradient>
                </defs>
                <polygon points="35,8 48,18 40,36 30,36 22,18" fill="url(#modalGemGrad)" stroke="#c084fc" strokeWidth="1.5" />
                <polygon points="20,18 28,24 23,34 16,30" fill="url(#modalGemGrad)" stroke="#c084fc" strokeWidth="1" opacity="0.8" />
                <polygon points="50,18 57,24 53,34 46,30" fill="url(#modalGemGrad)" stroke="#c084fc" strokeWidth="1" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Perks Unlocked List */}
        <div className={styles.perksList}>
          {perks.map((perk, idx) => (
            <div key={idx} className={styles.perkItem}>
              <div className={styles.perkCheckCircle}>
                <Check size={12} color="#fbbf24" strokeWidth={3} />
              </div>
              <span className={styles.perkText}>{perk}</span>
            </div>
          ))}
        </div>

        {/* Claim Rewards Button */}
        <button 
          className={styles.claimButton}
          onClick={onClaim}
          id="btn-claim-level-rewards"
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
}
