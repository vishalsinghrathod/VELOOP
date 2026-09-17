import React from 'react';
import styles from './UXStates.module.css';

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      {/* Skeleton Header */}
      <div className={styles.skeletonHeader}>
        <div className={`${styles.skeletonBox} ${styles.skIcon}`}></div>
        <div className={`${styles.skeletonBox} ${styles.skTitle}`}></div>
        <div className={`${styles.skeletonBox} ${styles.skIcon}`}></div>
      </div>

      {/* Skeleton Level Card */}
      <div className={`${styles.skeletonCard} ${styles.skHeroCard}`}>
        <div className={styles.skRow}>
          <div className={`${styles.skeletonBox} ${styles.skHexagon}`}></div>
          <div className={styles.skCol}>
            <div className={`${styles.skeletonBox} ${styles.skTextLg}`}></div>
            <div className={`${styles.skeletonBox} ${styles.skTextSm}`}></div>
          </div>
        </div>
        <div className={`${styles.skeletonBox} ${styles.skProgressBar}`}></div>
      </div>

      {/* Skeleton Boost */}
      <div className={styles.skGrid3}>
        <div className={`${styles.skeletonCard} ${styles.skMiniCard}`}></div>
        <div className={`${styles.skeletonCard} ${styles.skMiniCard}`}></div>
        <div className={`${styles.skeletonCard} ${styles.skMiniCard}`}></div>
      </div>

      {/* Skeleton Earn More */}
      <div className={styles.skGrid3}>
        <div className={`${styles.skeletonCard} ${styles.skEarnItem}`}></div>
        <div className={`${styles.skeletonCard} ${styles.skEarnItem}`}></div>
        <div className={`${styles.skeletonCard} ${styles.skEarnItem}`}></div>
      </div>
    </div>
  );
}
