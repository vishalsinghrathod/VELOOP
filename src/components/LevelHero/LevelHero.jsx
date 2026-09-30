import React from 'react';
import { Sun, Sunset, Moon, Sparkles, Flame, Zap, Award, Coins } from 'lucide-react';
import styles from './LevelHero.module.css';

export default function LevelHero({ name = "VeLooper", user }) {
  const getGreetingInfo = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: "Good Morning", icon: Sun, iconColor: "#fbbf24" };
    }
    if (hour >= 12 && hour < 17) {
      return { text: "Good Afternoon", icon: Sun, iconColor: "#f59e0b" };
    }
    if (hour >= 17 && hour < 22) {
      return { text: "Good Evening", icon: Sunset, iconColor: "#fb923c" };
    }
    return { text: "Good Night", icon: Moon, iconColor: "#818cf8" };
  };

  const greetingInfo = getGreetingInfo();
  const GreetingIcon = greetingInfo.icon;

  const streakDays = user?.streakDays || 7;
  const xpEarnedToday = user?.xpEarnedToday || 215;
  const currentLevel = user?.currentLevel || 5;

  return (
    <div className={styles.heroContainer}>
      <div className={styles.greetingHeader}>
        <div className={styles.timeBadge}>
          <GreetingIcon size={14} color={greetingInfo.iconColor} />
          <span>{greetingInfo.text}</span>
        </div>

        <div className={styles.vipTag}>
          <Sparkles size={12} color="#fbbf24" />
          <span>VIP Season 1</span>
        </div>
      </div>

      <div className={styles.titleRow}>
        <h1 className={styles.greeting}>
          Welcome back, <span className={styles.userName}>{name}</span>! 👋
        </h1>
      </div>

      <p className={styles.subtitle}>
        Your <strong>Level 05 Elite</strong> status is active. Advance your daily progression to claim master-tier rewards.
      </p>

      {/* Hero Quick Stat Ticker */}
      <div className={styles.heroStatsRow}>
        <div className={styles.statPill}>
          <Zap size={13} color="#fbbf24" />
          <span><strong>+{xpEarnedToday} XP</strong> today</span>
        </div>

        <div className={styles.statPill}>
          <Flame size={13} color="#f97316" />
          <span><strong>{streakDays} Days</strong> streak</span>
        </div>

        <div className={styles.statPill}>
          <Award size={13} color="#38bdf8" />
          <span><strong>Tier 05</strong> Elite</span>
        </div>
      </div>
    </div>
  );
}
