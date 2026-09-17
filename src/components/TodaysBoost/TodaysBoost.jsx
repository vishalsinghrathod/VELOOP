import React from 'react';
import { Star, CheckSquare, Flame } from 'lucide-react';
import styles from './TodaysBoost.module.css';

export default function TodaysBoost({ xpEarned = 215, tasksDone = 4, totalTasks = 8, streakDays = 7, onCardClick }) {
  return (
    <div className={styles.boostSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>⚡</span> TODAY'S BOOST
        </h2>
      </div>

      <div className={styles.boostGrid}>
        {/* Card 1: XP Earned */}
        <div 
          className={styles.boostCard}
          onClick={() => onCardClick?.('xp')}
          role="button"
          tabIndex={0}
          title="View today's XP breakdown"
        >
          <div className={`${styles.iconBubble} ${styles.starBubble}`}>
            <Star size={18} color="#fbbf24" fill="#fbbf24" />
          </div>
          <span className={styles.cardLabel}>XP Earned</span>
          <span className={styles.cardValue}>{xpEarned} XP</span>
        </div>

        {/* Card 2: Tasks Done */}
        <div 
          className={styles.boostCard}
          onClick={() => onCardClick?.('tasks')}
          role="button"
          tabIndex={0}
          title="View daily tasks"
        >
          <div className={`${styles.iconBubble} ${styles.taskBubble}`}>
            <CheckSquare size={18} color="#10b981" />
          </div>
          <span className={styles.cardLabel}>Tasks Done</span>
          <span className={styles.cardValue}>{tasksDone} / {totalTasks}</span>
        </div>

        {/* Card 3: Streak */}
        <div 
          className={styles.boostCard}
          onClick={() => onCardClick?.('streak')}
          role="button"
          tabIndex={0}
          title="View streak perks"
        >
          <div className={`${styles.iconBubble} ${styles.streakBubble}`}>
            <Flame size={18} color="#f97316" fill="#f97316" />
          </div>
          <span className={styles.cardLabel}>Streak</span>
          <span className={styles.cardValue}>{streakDays} Days</span>
        </div>
      </div>
    </div>
  );
}
