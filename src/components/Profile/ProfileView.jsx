import React, { useState } from 'react';
import { ArrowLeft, User, Award, ShieldCheck, Zap, Flame, Trophy, Coins, Settings, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import styles from './Profile.module.css';

export default function ProfileView({ user, onBack, onResetData }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const levelStr = String(user.currentLevel).padStart(2, '0');

  const badges = [
    { title: 'Level 05 Elite', desc: 'Reached Level 5 Milestone', unlocked: true, icon: Award, color: '#fbbf24' },
    { title: '7-Day Streak', desc: 'Maintained consecutive daily logins', unlocked: true, icon: Flame, color: '#f97316' },
    { title: 'Arcade Champion', desc: `Scored ${user.bestGameScore} pts in XP Catcher`, unlocked: true, icon: Trophy, color: '#ec4899' },
    { title: 'Token Accumulator', desc: 'Accumulated over 1,500 VEs', unlocked: true, icon: Coins, color: '#10b981' },
    { title: 'Master VeLooper', desc: 'Reach Level 06 Milestone', unlocked: false, icon: Zap, color: '#64748b' }
  ];

  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to Dashboard">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <h2 className={styles.headerTitle}>MY PROFILE</h2>
        <div style={{ width: 38 }}></div>
      </div>

      {/* Avatar & User Info Card */}
      <div className={styles.userHeroCard}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarCircle}>
            <span className={styles.avatarInitials}>VL</span>
          </div>
          <div className={styles.levelPill}>LVL {levelStr}</div>
        </div>

        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.name}</h3>
          <span className={styles.userTitle}>Elite Strategist</span>
          <span className={styles.userId}>Member ID: #VEL-84920</span>
        </div>
      </div>

      {/* Balance & Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Total XP</span>
          <span className={styles.statValue}>{user.currentXP.toLocaleString()}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Wallet VEs</span>
          <span className={styles.statValueGold}>{user.walletVEs.toLocaleString()}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Gems</span>
          <span className={styles.statValuePurple}>{user.walletGems} 💎</span>
        </div>
      </div>

      {/* Unlocked Badges & Achievements */}
      <div className={styles.sectionCard}>
        <h4 className={styles.sectionHeading}>
          <Trophy size={16} color="#fbbf24" />
          <span>Earned Badges & Milestones</span>
        </h4>

        <div className={styles.badgeList}>
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx} 
                className={`${styles.badgeItem} ${b.unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}
              >
                <div 
                  className={styles.badgeIconCircle}
                  style={{ 
                    backgroundColor: b.unlocked ? `${b.color}20` : 'rgba(255,255,255,0.04)',
                    borderColor: b.unlocked ? `${b.color}50` : 'rgba(255,255,255,0.08)'
                  }}
                >
                  <Icon size={18} color={b.unlocked ? b.color : '#64748b'} />
                </div>
                <div className={styles.badgeInfo}>
                  <div className={styles.badgeTitleRow}>
                    <span className={styles.badgeTitle}>{b.title}</span>
                    {b.unlocked ? (
                      <span className={styles.statusUnlocked}>✓ Unlocked</span>
                    ) : (
                      <span className={styles.statusLocked}>Locked</span>
                    )}
                  </div>
                  <span className={styles.badgeDesc}>{b.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Preferences */}
      <div className={styles.sectionCard}>
        <h4 className={styles.sectionHeading}>
          <Settings size={16} color="#94a3b8" />
          <span>Experience Settings</span>
        </h4>

        <div className={styles.settingsRow}>
          <div className={styles.settingText}>
            <span className={styles.settingName}>Sound & Haptic Effects</span>
            <span className={styles.settingDesc}>Feedback on item catch & rewards</span>
          </div>
          <button 
            className={`${styles.toggleSwitch} ${soundEnabled ? styles.toggleOn : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label="Toggle Sound"
          >
            <span className={styles.toggleThumb}></span>
          </button>
        </div>

        <div className={styles.settingsRow}>
          <div className={styles.settingText}>
            <span className={styles.settingName}>Shimmer & Glow Animations</span>
            <span className={styles.settingDesc}>Enhanced visual effects & transitions</span>
          </div>
          <button 
            className={`${styles.toggleSwitch} ${animationsEnabled ? styles.toggleOn : ''}`}
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            aria-label="Toggle Animations"
          >
            <span className={styles.toggleThumb}></span>
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className={styles.accountFooter}>
        <div className={styles.footerLinks}>
          <a href="#help" onClick={(e) => { e.preventDefault(); alert('VELOOP Support: support@veloop.io'); }}>Help & Support</a>
          <span className={styles.linkDot}>•</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: All rights reserved © VELOOP Rewards.'); }}>Terms & Privacy</a>
        </div>

        <button 
          className={styles.logoutBtn}
          onClick={() => {
            if (window.confirm('Are you sure you want to sign out?')) {
              onResetData?.();
              onBack?.();
            }
          }}
          title="Sign Out"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
