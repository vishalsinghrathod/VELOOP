import React from 'react';
import styles from './LevelHero.module.css';

export default function LevelHero({ name = "VeLooper" }) {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.greeting}>
        Good Morning, <span className={styles.userName}>{name}!</span> 👋
      </h1>
      <p className={styles.subtitle}>
        Level up your journey and unlock epic rewards every day.
      </p>
    </div>
  );
}
