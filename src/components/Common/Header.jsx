import React from 'react';
import { Menu, Bell, Info } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onOpenMenu, onOpenNotifications, onOpenInfo }) {
  return (
    <header className={styles.header}>
      <button 
        className={styles.iconBtn} 
        onClick={onOpenMenu}
        aria-label="Navigation Menu"
        id="btn-header-menu"
      >
        <Menu size={22} color="#cbd5e1" />
      </button>

      <div className={styles.brandTitle}>
        <span className={styles.brandAccent}>VE</span>LOOP
        <span className={styles.brandSub}>REWARDS</span>
      </div>

      <div className={styles.rightActions}>
        <button 
          className={styles.iconBtn}
          onClick={() => onOpenInfo?.('level')}
          aria-label="Level Information"
          id="btn-header-info"
          title="Level & XP Rules"
        >
          <Info size={18} color="#94a3b8" />
        </button>

        <button 
          className={styles.iconBtn} 
          onClick={onOpenNotifications}
          aria-label="Notifications"
          id="btn-header-bell"
        >
          <Bell size={20} color="#cbd5e1" />
          <span className={styles.badgeDot}></span>
        </button>
      </div>
    </header>
  );
}
