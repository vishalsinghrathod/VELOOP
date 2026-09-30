import React, { useState } from 'react';
import { 
  Info, Sparkles, Zap, Flame, Award, ShieldCheck, 
  Trophy, Gift, ArrowUpRight, Crown, Check, ChevronDown, 
  Star, Gem
} from 'lucide-react';
import LevelBadgeGraphic from './LevelBadgeGraphic';
import styles from './CurrentLevelCard.module.css';

export default function CurrentLevelCard({ 
  user, 
  onOpenInfo, 
  onCelebrateClick,
  onBoostXP,
  onViewRoadmap
}) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'upcoming'
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const currentXP = user?.currentXP || 6420;
  const maxXP = user?.levelMaxXP || 8000;
  const minXP = user?.levelMinXP || 5500;
  const currentLevel = user?.currentLevel || 5;
  const nextLevel = user?.nextLevel || 6;
  const streakDays = user?.streakDays || 7;

  const currentLevelStr = String(currentLevel).padStart(2, '0');
  const nextLevelStr = String(nextLevel).padStart(2, '0');
  
  // Progression metrics
  const xpNeeded = Math.max(0, maxXP - currentXP);
  const percentage = Math.min(100, Math.max(0, Math.round((currentXP / maxXP) * 100)));

  // Tier bracket calculation
  const tierTotalSpan = maxXP - minXP;

  // Milestone checkpoints
  const milestones = [
    {
      id: 'm1',
      percentage: 25,
      xpTarget: Math.round(minXP + tierTotalSpan * 0.25),
      label: '+50 VEs',
      title: 'Tier 1 Drop',
      desc: '+50 VEs rewarded at 25% progression.',
      icon: Zap,
      unlocked: currentXP >= (minXP + tierTotalSpan * 0.25)
    },
    {
      id: 'm2',
      percentage: 50,
      xpTarget: Math.round(minXP + tierTotalSpan * 0.50),
      label: '5 Gems',
      title: 'Midway Gem Cache',
      desc: 'Unlock 5 bonus Gems halfway through Level 05.',
      icon: Gem,
      unlocked: currentXP >= (minXP + tierTotalSpan * 0.50)
    },
    {
      id: 'm3',
      percentage: 75,
      xpTarget: Math.round(minXP + tierTotalSpan * 0.75),
      label: 'VIP Crate',
      title: 'Arcade Crate',
      desc: 'Temporary 2x score multiplier in XP Catcher.',
      icon: Gift,
      unlocked: currentXP >= (minXP + tierTotalSpan * 0.75)
    },
    {
      id: 'm4',
      percentage: 100,
      xpTarget: maxXP,
      label: `Lvl ${nextLevelStr}`,
      title: 'Level 06 Master Promotion',
      desc: 'Ascend to Master VeLooper with +800 VEs & Golden Mantle.',
      icon: Crown,
      unlocked: currentXP >= maxXP
    }
  ];

  // Active privileges vs Upcoming
  const currentPrivileges = [
    { icon: Zap, label: 'Daily XP Cap', value: '+500 XP / day' },
    { icon: Flame, label: 'Streak Bonus', value: '1.15x Active' },
    { icon: ShieldCheck, label: 'VIP Challenges', value: 'Tier 5 Unlocked' }
  ];

  const upcomingPrivileges = [
    { icon: Crown, label: 'Master Mantle', value: 'Golden Profile' },
    { icon: Gift, label: 'Level Bounty', value: '+800 VEs & 2 Spins' },
    { icon: Trophy, label: 'Arcade Tourneys', value: 'VIP Prize Pools' }
  ];

  return (
    <div className={styles.cardContainer} id="section-current-level">
      {/* Decorative ambient gradient backdrop */}
      <div className={styles.backdropGlow} />

      {/* TOP HEADER: Status Badges & Quick Info */}
      <div className={styles.topStatusRow}>
        <div className={styles.statusPillsGroup}>
          <span className={styles.tierPill}>
            <Award size={13} className={styles.pillIconGold} />
            <span>TIER 05 • ELITE</span>
          </span>

          <span className={styles.streakPill}>
            <Flame size={13} className={styles.pillIconFire} />
            <span>{streakDays}D STREAK (1.15x)</span>
          </span>

          <span className={styles.rankingPill}>
            <Star size={12} className={styles.pillIconStar} />
            <span>TOP 3%</span>
          </span>
        </div>

        <button 
          className={styles.infoButton}
          onClick={() => onOpenInfo?.('level')}
          title="Level Progression Guide & Rules"
          aria-label="Level information"
        >
          <Info size={14} />
          <span>Rules</span>
        </button>
      </div>

      {/* CORE SHOWCASE: Badge Emblem + Prestige Title */}
      <div className={styles.coreShowcase}>
        {/* Left: 3D Vector Emblem */}
        <div 
          className={styles.emblemWrapper} 
          onClick={onCelebrateClick} 
          role="button" 
          tabIndex={0} 
          title="Click to view Level Celebration & Perks"
        >
          <LevelBadgeGraphic 
            level={currentLevel} 
            size={98} 
            animated={true} 
            showTierBanner={true}
          />
        </div>

        {/* Right: Title and Narrative */}
        <div className={styles.infoCol}>
          <div className={styles.levelBreadcrumb}>
            <span className={styles.levelTag}>LEVEL {currentLevelStr}</span>
            <span className={styles.breadcrumbArrow}>›</span>
            <span className={styles.nextTag}>TARGET LEVEL {nextLevelStr}</span>
          </div>

          <div className={styles.titleWithShield}>
            <h2 className={styles.mainTitle}>Elite Strategist</h2>
            <div className={styles.verifiedShield} title="Verified Tier Status">
              <ShieldCheck size={18} color="#fbbf24" />
            </div>
          </div>

          <p className={styles.descriptionText}>
            Only <strong>{xpNeeded.toLocaleString()} XP</strong> remaining to ascend to <strong>Master VeLooper</strong>.
          </p>
        </div>
      </div>

      {/* FULL-WIDTH METRICS BANNER */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Accumulated XP</span>
          <span className={styles.metricValueGold}>
            {currentXP.toLocaleString()} <span className={styles.metricUnit}>XP</span>
          </span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>To Reach Level {nextLevelStr}</span>
          <span className={styles.metricValue}>
            {xpNeeded.toLocaleString()} <span className={styles.metricUnit}>XP</span>
          </span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Goal Progress</span>
          <span className={styles.metricValueHighlight}>{percentage}%</span>
        </div>
      </div>

      {/* PROGRESSION ENGINE: Safe-Padded Milestone Track */}
      <div className={styles.milestoneSection}>
        <div className={styles.progressHeader}>
          <div className={styles.progressTitleGroup}>
            <Zap size={14} className={styles.zapIcon} />
            <span className={styles.progressTitle}>Level {currentLevelStr} Ascension Path</span>
          </div>

          <div className={styles.xpBreakdown}>
            <span className={styles.xpFraction}>
              <strong>{currentXP.toLocaleString()}</strong> / {maxXP.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Milestone Progress Bar with Inset Protected Nodes */}
        <div className={styles.progressTrackWrapper}>
          <div className={styles.trackBackground}>
            <div 
              className={styles.trackFill} 
              style={{ width: `${percentage}%` }}
            >
              <div className={styles.shimmerSweep} />
              <div className={styles.glowHead} />
            </div>
          </div>

          {/* Segmented Milestone Nodes (bounded inside track margins) */}
          <div className={styles.milestonesRow}>
            {milestones.map((m) => {
              const MilestoneIcon = m.icon;
              const isPassed = m.unlocked;
              const isCurrentTarget = !isPassed && (currentXP < m.xpTarget);
              const isSelected = selectedMilestone?.id === m.id;

              return (
                <div 
                  key={m.id} 
                  className={`${styles.milestoneNode} ${isPassed ? styles.nodeUnlocked : ''} ${isCurrentTarget ? styles.nodeTarget : ''} ${isSelected ? styles.nodeSelected : ''}`}
                  style={{ left: `${m.percentage}%` }}
                  onClick={() => setSelectedMilestone(isSelected ? null : m)}
                  title={`${m.title} (${m.xpTarget.toLocaleString()} XP)`}
                >
                  <div className={styles.milestonePin}>
                    {isPassed ? (
                      <Check size={10} strokeWidth={3} className={styles.nodeCheck} />
                    ) : (
                      <MilestoneIcon size={11} className={styles.nodeIcon} />
                    )}
                  </div>
                  <span className={styles.milestoneLabel}>{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Milestone Detail Popover / Hint */}
        {selectedMilestone ? (
          <div className={styles.milestoneDetailBox}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleRow}>
                <selectedMilestone.icon size={14} color="#fbbf24" />
                <strong>{selectedMilestone.title} ({selectedMilestone.xpTarget.toLocaleString()} XP)</strong>
              </div>
              <span className={selectedMilestone.unlocked ? styles.statusBadgeUnlocked : styles.statusBadgePending}>
                {selectedMilestone.unlocked ? '✓ Unlocked' : `${Math.max(0, selectedMilestone.xpTarget - currentXP).toLocaleString()} XP to go`}
              </span>
            </div>
            <p className={styles.detailText}>{selectedMilestone.desc}</p>
          </div>
        ) : (
          <div className={styles.progressFooterHint}>
            <span>⚡ Next Goal: <strong>Midway Gem Cache (5 Gems)</strong> in <strong>{Math.max(0, 6750 - currentXP).toLocaleString()} XP</strong></span>
            <button 
              className={styles.hintInfoBtn} 
              onClick={() => setSelectedMilestone(milestones[1])}
            >
              Details →
            </button>
          </div>
        )}
      </div>

      {/* COMPACT & ELEGANT TIER PRIVILEGES STRIP */}
      <div className={styles.privilegesContainer}>
        <div className={styles.privilegeHeaderRow}>
          <div className={styles.privilegeTabs}>
            <button 
              className={`${styles.privTabBtn} ${activeTab === 'active' ? styles.privTabActive : ''}`}
              onClick={() => setActiveTab('active')}
            >
              <ShieldCheck size={13} />
              <span>Level 05 Perks</span>
            </button>
            <button 
              className={`${styles.privTabBtn} ${activeTab === 'upcoming' ? styles.privTabActive : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <Crown size={13} />
              <span>Level 06 Unlocks</span>
            </button>
          </div>
          <span className={styles.tierIndicatorTag}>
            {activeTab === 'active' ? 'Active Now' : 'Upcoming'}
          </span>
        </div>

        {/* 3 Sleek Privilege Chips */}
        <div className={styles.privilegeStrip}>
          {(activeTab === 'active' ? currentPrivileges : upcomingPrivileges).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={styles.privilegeChip}>
                <div className={styles.chipIconBox}>
                  <Icon size={13} color={activeTab === 'active' ? '#fbbf24' : '#c084fc'} />
                </div>
                <div className={styles.chipContent}>
                  <span className={styles.chipLabel}>{item.label}</span>
                  <span className={styles.chipValue}>{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK ACTION BAR */}
      <div className={styles.actionsBar}>
        <button 
          className={styles.boostXpBtn}
          onClick={onBoostXP}
          id="btn-level-boost-xp"
        >
          <Zap size={15} className={styles.btnZapIcon} />
          <span>Boost XP & Earn</span>
          <ArrowUpRight size={14} />
        </button>

        <button 
          className={styles.celebrateBtn}
          onClick={onCelebrateClick}
          id="btn-level-celebrate-perks"
        >
          <Sparkles size={14} />
          <span>Level Perks Modal</span>
        </button>

        {onViewRoadmap && (
          <button 
            className={styles.roadmapBtn}
            onClick={onViewRoadmap}
            id="btn-level-view-roadmap"
          >
            <span>Roadmap</span>
            <ChevronDown size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
