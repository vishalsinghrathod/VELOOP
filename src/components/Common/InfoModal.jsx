import React from 'react';
import { X, Info, Award, Gift, Sparkles, ShieldCheck } from 'lucide-react';
import styles from './InfoModal.module.css';

export default function InfoModal({ type = 'level', onClose }) {
  const content = {
    level: {
      title: 'Level & XP Progression System',
      icon: Award,
      color: '#fbbf24',
      body: (
        <>
          <p>
            XP (Experience Points) helps you progress through VELOOP Rewards levels. As you reach new levels, you unlock higher daily XP caps, exclusive challenges, and premium reward multipliers.
          </p>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>How XP is calculated:</strong> Complete daily missions, play the XP Catcher mini-game, maintain login streaks, and invite friends.</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Level Thresholds:</strong> Each level requires higher accumulated XP, unlocking progressively superior tier benefits.</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Fair & Transparent:</strong> All XP requirements and milestones are fixed with transparent rules.</div>
          </div>
        </>
      )
    },
    reward: {
      title: 'Next-Level Reward Transparency',
      icon: Gift,
      color: '#8b5cf6',
      body: (
        <>
          <p>
            The displayed reward is associated with the next level according to the current platform reward configuration.
          </p>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>VEs (Virtual Ecosystem Tokens):</strong> Can be redeemed across supported partner apps and services.</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Gems:</strong> Premium currency used to unlock multipliers, special tournaments, and instant prize boxes.</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Perk Unlocks:</strong> Level-ups permanently increase your base earning rate on all future daily tasks.</div>
          </div>
        </>
      )
    },
    rules: {
      title: 'XP Catcher Arcade Rules',
      icon: Sparkles,
      color: '#10b981',
      body: (
        <>
          <p>
            XP Catcher is an engagement and reflex-based challenge designed to reward active participation.
          </p>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Duration:</strong> 20 seconds per challenge round.</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>Catch Items:</strong> Purple Orbs (+10 XP), Gold Coins (+5 VEs), Emeralds (+25 XP), 2X Star Token (doubles points for 5 seconds).</div>
          </div>
          <div className={styles.infoPoint}>
            <span className={styles.pointDot}></span>
            <div><strong>No Gambling:</strong> Purely skill and reflex driven. Rewards are credited directly to your account.</div>
          </div>
        </>
      )
    }
  };

  const active = content[type] || content.level;
  const Icon = active.icon;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleRow}>
            <div className={styles.iconCircle} style={{ backgroundColor: `${active.color}20`, borderColor: `${active.color}40` }}>
              <Icon size={18} color={active.color} />
            </div>
            <h3 className={styles.title}>{active.title}</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.bodyContent}>
          {active.body}
        </div>

        <button className={styles.understandBtn} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
