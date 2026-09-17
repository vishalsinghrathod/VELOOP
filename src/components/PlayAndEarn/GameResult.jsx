import React from 'react';
import { ArrowLeft, Share2, Star, RotateCcw, LayoutDashboard, Trophy, Award } from 'lucide-react';
import styles from './Game.module.css';

export default function GameResult({ 
  result = { score: 92, xpAwarded: 30, veAwarded: 12 }, 
  user,
  onPlayAgain, 
  onBackToDashboard,
  onShare 
}) {
  const isNewBest = result.score >= user.bestGameScore;
  const currentXP = user.currentXP;
  const maxXP = user.levelMaxXP;
  const currentLvlStr = String(user.currentLevel).padStart(2, '0');
  const nextLvlStr = String(user.nextLevel).padStart(2, '0');
  const percentage = Math.min(100, Math.round((currentXP / maxXP) * 100));

  return (
    <div className={styles.gameContainer}>
      {/* Header */}
      <div className={styles.gameHeader}>
        <button className={styles.backBtn} onClick={onBackToDashboard} aria-label="Back to Dashboard">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <div style={{ flex: 1 }}></div>
        <button className={styles.shareBtn} onClick={onShare} title="Share Achievement" aria-label="Share">
          <Share2 size={18} color="#cbd5e1" />
        </button>
      </div>

      {/* Celebration Titles */}
      <div className={styles.resultHeadingGroup}>
        <h2 className={styles.resultMainTitle}>CHALLENGE COMPLETE!</h2>
        <p className={styles.resultSubtitle}>Outstanding!</p>
      </div>

      {/* 3-Star Laurel Wreath Crest Graphic */}
      <div className={styles.crestWrapper}>
        <div className={styles.crestGlow}></div>
        <div className={styles.crestSvgBox}>
          <svg viewBox="0 0 160 140" className={styles.crestSvg}>
            <defs>
              <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Laurel Wreath Leaves (Left Branch) */}
            <path d="M 30 110 C 15 80, 20 40, 55 20" fill="none" stroke="url(#crestGoldGrad)" strokeWidth="4" />
            <path d="M 22 95 Q 12 90, 24 85 Q 26 95, 22 95 Z" fill="url(#crestGoldGrad)" />
            <path d="M 20 75 Q 8 68, 20 62 Q 24 73, 20 75 Z" fill="url(#crestGoldGrad)" />
            <path d="M 25 55 Q 15 45, 28 42 Q 30 52, 25 55 Z" fill="url(#crestGoldGrad)" />
            <path d="M 36 38 Q 28 26, 42 27 Q 42 36, 36 38 Z" fill="url(#crestGoldGrad)" />

            {/* Laurel Wreath Leaves (Right Branch) */}
            <path d="M 130 110 C 145 80, 140 40, 105 20" fill="none" stroke="url(#crestGoldGrad)" strokeWidth="4" />
            <path d="M 138 95 Q 148 90, 136 85 Q 134 95, 138 95 Z" fill="url(#crestGoldGrad)" />
            <path d="M 140 75 Q 152 68, 140 62 Q 136 73, 140 75 Z" fill="url(#crestGoldGrad)" />
            <path d="M 135 55 Q 145 45, 132 42 Q 130 52, 135 55 Z" fill="url(#crestGoldGrad)" />
            <path d="M 124 38 Q 132 26, 118 27 Q 118 36, 124 38 Z" fill="url(#crestGoldGrad)" />

            {/* Central Shield/Medal */}
            <polygon points="80,24 116,42 116,84 80,108 44,84 44,42" fill="#1e1828" stroke="url(#crestGoldGrad)" strokeWidth="3" />
            
            {/* Center Golden Star */}
            <polygon points="80,45 84,57 97,57 86,65 90,78 80,70 70,78 74,65 63,57 76,57" fill="url(#crestGoldGrad)" />

            {/* Two Side Smaller Stars */}
            <polygon points="62,72 64,78 70,78 65,82 67,88 62,84 57,88 59,82 54,78 60,78" fill="#fbbf24" opacity="0.8" />
            <polygon points="98,72 100,78 106,78 101,82 103,88 98,84 93,88 95,82 90,78 96,78" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Final Score Card */}
      <div className={styles.scoreSummaryCard}>
        <span className={styles.scoreCardTitle}>FINAL SCORE</span>
        <div className={styles.scoreRow}>
          <span className={styles.finalScoreDigits}>{result.score}</span>
          {isNewBest && <span className={styles.newBestBadge}>New Best!</span>}
        </div>
      </div>

      {/* Earned Rewards Cards Grid */}
      <div className={styles.rewardSummaryGrid}>
        <div className={styles.rewardCardItem}>
          <span className={styles.rewardAmountGold}>+{result.xpAwarded} XP</span>
          <span className={styles.rewardTypeLabel}>Experience</span>
        </div>
        <div className={styles.rewardCardItem}>
          <span className={styles.rewardAmountBlue}>+{result.veAwarded} VEs</span>
          <span className={styles.rewardTypeLabel}>Your Reward</span>
        </div>
      </div>

      {/* Mini Progress Card */}
      <div className={styles.resultProgressBox}>
        <div className={styles.resultProgressLevels}>
          <span>Level {currentLvlStr}</span>
          <span>Level {nextLvlStr}</span>
        </div>
        <div className={styles.resultBarTrack}>
          <div className={styles.resultBarFill} style={{ width: `${percentage}%` }}></div>
        </div>
        <div className={styles.resultXpText}>
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
        </div>
      </div>

      {/* CTAs matching Screen 3 */}
      <div className={styles.actionButtonsCol}>
        <button 
          className={styles.playAgainPrimaryBtn}
          onClick={onPlayAgain}
          id="btn-game-play-again"
        >
          <RotateCcw size={18} />
          <span>Play Again</span>
        </button>

        <button 
          className={styles.backDashboardSecondaryBtn}
          onClick={onBackToDashboard}
          id="btn-game-back-dashboard"
        >
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
