import React, { useState } from 'react';
import { Check, Lock, ChevronDown, ChevronUp, Sparkles, Trophy, Award } from 'lucide-react';
import { LEVEL_DATA } from '../../data/levelData';
import styles from './LevelRoadmap.module.css';

export default function LevelRoadmap({ currentLevel = 5, onSelectLevel }) {
  const [expandedLevel, setExpandedLevel] = useState(currentLevel);

  const toggleLevel = (lvlNum) => {
    setExpandedLevel(expandedLevel === lvlNum ? null : lvlNum);
  };

  return (
    <div className={styles.roadmapSection}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.sectionTitle}>LEVEL PROGRESSION ROADMAP</h2>
          <p className={styles.sectionSubtitle}>Track your ascension and preview upcoming rewards</p>
        </div>
      </div>

      <div className={styles.timelineList}>
        {LEVEL_DATA.map((lvl) => {
          const isCompleted = lvl.level < currentLevel;
          const isCurrent = lvl.level === currentLevel;
          const isNext = lvl.level === currentLevel + 1;
          const isLocked = lvl.level > currentLevel + 1;
          const isExpanded = expandedLevel === lvl.level;

          return (
            <div 
              key={lvl.level} 
              className={`${styles.timelineNode} ${isCurrent ? styles.nodeCurrent : ''} ${isCompleted ? styles.nodeCompleted : ''} ${isNext ? styles.nodeNext : ''}`}
            >
              {/* Connector Line */}
              <div className={styles.connectorLine}></div>

              {/* Status Marker Icon */}
              <div className={styles.markerWrapper} onClick={() => toggleLevel(lvl.level)}>
                {isCompleted && (
                  <div className={styles.markerCompleted}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                {isCurrent && (
                  <div className={styles.markerCurrent}>
                    <span className={styles.currentPing}></span>
                    <Award size={16} color="#161827" />
                  </div>
                )}
                {isNext && (
                  <div className={styles.markerNext}>
                    <Sparkles size={14} color="#8b5cf6" />
                  </div>
                )}
                {isLocked && (
                  <div className={styles.markerLocked}>
                    <Lock size={12} color="#64748b" />
                  </div>
                )}
              </div>

              {/* Level Info Card */}
              <div 
                className={styles.levelCard}
                onClick={() => toggleLevel(lvl.level)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.levelNameCol}>
                    <div className={styles.tagRow}>
                      <span className={styles.levelNumberTag}>LEVEL {lvl.levelNumber}</span>
                      {isCurrent && <span className={styles.youAreHereBadge}>YOU ARE HERE</span>}
                      {isNext && <span className={styles.nextGoalBadge}>NEXT GOAL</span>}
                      {isCompleted && <span className={styles.completedBadge}>✓ COMPLETED</span>}
                      {isLocked && <span className={styles.lockedBadge}>LOCKED</span>}
                    </div>
                    <h3 className={styles.levelTitle}>{lvl.name}</h3>
                  </div>

                  <div className={styles.headerRight}>
                    <span className={styles.rewardSummaryBadge}>
                      {lvl.reward?.label || 'Special Reward'}
                    </span>
                    <button className={styles.expandChevron} aria-label="Expand details">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className={styles.expandedDetails}>
                    <div className={styles.detailsRow}>
                      <span className={styles.reqXpLabel}>
                        Target XP: <strong>{lvl.requiredXP.toLocaleString()} XP</strong>
                      </span>
                    </div>

                    <div className={styles.perksBox}>
                      <span className={styles.perksHeader}>Unlocked Perks & Privileges:</span>
                      <ul className={styles.perksList}>
                        {lvl.perks.map((perk, pIdx) => (
                          <li key={pIdx} className={styles.perkItem}>
                            <Sparkles size={12} color="#fbbf24" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
