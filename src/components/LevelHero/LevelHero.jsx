import React from 'react';
import styles from './LevelHero.module.css';

export default function LevelHero({ name = "VeLooper" }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  const greeting = getGreeting();

  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.greeting}>
        {greeting}, <span className={styles.userName}>{name}!</span> 👋
      </h1>
      <p className={styles.subtitle}>
        Level up your journey and unlock epic rewards every day.
      </p>
    </div>
  );
}
