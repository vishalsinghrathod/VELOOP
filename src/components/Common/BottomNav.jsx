import React from 'react';
import { Home, DollarSign, Gift, Wallet, User } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav({ activeTab = 'rewards', onSelectTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: DollarSign },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className={styles.bottomNav} aria-label="Bottom Navigation">
      <div className={styles.navContainer}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`${styles.navBtn} ${isActive ? styles.active : ''}`}
              onClick={() => onSelectTab(item.id)}
              id={`nav-tab-${item.id}`}
              aria-label={item.label}
            >
              <div className={styles.iconWrapper}>
                <Icon size={20} className={styles.icon} />
                {isActive && <span className={styles.activeGlow}></span>}
              </div>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
