import React, { useState } from 'react';
import { ArrowLeft, Play, CheckSquare, Users, Sparkles, Gamepad2, Flame, ChevronRight, Zap, Check, Copy, ExternalLink, X } from 'lucide-react';
import styles from './EarnMoreXP.module.css';

const ICON_MAP = {
  Play,
  CheckSquare,
  Users,
  Sparkles,
  Gamepad2,
  Flame
};

export default function EarnAndLevelUpView({ 
  activities = [], 
  onBack, 
  onLaunchGame, 
  onAddXP,
  user
}) {
  const [activeModal, setActiveModal] = useState(null); // 'watch' | 'missions' | 'refer' | 'streak'
  const [watchProgress, setWatchProgress] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([false, true, false, true]);

  const handleCardClick = (activity) => {
    if (activity.id === 'xp-catcher' || activity.id === 'mini-games') {
      onLaunchGame?.();
    } else if (activity.id === 'watch-earn') {
      setActiveModal('watch');
      setWatchProgress(0);
      setIsWatching(false);
    } else if (activity.id === 'daily-missions') {
      setActiveModal('missions');
    } else if (activity.id === 'refer-earn') {
      setActiveModal('refer');
    } else if (activity.id === 'streak-bonus') {
      onAddXP?.(25, 10, 'Streak Daily Claim', 'streak');
      alert('🔥 Daily Streak Claimed! +25 XP and +10 VEs awarded!');
    }
  };

  const handleStartWatch = () => {
    setIsWatching(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setWatchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsWatching(false);
        onAddXP?.(50, 10, 'Watch & Earn Video Reward', 'watch');
        setTimeout(() => {
          setActiveModal(null);
        }, 800);
      }
    }, 600);
  };

  const handleToggleTask = (index, xp) => {
    const updated = [...completedTasks];
    updated[index] = !updated[index];
    setCompletedTasks(updated);
    if (updated[index]) {
      onAddXP?.(xp, 5, 'Daily Task Milestone', 'task');
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('https://veloop.io/ref/VeLooper99');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSimulateReferral = () => {
    onAddXP?.(100, 50, 'Friend Joined via Referral', 'referral');
    alert('🎉 Friend joined using your invite! +100 XP and +50 VEs awarded!');
    setActiveModal(null);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to Dashboard">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <div className={styles.headerTitles}>
          <h2 className={styles.title}>EARN & LEVEL UP</h2>
          <p className={styles.subtitle}>Complete activities. Earn XP. Climb levels. Get rewards.</p>
        </div>
        <div style={{ width: 38 }}></div>
      </div>

      {/* Activity List Cards matching Page 33 Screen 4 */}
      <div className={styles.activitiesList}>
        {activities.map(item => {
          const Icon = ICON_MAP[item.icon] || Sparkles;
          return (
            <div 
              key={item.id}
              className={styles.activityCard}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              id={`earn-card-${item.id}`}
            >
              <div 
                className={styles.iconBox}
                style={{ 
                  backgroundColor: `${item.color}20`,
                  borderColor: `${item.color}50`
                }}
              >
                <Icon size={22} color={item.color} />
              </div>

              <div className={styles.activityDetails}>
                <div className={styles.activityTitleRow}>
                  <h3 className={styles.activityTitle}>{item.title}</h3>
                  <span className={styles.xpBadge}>+{item.xpReward} XP</span>
                </div>
                <p className={styles.activityDesc}>{item.subtitle}</p>
              </div>

              <div className={styles.arrowBox}>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Banner at Bottom matching Screen 4 */}
      <div className={styles.motivationalBanner}>
        <div className={styles.bannerContent}>
          <span className={styles.bannerText}>Keep going! You're doing great!</span>
          <span className={styles.bannerEmoji}>⚡</span>
        </div>
        <div className={styles.bannerProgressLine}>
          <div className={styles.bannerBarFill} style={{ width: '80%' }}></div>
        </div>
      </div>

      {/* Modals for Interactive Simulator Actions */}
      {activeModal === 'watch' && (
        <div className={styles.modalOverlay} onClick={() => !isWatching && setActiveModal(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Watch & Earn</h3>
              {!isWatching && (
                <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>
                  <X size={18} />
                </button>
              )}
            </div>
            <p className={styles.modalDesc}>Watch a fast 3-second sponsor preview to claim <strong>+50 XP</strong> directly into your level meter.</p>
            
            <div className={styles.videoSimulator}>
              <div className={styles.videoScreen}>
                {isWatching ? (
                  <div className={styles.watchingAnim}>
                    <div className={styles.spinner}></div>
                    <span>Streaming Sponsor Content... {watchProgress}%</span>
                    <div className={styles.watchProgressBar}>
                      <div className={styles.watchProgressFill} style={{ width: `${watchProgress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.watchCover}>
                    <Play size={36} color="#fbbf24" fill="#fbbf24" />
                    <span>VELOOP Rewards Spotlight Preview</span>
                  </div>
                )}
              </div>
            </div>

            {!isWatching && (
              <button className={styles.primaryActionBtn} onClick={handleStartWatch}>
                <Play size={16} fill="#161827" />
                <span>{watchProgress === 100 ? 'Claim Again' : 'Start Watch (Earn +50 XP)'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {activeModal === 'missions' && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Daily Missions</h3>
              <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <p className={styles.modalDesc}>Complete priority tasks today to advance faster:</p>

            <div className={styles.missionsList}>
              {[
                { title: 'Check-in to VELOOP platform', xp: 10 },
                { title: 'Play 1 round of XP Catcher', xp: 15 },
                { title: 'Review next-level reward details', xp: 10 },
                { title: 'Share your referral code', xp: 20 }
              ].map((task, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.missionItem} ${completedTasks[idx] ? styles.missionDone : ''}`}
                  onClick={() => handleToggleTask(idx, task.xp)}
                >
                  <div className={styles.missionCheck}>
                    {completedTasks[idx] ? <Check size={14} color="#ffffff" /> : null}
                  </div>
                  <span className={styles.missionText}>{task.title}</span>
                  <span className={styles.missionXp}>+{task.xp} XP</span>
                </div>
              ))}
            </div>

            <button className={styles.primaryActionBtn} onClick={() => setActiveModal(null)}>
              Done
            </button>
          </div>
        </div>
      )}

      {activeModal === 'refer' && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Refer & Earn</h3>
              <button className={styles.closeBtn} onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <p className={styles.modalDesc}>Earn <strong>+100 XP & 50 VEs</strong> for each friend who signs up using your code.</p>

            <div className={styles.referralCodeBox}>
              <span className={styles.codeText}>https://veloop.io/ref/VeLooper99</span>
              <button className={styles.copyBtn} onClick={handleCopyReferral}>
                {copiedReferral ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button className={styles.simulateFriendBtn} onClick={handleSimulateReferral}>
              Simulate Friend Sign-Up (+100 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
