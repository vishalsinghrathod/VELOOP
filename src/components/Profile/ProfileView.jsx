import React, { useState } from 'react';
import { 
  ArrowLeft, User, Award, ShieldCheck, Zap, Flame, Trophy, Coins, 
  Settings, RotateCcw, ChevronRight, CheckCircle2, LogOut, Sparkles, 
  Lock, Check, Filter, Star
} from 'lucide-react';
import BadgeModal from './BadgeModal';
import styles from './Profile.module.css';

export default function ProfileView({ user, onBack, onLogout, onResetData }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'unlocked' | 'locked' | 'legendary'
  const [inspectingBadge, setInspectingBadge] = useState(null);
  const [equippedBadgeId, setEquippedBadgeId] = useState('lvl5');

  const levelStr = String(user.currentLevel).padStart(2, '0');

  const badges = [
    { 
      id: 'lvl5', 
      title: 'Level 05 Elite', 
      tier: 'legendary',
      desc: 'Reached Level 5 Milestone and entered the Elite VIP tier.', 
      unlocked: true, 
      icon: Award, 
      color: '#fbbf24',
      rarity: 'Top 3% of VeLoopers',
      perk: '+15% Bonus on all milestone reward claims'
    },
    { 
      id: 'streak7', 
      title: '7-Day Fire Streak', 
      tier: 'mythic',
      desc: 'Maintained consecutive daily logins and streak rituals.', 
      unlocked: true, 
      icon: Flame, 
      color: '#f97316',
      rarity: 'Top 6% of VeLoopers',
      perk: '2x Streak Multiplier on daily check-in rewards'
    },
    { 
      id: 'arcade_champ', 
      title: 'Arcade Ace', 
      tier: 'epic',
      desc: `Scored ${user.bestGameScore || 320} pts in XP Catcher Arcade challenge.`, 
      unlocked: true, 
      icon: Trophy, 
      color: '#ec4899',
      rarity: 'Top 8% of VeLoopers',
      perk: '+5s Extra Timer in XP Catcher mini-game'
    },
    { 
      id: 'token_baron', 
      title: 'Token Baron', 
      tier: 'emerald',
      desc: 'Accumulated over 1,500 VEs inside your verified rewards vault.', 
      unlocked: true, 
      icon: Coins, 
      color: '#10b981',
      rarity: 'Top 10% of VeLoopers',
      perk: '+50 Daily Passive VEs interest bonus'
    },
    { 
      id: 'flash_ref', 
      title: 'Flash Reflexes', 
      tier: 'rare',
      desc: 'Caught 10 golden orbs in a single arcade game without missing.', 
      unlocked: true, 
      icon: Zap, 
      color: '#38bdf8',
      rarity: 'Top 12% of VeLoopers',
      perk: '+10 XP on perfect consecutive catches'
    },
    { 
      id: 'vip_van', 
      title: 'VIP Vanguard', 
      tier: 'legendary',
      desc: 'Verified early adopter with full security accreditation and passkey.', 
      unlocked: true, 
      icon: ShieldCheck, 
      color: '#fbbf24',
      rarity: 'Top 2% of VeLoopers',
      perk: 'VIP priority event invites & exclusive golden crest'
    },
    { 
      id: 'master_velooper', 
      title: 'Master VeLooper', 
      tier: 'legendary',
      desc: 'Ascend to Level 06 Milestone to unlock the Master VeLooper mantle.', 
      unlocked: false, 
      icon: Star, 
      color: '#64748b',
      rarity: 'Top 0.5% of VeLoopers',
      perk: 'Permanent Golden Name & 3x Bonus on all activities',
      progress: { current: user.currentLevel, total: 6, unit: 'Level' }
    },
    { 
      id: 'diamond_vault', 
      title: 'Gem Hoarder', 
      tier: 'epic',
      desc: 'Amass 50 Rare Gems in your rewards treasury.', 
      unlocked: false, 
      icon: Sparkles, 
      color: '#64748b',
      rarity: 'Top 1% of VeLoopers',
      perk: 'Unlocks Exclusive Mystery Airdrops each week',
      progress: { current: user.walletGems || 25, total: 50, unit: 'Gems' }
    }
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const masteryPercentage = Math.round((unlockedCount / badges.length) * 100);

  const filteredBadges = badges.filter(b => {
    if (filterTab === 'unlocked') return b.unlocked;
    if (filterTab === 'locked') return !b.unlocked;
    if (filterTab === 'legendary') return b.tier === 'legendary';
    return true;
  });

  const tierColors = {
    legendary: { border: 'rgba(251, 191, 36, 0.4)', text: '#fbbf24', bg: 'rgba(245, 158, 11, 0.12)' },
    mythic: { border: 'rgba(249, 115, 22, 0.4)', text: '#f97316', bg: 'rgba(249, 115, 22, 0.12)' },
    epic: { border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc', bg: 'rgba(168, 85, 247, 0.12)' },
    rare: { border: 'rgba(6, 182, 212, 0.4)', text: '#38bdf8', bg: 'rgba(6, 182, 212, 0.12)' },
    emerald: { border: 'rgba(16, 185, 129, 0.4)', text: '#34d399', bg: 'rgba(16, 185, 129, 0.12)' }
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to Dashboard">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <div className={styles.headerTitleGroup}>
          <h2 className={styles.headerTitle}>PROFILE & TROPHY ROOM</h2>
          <span className={styles.headerSub}>Level 05 Strategist & Achievements</span>
        </div>
        <div className={styles.headerSpacer}></div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className={styles.profileContentGrid}>
        {/* Left Column: Identity & Balance & Settings */}
        <div className={styles.leftCol}>
          {/* Avatar & User Info Hero Card */}
          <div className={styles.userHeroCard}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarGlowRing}></div>
              <div className={styles.avatarCircle}>
                <span className={styles.avatarInitials}>VL</span>
              </div>
              <div className={styles.levelPill}>LVL {levelStr}</div>
            </div>

            <div className={styles.userInfo}>
              <div className={styles.nameRow}>
                <h3 className={styles.userName}>{user.name}</h3>
                <span className={styles.verifiedTag}>
                  <Check size={11} strokeWidth={3} /> VERIFIED
                </span>
              </div>
              <span className={styles.userTitle}>Elite Rewards Strategist</span>
              <span className={styles.userId}>Member ID: #VEL-84920</span>
            </div>
          </div>

          {/* Balance & Stats Overview */}
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Total XP</span>
              <span className={styles.statValue}>{user.currentXP.toLocaleString()}</span>
              <span className={styles.statSub}>Level Progress</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Wallet VEs</span>
              <span className={styles.statValueGold}>{user.walletVEs.toLocaleString()}</span>
              <span className={styles.statSub}>Ready to Redeem</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Rare Gems</span>
              <span className={styles.statValuePurple}>{user.walletGems} 💎</span>
              <span className={styles.statSub}>Rare Currency</span>
            </div>
          </div>

          {/* Experience Settings */}
          <div className={styles.sectionCard}>
            <h4 className={styles.sectionHeading}>
              <Settings size={16} color="#94a3b8" />
              <span>Experience Preferences</span>
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
                <span className={styles.settingDesc}>Enhanced 3D medallion reflections</span>
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
        </div>

        {/* Right Column: Trophy Room & Badges Showcase */}
        <div className={styles.rightCol}>
          <div className={styles.trophyShowcaseCard}>
            {/* Showcase Header & Mastery Progress */}
            <div className={styles.showcaseHeader}>
              <div className={styles.showcaseTitleBlock}>
                <div className={styles.headingBadgeRow}>
                  <Trophy size={18} color="#fbbf24" />
                  <h4 className={styles.showcaseTitle}>Trophies & Medallions</h4>
                </div>
                <p className={styles.showcaseSubtitle}>
                  Inspect your earned honors and active gameplay privileges.
                </p>
              </div>

              <div className={styles.masteryPill}>
                <span className={styles.masteryText}>
                  <strong>{unlockedCount} / {badges.length}</strong> Unlocked
                </span>
                <span className={styles.masteryPercent}>{masteryPercentage}%</span>
              </div>
            </div>

            {/* Mastery Progress Bar */}
            <div className={styles.masteryBarTrack}>
              <div 
                className={styles.masteryBarFill}
                style={{ width: `${masteryPercentage}%` }}
              >
                <span className={styles.masteryShimmer}></span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterTabsRow}>
              <button 
                className={`${styles.filterTab} ${filterTab === 'all' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('all')}
              >
                All ({badges.length})
              </button>
              <button 
                className={`${styles.filterTab} ${filterTab === 'unlocked' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('unlocked')}
              >
                Unlocked ({unlockedCount})
              </button>
              <button 
                className={`${styles.filterTab} ${filterTab === 'legendary' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('legendary')}
              >
                Legendary ({badges.filter(b => b.tier === 'legendary').length})
              </button>
              <button 
                className={`${styles.filterTab} ${filterTab === 'locked' ? styles.filterTabActive : ''}`}
                onClick={() => setFilterTab('locked')}
              >
                Locked ({badges.filter(b => !b.unlocked).length})
              </button>
            </div>

            {/* Badges 3D Grid */}
            <div className={styles.badgeGrid}>
              {filteredBadges.map((b) => {
                const Icon = b.icon;
                const isEquipped = equippedBadgeId === b.id;
                const tierStyle = tierColors[b.tier] || tierColors.legendary;

                return (
                  <div 
                    key={b.id} 
                    className={`${styles.badgeCard} ${b.unlocked ? styles.badgeCardUnlocked : styles.badgeCardLocked}`}
                    onClick={() => setInspectingBadge(b)}
                    role="button"
                    tabIndex={0}
                    title={`Click to inspect ${b.title}`}
                  >
                    {/* Top Tier Tag & Equipped Pin */}
                    <div className={styles.cardTopRow}>
                      <span 
                        className={styles.cardTierTag}
                        style={{
                          background: tierStyle.bg,
                          color: tierStyle.text,
                          borderColor: tierStyle.border
                        }}
                      >
                        {b.tier.toUpperCase()}
                      </span>
                      {isEquipped && (
                        <span className={styles.equippedPin} title="Showcased Badge">
                          ★ ACTIVE
                        </span>
                      )}
                    </div>

                    {/* 3D Medallion Crest */}
                    <div className={styles.medallionWrapper}>
                      <div 
                        className={`${styles.cardMedallion} ${b.unlocked ? styles.medallionGlow : ''}`}
                        style={{
                          borderColor: b.unlocked ? tierStyle.border : 'rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div className={styles.cardMedallionInner}>
                          <Icon 
                            size={26} 
                            color={b.unlocked ? b.color : '#64748b'} 
                            strokeWidth={2.2} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Badge Info */}
                    <div className={styles.cardInfo}>
                      <h5 className={styles.cardTitle}>{b.title}</h5>
                      <p className={styles.cardDesc}>{b.desc}</p>
                    </div>

                    {/* Card Footer Status */}
                    <div className={styles.cardFooter}>
                      {b.unlocked ? (
                        <span className={styles.unlockedLabel}>
                          <Check size={12} strokeWidth={3} /> Unlocked
                        </span>
                      ) : (
                        <div className={styles.lockedProgressCol}>
                          <div className={styles.lockedMeta}>
                            <span className={styles.lockedLabel}>
                              <Lock size={11} /> Locked
                            </span>
                            {b.progress && (
                              <span className={styles.lockedCount}>
                                {b.progress.current}/{b.progress.total}
                              </span>
                            )}
                          </div>
                          {b.progress && (
                            <div className={styles.lockedMiniTrack}>
                              <div 
                                className={styles.lockedMiniFill}
                                style={{ width: `${Math.round((b.progress.current / b.progress.total) * 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Footer with Sign Out */}
          <div className={styles.accountFooter}>
            <button 
              className={styles.logoutBtn}
              onClick={() => onLogout?.()}
              title="Sign Out"
              id="btn-profile-logout"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>

            <div className={styles.footerLinks}>
              <a href="#help" onClick={(e) => { e.preventDefault(); alert('VELOOP Support: support@veloop.io'); }}>Help & Support</a>
              <span className={styles.linkDot}>•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: All rights reserved © VELOOP Rewards.'); }}>Terms & Privacy</a>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Badge Detail Inspector Modal */}
      {inspectingBadge && (
        <BadgeModal 
          badge={inspectingBadge} 
          onClose={() => setInspectingBadge(null)}
          onEquip={(id) => {
            setEquippedBadgeId(id);
            setInspectingBadge(null);
          }}
          isEquipped={equippedBadgeId === inspectingBadge.id}
        />
      )}
    </div>
  );
}
