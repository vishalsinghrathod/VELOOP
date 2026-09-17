import React from 'react';
import { Menu, Bell, Info, Sparkles, LayoutDashboard, Layers, Clock } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ 
  activeView = 'dashboard', 
  onSelectView, 
  onOpenNotifications, 
  onOpenInfo 
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.iconBtnMobile} 
          onClick={() => onOpenInfo?.('level')}
          aria-label="Navigation Menu"
          id="btn-header-menu"
        >
          <Menu size={22} color="#cbd5e1" />
        </button>

        <div className={styles.brandTitle} onClick={() => onSelectView?.('dashboard')}>
          <span className={styles.brandAccent}>VE</span>LOOP
          <span className={styles.brandSub}>REWARDS</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className={styles.desktopNav}>
        <button 
          className={`${styles.navLink} ${activeView === 'dashboard' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('dashboard')}
        >
          <LayoutDashboard size={15} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'earn' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('earn')}
        >
          <Layers size={15} />
          <span>Earn & Level Up</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'game' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('game')}
        >
          <Sparkles size={15} />
          <span>XP Catcher Arcade</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'activity' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('activity')}
        >
          <Clock size={15} />
          <span>Activity Log</span>
        </button>
      </nav>

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
