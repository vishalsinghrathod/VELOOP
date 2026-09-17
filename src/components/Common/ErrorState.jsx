import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import styles from './UXStates.module.css';

export default function ErrorState({ onRetry }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIconCircle}>
        <AlertCircle size={32} color="#ef4444" />
      </div>
      <h3 className={styles.errorTitle}>Unable to Load Level Progress</h3>
      <p className={styles.errorSubtitle}>
        We couldn't load your level information right now. Please check your connection and try again.
      </p>
      <button className={styles.retryBtn} onClick={onRetry}>
        <RotateCcw size={16} />
        <span>Try Again</span>
      </button>
    </div>
  );
}
