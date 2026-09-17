import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from './UXStates.module.css';

export default function EmptyState({ onStartEarning }) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIconCircle}>
        <Sparkles size={28} color="#fbbf24" />
      </div>
      <h3 className={styles.emptyTitle}>No XP Activity</h3>
      <p className={styles.emptySubtitle}>Your XP journey starts here.</p>
      <button className={styles.emptyCtaBtn} onClick={onStartEarning}>
        <span>Start Earning XP</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
