import React from 'react';
import { Play, CheckSquare, Users, Sparkles, Gamepad2, Flame, ArrowRight } from 'lucide-react';
import styles from './EarnMoreGrid.module.css';

const ICON_MAP = {
  Play,
  CheckSquare,
  Users,
  Sparkles,
  Gamepad2,
  Flame
};

export default function EarnMoreGrid({ activities = [], onSelectActivity, onOpenFullHub }) {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.headerRow}>
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>EARN MORE</h2>
          <p className={styles.subtitle}>Explore fun activities and earn exciting rewards.</p>
        </div>
        <button 
          className={styles.hubLinkBtn}
          onClick={onOpenFullHub}
          aria-label="View all earning opportunities"
          title="Open Earn & Level Up Hub"
        >
          <ArrowRight size={18} color="#cbd5e1" />
        </button>
      </div>

      <div className={styles.grid}>
        {activities.map(item => {
          const Icon = ICON_MAP[item.icon] || Sparkles;
          return (
            <button
              key={item.id}
              className={styles.gridItem}
              onClick={() => onSelectActivity(item)}
              id={`btn-earn-${item.id}`}
            >
              <div 
                className={styles.iconCircle}
                style={{ 
                  backgroundColor: `${item.color}20`,
                  borderColor: `${item.color}50`
                }}
              >
                <Icon size={20} color={item.color} />
              </div>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.rewardPill}>+{item.xpReward} XP</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
