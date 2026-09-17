import React from 'react';
import { ArrowLeft, Info, Trophy, Timer, Sparkles, Shield, Play } from 'lucide-react';
import styles from './Game.module.css';

export default function GameStart({ onStartGame, onBack, bestScore = 92, onOpenInfo }) {
  return (
    <div className={styles.gameContainer}>
      {/* Header */}
      <div className={styles.gameHeader}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <div className={styles.headerTitleGroup}>
          <h2 className={styles.gameTitle}>
            XP CATCHER
            <button 
              className={styles.infoIconBtn}
              onClick={() => onOpenInfo?.('rules')}
              title="Game Rules"
            >
              <Info size={15} color="#94a3b8" />
            </button>
          </h2>
          <span className={styles.timerBadge}>
            <Timer size={13} color="#fbbf24" /> 00:20
          </span>
        </div>
        <div style={{ width: 36 }}></div>
      </div>

      <p className={styles.gameSubtitle}>
        Catch XP orbs & coins • Score high for better rewards!
      </p>

      {/* Hero Showcase Card */}
      <div className={styles.startHeroCard}>
        <div className={styles.heroGraphicWrapper}>
          <div className={styles.floatingItemsPreview}>
            <span className={`${styles.orbPreview} ${styles.xpOrb}`}>XP</span>
            <span className={`${styles.orbPreview} ${styles.vCoin}`}>V</span>
            <span className={`${styles.orbPreview} ${styles.gemOrb}`}>💎</span>
            <span className={`${styles.orbPreview} ${styles.multOrb}`}>2X</span>
          </div>

          <div className={styles.basketGraphic}>
            <svg viewBox="0 0 120 70" className={styles.basketSvg}>
              <defs>
                <linearGradient id="startBasketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
              <ellipse cx="60" cy="18" rx="52" ry="12" fill="none" stroke="url(#startBasketGrad)" strokeWidth="4" />
              <path d="M 8 18 Q 20 62 60 62 Q 100 62 112 18" fill="rgba(245, 158, 11, 0.2)" stroke="url(#startBasketGrad)" strokeWidth="3" />
              <line x1="22" y1="18" x2="35" y2="60" stroke="#b45309" strokeWidth="2" />
              <line x1="42" y1="22" x2="48" y2="62" stroke="#b45309" strokeWidth="2" />
              <line x1="60" y1="24" x2="60" y2="62" stroke="#b45309" strokeWidth="2" />
              <line x1="78" y1="22" x2="72" y2="62" stroke="#b45309" strokeWidth="2" />
              <line x1="98" y1="18" x2="85" y2="60" stroke="#b45309" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className={styles.bestScorePill}>
          <Trophy size={14} color="#fbbf24" />
          <span>High Score: <strong>{bestScore} pts</strong></span>
        </div>
      </div>

      {/* Rules & Rewards Overview */}
      <div className={styles.rulesList}>
        <div className={styles.ruleItem}>
          <span className={styles.ruleBullet}>🎯</span>
          <div>
            <strong>Objective:</strong> Move your basket left & right to catch falling items in 20 seconds.
          </div>
        </div>
        <div className={styles.ruleItem}>
          <span className={styles.ruleBullet}>⚡</span>
          <div>
            <strong>Items:</strong> XP Orbs (+10 XP), Gold V-Coins (+5 VEs), Emeralds (+25 XP), 2X Multiplier!
          </div>
        </div>
        <div className={styles.ruleItem}>
          <span className={styles.ruleBullet}>🎁</span>
          <div>
            <strong>Rewards:</strong> Higher scores award up to +50 XP and +25 VEs added to your balance!
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className={styles.startActionContainer}>
        <button 
          className={styles.playNowPrimaryBtn}
          onClick={onStartGame}
          id="btn-start-xp-catcher"
        >
          <Play size={18} fill="#161827" color="#161827" />
          <span>Start Challenge</span>
        </button>
      </div>
    </div>
  );
}
