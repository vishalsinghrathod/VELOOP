import React, { useState } from 'react';
import { ArrowLeft, Filter, Users, CheckSquare, Gamepad2, Sparkles, Flame, Play, ChevronRight } from 'lucide-react';
import styles from './XPActivity.module.css';

const ICON_MAP = {
  Users,
  CheckSquare,
  Gamepad2,
  Sparkles,
  Flame,
  Play
};

export default function XPActivityView({ 
  history = [], 
  onBack, 
  xpToday = 215, 
  vesToday = 35 
}) {
  const [filter, setFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Activities' },
    { id: 'task', label: 'Tasks & Missions' },
    { id: 'game', label: 'Games & Arcade' },
    { id: 'referral', label: 'Referrals' },
    { id: 'streak', label: 'Streaks' }
  ];

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.type === filter);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <h2 className={styles.title}>RECENT ACTIVITY</h2>
        <div className={styles.filterWrapper}>
          <button 
            className={`${styles.filterBtn} ${filter !== 'all' ? styles.filterActive : ''}`}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            aria-label="Filter activities"
            id="btn-filter-activity"
          >
            <Filter size={18} color={filter !== 'all' ? '#fbbf24' : '#cbd5e1'} />
          </button>

          {showFilterMenu && (
            <div className={styles.filterDropdown}>
              {filterOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`${styles.dropdownItem} ${filter === opt.id ? styles.selectedItem : ''}`}
                  onClick={() => {
                    setFilter(opt.id);
                    setShowFilterMenu(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activities Feed matching Page 33 Screen 6 */}
      <div className={styles.feedList}>
        {filteredHistory.length === 0 ? (
          <div className={styles.emptyActivityBox}>
            <span>No activity found for this filter.</span>
          </div>
        ) : (
          filteredHistory.map(item => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <div key={item.id} className={styles.feedItem}>
                <div 
                  className={styles.iconCircle}
                  style={{ 
                    backgroundColor: `${item.color}20`,
                    borderColor: `${item.color}50`
                  }}
                >
                  <Icon size={18} color={item.color} />
                </div>

                <div className={styles.itemDetails}>
                  <span className={styles.itemBadgeTitle}>
                    {item.xpAmount > 0 && `+${item.xpAmount} XP`}
                    {item.xpAmount > 0 && item.veAmount > 0 && ' & '}
                    {item.veAmount > 0 && `+${item.veAmount} VEs`}
                  </span>
                  <span className={styles.itemName}>{item.badge}</span>
                  <span className={styles.itemTime}>{item.time}</span>
                </div>

                <div className={styles.arrowIcon}>
                  <ChevronRight size={16} color="#64748b" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Today's Summary Card matching Page 33 Screen 6 */}
      <div className={styles.summaryCard}>
        <span className={styles.summaryTitle}>Today's Summary</span>
        <div className={styles.summaryRow}>
          {/* XP Total */}
          <div className={styles.summaryStat}>
            <div className={styles.xpCircleBadge}>XP</div>
            <div className={styles.summaryStatTexts}>
              <span className={styles.statNumber}>{xpToday} XP</span>
              <span className={styles.statSub}>Total Earned</span>
            </div>
          </div>

          {/* VEs Total */}
          <div className={styles.summaryStat}>
            <div className={styles.veCircleBadge}>V</div>
            <div className={styles.summaryStatTexts}>
              <span className={styles.statNumber}>{vesToday} VEs</span>
              <span className={styles.statSub}>Total Earned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
