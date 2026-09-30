import React, { useState } from 'react';
import { 
  Check, Lock, ChevronDown, ChevronUp, Sparkles, Trophy, Award, 
  Crown, ArrowRight, Zap, Gift, ShieldCheck, Star
} from 'lucide-react';
import { LEVEL_DATA } from '../../data/levelData';
import LevelBadgeGraphic from '../CurrentLevel/LevelBadgeGraphic';
import styles from './LevelRoadmap.module.css';

export default function LevelRoadmap({ currentLevel = 5, onSelectLevel }) {
  const [expandedLevel, setExpandedLevel] = useState(currentLevel);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unlocked' | 'locked'

  const toggleLevel = (lvlNum) => {
    setExpandedLevel(expandedLevel === lvlNum ? null : lvlNum);
  };

  const filteredLevels = LEVEL_DATA.filter((lvl) => {
    if (filterMode === 'unlocked') return lvl.level <= currentLevel;
    if (filterMode === 'locked') return lvl.level > currentLevel;
    return true;
  });

  return (
    <div className={styles.roadmapSection} id="section-level-roadmap">
      {/* SECTION HEADER */}
      <div className={styles.headerRow}>
        <div className={styles.titleCol}>
          <div className={styles.preTitle}>
            <Award size={14} className={styles.preTitleIcon} />
            <span>PROGRESSION ARCHITECTURE</span>
          </div>
          <h2 className={styles.sectionTitle}>Level Progression Roadmap</h2>
          <p className={styles.sectionSubtitle}>
            Track your ascension through 8 prestige tiers. Unlock permanent reward multipliers, token cashout tiers, and VIP arena privileges.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterGroup}>
          <button 
            className={`${styles.filterBtn} ${filterMode === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All Tiers (8)
          </button>
          <button 
            className={`${styles.filterBtn} ${filterMode === 'unlocked' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilterMode('unlocked')}
          >
            Unlocked ({currentLevel})
          </button>
          <button 
            className={`${styles.filterBtn} ${filterMode === 'locked' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilterMode('locked')}
          >
            Locked ({8 - currentLevel})
          </button>
        </div>
      </div>

      {/* ROADMAP TIMELINE */}
      <div className={styles.timelineList}>
        {filteredLevels.map((lvl) => {
          const isCompleted = lvl.level < currentLevel;
          const isCurrent = lvl.level === currentLevel;
          const isNext = lvl.level === currentLevel + 1;
          const isLocked = lvl.level > currentLevel + 1;
          const isExpanded = expandedLevel === lvl.level;

          return (
            <div 
              key={lvl.level} 
              className={`${styles.timelineNode} ${isCurrent ? styles.nodeCurrent : ''} ${isCompleted ? styles.nodeCompleted : ''} ${isNext ? styles.nodeNext : ''} ${isLocked ? styles.nodeLocked : ''}`}
            >
              {/* Connector Line */}
              <div className={styles.connectorLine}></div>

              {/* Vector Level Badge Thumbnail Marker */}
              <div 
                className={styles.markerWrapper} 
                onClick={() => toggleLevel(lvl.level)}
                role="button"
                tabIndex={0}
                title={`Level ${lvl.levelNumber}: ${lvl.name}`}
              >
                <div className={styles.badgeThumbnailBox}>
                  <LevelBadgeGraphic 
                    level={lvl.level} 
                    size={46} 
                    animated={isCurrent} 
                    showTierBanner={false}
                    glow={isCurrent}
                  />
                  {isCurrent && <span className={styles.currentPulseRing} />}
                </div>

                {isCompleted && (
                  <div className={styles.subCheckBadge}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}

                {isLocked && (
                  <div className={styles.subLockBadge}>
                    <Lock size={9} />
                  </div>
                )}
              </div>

              {/* Level Info Card */}
              <div 
                className={`${styles.levelCard} ${isCurrent ? styles.cardActive : ''}`}
                onClick={() => toggleLevel(lvl.level)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.levelNameCol}>
                    <div className={styles.tagRow}>
                      <span className={styles.levelNumberTag}>LEVEL {lvl.levelNumber}</span>
                      
                      {isCurrent && (
                        <span className={styles.youAreHereBadge}>
                          <Sparkles size={11} />
                          <span>CURRENT TIER</span>
                        </span>
                      )}

                      {isNext && (
                        <span className={styles.nextGoalBadge}>
                          <Crown size={11} />
                          <span>NEXT MILESTONE</span>
                        </span>
                      )}

                      {isCompleted && (
                        <span className={styles.completedBadge}>
                          ✓ UNLOCKED
                        </span>
                      )}

                      {isLocked && (
                        <span className={styles.lockedBadge}>
                          <Lock size={10} />
                          <span>LOCKED</span>
                        </span>
                      )}
                    </div>

                    <h3 className={styles.levelTitle}>{lvl.name}</h3>
                  </div>

                  <div className={styles.headerRight}>
                    <span className={`${styles.rewardSummaryBadge} ${isCurrent ? styles.rewardBadgeCurrent : ''}`}>
                      <Gift size={13} className={styles.rewardIcon} />
                      <span>{lvl.reward?.label || 'Special Reward'}</span>
                    </span>

                    <button 
                      className={styles.expandChevron} 
                      aria-label="Expand level details"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLevel(lvl.level);
                      }}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Progress bar inside active level card */}
                {isCurrent && (
                  <div className={styles.activeTierProgressBox}>
                    <div className={styles.tierProgressLabels}>
                      <span className={styles.tierProgressText}>
                        Current Progress: <strong>6,420 / 8,000 XP</strong>
                      </span>
                      <span className={styles.tierProgressPct}>80.3%</span>
                    </div>
                    <div className={styles.tierProgressBar}>
                      <div className={styles.tierProgressFill} style={{ width: '80.3%' }} />
                    </div>
                  </div>
                )}

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className={styles.expandedDetails}>
                    <div className={styles.detailsRow}>
                      <div className={styles.xpInfoItem}>
                        <span className={styles.xpLabel}>Threshold Required</span>
                        <strong className={styles.xpValue}>{lvl.requiredXP.toLocaleString()} XP</strong>
                      </div>

                      <div className={styles.xpInfoItem}>
                        <span className={styles.xpLabel}>Tier Rank Status</span>
                        <strong className={styles.statusValue}>
                          {isCompleted ? 'Completed' : isCurrent ? 'Active Now' : isNext ? 'Upcoming Goal' : 'Locked Tier'}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.perksBox}>
                      <span className={styles.perksHeader}>
                        <ShieldCheck size={13} color="#fbbf24" />
                        <span>Tier Privileges & Rewards:</span>
                      </span>
                      <ul className={styles.perksList}>
                        {lvl.perks.map((perk, pIdx) => (
                          <li key={pIdx} className={styles.perkItem}>
                            <Star size={11} color="#fbbf24" className={styles.perkStar} />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isNext && (
                      <div className={styles.nextTierCallout}>
                        <span>Only <strong>1,580 XP</strong> needed to claim Level 06 rewards!</span>
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
  );
}
