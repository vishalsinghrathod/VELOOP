import React from 'react';
import { X, Sparkles, Shield, Check, Lock, Award } from 'lucide-react';
import styles from './BadgeModal.module.css';

export default function BadgeModal({ badge, onClose, onEquip, isEquipped }) {
  if (!badge) return null;

  const Icon = badge.icon;
  const isUnlocked = badge.unlocked;

  // Tier configuration for colors and badges
  const tierConfig = {
    legendary: {
      label: 'Legendary',
      gradient: 'var(--tier-legendary-grad)',
      border: 'var(--tier-legendary-border)',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      tagBg: 'rgba(245, 158, 11, 0.15)',
      tagColor: '#fbbf24'
    },
    mythic: {
      label: 'Mythic',
      gradient: 'var(--tier-mythic-grad)',
      border: 'var(--tier-mythic-border)',
      glowColor: 'rgba(239, 68, 68, 0.45)',
      tagBg: 'rgba(239, 68, 68, 0.15)',
      tagColor: '#f87171'
    },
    epic: {
      label: 'Epic',
      gradient: 'var(--tier-epic-grad)',
      border: 'var(--tier-epic-border)',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      tagBg: 'rgba(168, 85, 247, 0.15)',
      tagColor: '#c084fc'
    },
    rare: {
      label: 'Rare',
      gradient: 'var(--tier-rare-grad)',
      border: 'var(--tier-rare-border)',
      glowColor: 'rgba(6, 182, 212, 0.45)',
      tagBg: 'rgba(6, 182, 212, 0.15)',
      tagColor: '#38bdf8'
    },
    emerald: {
      label: 'Special',
      gradient: 'var(--tier-emerald-grad)',
      border: 'var(--tier-emerald-border)',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      tagBg: 'rgba(16, 185, 129, 0.15)',
      tagColor: '#34d399'
    }
  };

  const currentTier = tierConfig[badge.tier] || tierConfig.legendary;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* 3D Medallion Emblem */}
        <div className={styles.emblemWrapper}>
          <div 
            className={styles.emblemAura} 
            style={{ 
              background: isUnlocked ? currentTier.glowColor : 'rgba(255, 255, 255, 0.08)' 
            }}
          />

          <div 
            className={`${styles.medallionOuter} ${isUnlocked ? 'badge-shimmer-sheen animate-float' : ''}`}
            style={{
              background: isUnlocked 
                ? currentTier.gradient 
                : 'linear-gradient(145deg, #2b304d 0%, #151829 100%)',
              border: `2px solid ${isUnlocked ? currentTier.border : 'rgba(255, 255, 255, 0.15)'}`
            }}
          >
            <div className={styles.medallionInner}>
              <Icon 
                size={44} 
                color={isUnlocked ? badge.color : '#64748b'} 
                strokeWidth={2.2} 
              />
            </div>
          </div>
        </div>

        {/* Tier Ribbon */}
        <div 
          className={styles.tierTag}
          style={{
            background: currentTier.tagBg,
            borderColor: currentTier.border,
            color: currentTier.tagColor
          }}
        >
          <Sparkles size={11} />
          <span>{currentTier.label.toUpperCase()} INSIGNIA</span>
        </div>

        <h3 className={styles.badgeTitle}>{badge.title}</h3>
        <p className={styles.badgeDesc}>{badge.desc}</p>

        {/* Details & Attributes */}
        <div className={styles.detailsBox}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              <Shield size={14} /> Status
            </span>
            <span className={styles.detailValue} style={{ color: isUnlocked ? '#34d399' : '#94a3b8' }}>
              {isUnlocked ? '✓ Unlocked & Mastered' : '🔒 Locked Requirement'}
            </span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              <Award size={14} /> Rarity Level
            </span>
            <span className={styles.detailValue}>
              {badge.rarity || 'Top 5% of VeLoopers'}
            </span>
          </div>

          {badge.perk && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                <Sparkles size={14} color="#fbbf24" /> Active Privilege
              </span>
              <span className={styles.perkHighlight}>{badge.perk}</span>
            </div>
          )}

          {!isUnlocked && badge.progress && (
            <div style={{ marginTop: 4 }}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Unlock Progress</span>
                <span className={styles.detailValue}>{badge.progress.current} / {badge.progress.total} {badge.progress.unit}</span>
              </div>
              <div className={styles.progressBarTrack}>
                <div 
                  className={styles.progressBarFill}
                  style={{
                    width: `${Math.min(100, Math.round((badge.progress.current / badge.progress.total) * 100))}%`,
                    background: currentTier.gradient
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.modalActions}>
          <button className={styles.dismissBtn} onClick={onClose}>
            Back
          </button>
          {isUnlocked ? (
            <button 
              className={styles.equipBtn} 
              onClick={() => onEquip?.(badge.id)}
            >
              <Check size={16} />
              <span>{isEquipped ? 'Equipped as Showcase' : 'Showcase on Profile'}</span>
            </button>
          ) : (
            <button className={styles.dismissBtn} style={{ flex: 1 }} onClick={onClose}>
              <Lock size={15} style={{ marginRight: 6, display: 'inline', verticalAlign: 'middle' }} />
              Keep Playing to Unlock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
