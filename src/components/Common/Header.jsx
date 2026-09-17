import React from 'react';
import { Menu, Bell, Info, Sparkles, LayoutDashboard, Layers, Clock, User, LogOut } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ 
  activeView = 'dashboard', 
  onSelectView, 
  onOpenNotifications, 
  onOpenInfo,
  onLogout,
  currentLevel = 5 
}) {
  const levelStr = String(currentLevel).padStart(2, '0');

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.iconBtnMobile} 
          onClick={() => onSelectView?.('profile')}
          aria-label="Profile Menu"
          id="btn-header-menu"
        >
          <User size={20} color="#cbd5e1" />
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
          id="nav-desktop-dashboard"
        >
          <LayoutDashboard size={15} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'earn' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('earn')}
          id="nav-desktop-earn"
        >
          <Layers size={15} />
          <span>Earn & Level Up</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'game' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('game')}
          id="nav-desktop-game"
        >
          <Sparkles size={15} />
          <span>XP Catcher Arcade</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'activity' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('activity')}
          id="nav-desktop-activity"
        >
          <Clock size={15} />
          <span>Activity Log</span>
        </button>

        <button 
          className={`${styles.navLink} ${activeView === 'profile' ? styles.navLinkActive : ''}`}
          onClick={() => onSelectView?.('profile')}
          id="nav-desktop-profile"
        >
          <User size={15} />
          <span>My Profile</span>
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

        {/* Desktop User Profile Chip */}
        <button 
          className={`${styles.userProfileChip} ${activeView === 'profile' ? styles.chipActive : ''}`}
          onClick={() => onSelectView?.('profile')}
          title="View My Profile"
          id="btn-header-profile-chip"
        >
          <div className={styles.chipAvatar}>VL</div>
          <div className={styles.chipInfo}>
            <span className={styles.chipName}>VeLooper</span>
            <span className={styles.chipBadge}>LVL {levelStr}</span>
          </div>
        </button>

        {/* Direct Sign Out Button */}
        <button 
          className={styles.iconBtnLogout}
          onClick={onLogout}
          aria-label="Sign Out"
          id="btn-header-logout"
          title="Sign Out"
        >
          <LogOut size={16} color="#fca5a5" />
        </button>
      </div>
    </header>
  );
}
