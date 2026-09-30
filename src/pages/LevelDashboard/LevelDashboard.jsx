import React, { useState, useEffect } from 'react';
import Header from '../../components/Common/Header';
import BottomNav from '../../components/Common/BottomNav';
import LevelHero from '../../components/LevelHero/LevelHero';
import CurrentLevelCard from '../../components/CurrentLevel/CurrentLevelCard';
import TodaysBoost from '../../components/TodaysBoost/TodaysBoost';
import EarnMoreGrid from '../../components/EarnMoreXP/EarnMoreGrid';
import NextLevelReward from '../../components/NextLevelReward/NextLevelReward';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';
import GameContainer from '../../components/PlayAndEarn/GameContainer';
import EarnAndLevelUpView from '../../components/EarnMoreXP/EarnAndLevelUpView';
import XPActivityView from '../../components/XPActivity/XPActivityView';
import LevelUpCelebration from '../../components/LevelUpModal/LevelUpCelebration';
import InfoModal from '../../components/Common/InfoModal';
import ProfileView from '../../components/Profile/ProfileView';
import LoginView from '../../components/Auth/LoginView';

import { useUserData } from '../../hooks/useUserData';
import { EARNING_ACTIVITIES } from '../../data/earningActivitiesData';
import styles from './LevelDashboard.module.css';

export default function LevelDashboard() {
  const {
    isLoggedIn,
    login,
    logout,
    user,
    history,
    addXP,
    recordGameResult,
    showLevelUpModal,
    setShowLevelUpModal,
    activeInfoModal,
    setActiveInfoModal,
    resetToDefault
  } = useUserData();

  // Active view: 'dashboard' | 'game' | 'earn' | 'activity' | 'profile'
  const [activeView, setActiveView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('rewards');

  // Scroll to top whenever active view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  // Navigation handlers
  const handleNavTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'earn') {
      setActiveView('earn');
    } else if (tabId === 'rewards' || tabId === 'home') {
      setActiveView('dashboard');
    } else if (tabId === 'wallet') {
      setActiveView('activity');
    } else if (tabId === 'profile') {
      setActiveView('profile');
    }
  };

  const handleSelectEarningActivity = (activity) => {
    if (activity.id === 'xp-catcher' || activity.id === 'mini-games') {
      setActiveView('game');
    } else {
      setActiveView('earn');
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={login} />;
  }

  return (
    <div className={styles.appContainer}>
      <Header 
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
        onOpenMenu={() => setActiveInfoModal('level')}
        onOpenNotifications={() => setActiveView('activity')}
        onOpenInfo={(type) => setActiveInfoModal(type)}
        currentLevel={user.currentLevel}
      />

      <main className={styles.mainWrapper}>
        {/* VIEW 1: MAIN DASHBOARD */}
        {activeView === 'dashboard' && (
          <div className={styles.dashboardLayout}>
            {/* Desktop Top Row: Left Hero & Level Card, Right Next Reward */}
            <div className={styles.topSectionGrid}>
              <div className={styles.heroColumn}>
                <LevelHero name={user.name} user={user} />
                <CurrentLevelCard 
                  user={user} 
                  onOpenInfo={(type) => setActiveInfoModal(type)}
                  onCelebrateClick={() => setShowLevelUpModal(true)}
                  onBoostXP={() => setActiveView('earn')}
                  onPlayGame={() => setActiveView('game')}
                  onViewRoadmap={() => {
                    const el = document.getElementById('section-level-roadmap');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              <div className={styles.sideRewardColumn}>
                <NextLevelReward 
                  user={user}
                  onViewRewards={() => setShowLevelUpModal(true)}
                  onOpenInfo={(type) => setActiveInfoModal(type)}
                />
                <TodaysBoost 
                  xpEarned={user.xpEarnedToday}
                  tasksDone={user.tasksDone}
                  totalTasks={user.totalTasks}
                  streakDays={user.streakDays}
                  onCardClick={(type) => {
                    if (type === 'xp') setActiveView('activity');
                    else setActiveView('earn');
                  }}
                />
              </div>
            </div>

            {/* Earn More Grid Section */}
            <section className={styles.earnMoreSection}>
              <EarnMoreGrid 
                activities={EARNING_ACTIVITIES}
                onSelectActivity={handleSelectEarningActivity}
                onOpenFullHub={() => setActiveView('earn')}
              />
            </section>

            {/* Two-Column Desktop Section: Mini-Game Banner & XP Activity */}
            <div className={styles.midSectionGrid}>
              <div className={styles.miniGameCard}>
                <div className={styles.miniGameHeader}>
                  <div>
                    <span className={styles.arcadeBadge}>PLAY & EARN ARCADE</span>
                    <h3 className={styles.arcadeTitle}>XP Catcher Challenge</h3>
                    <p className={styles.arcadeDesc}>
                      Test your reflexes in a fast 20-second challenge! Catch falling XP orbs & gold coins to boost your level progress.
                    </p>
                  </div>
                  <div className={styles.arcadeHighscore}>
                    <span>Best Score</span>
                    <strong>{user.bestGameScore} pts</strong>
                  </div>
                </div>

                <div className={styles.arcadeActionRow}>
                  <button 
                    className={styles.playGameBtn}
                    onClick={() => setActiveView('game')}
                    id="btn-play-arcade-dashboard"
                  >
                    <span>Play XP Catcher Now</span>
                    <span className={styles.playArrow}>→</span>
                  </button>
                  <span className={styles.playRewardHint}>Earn up to +50 XP & +25 VEs</span>
                </div>
              </div>

              {/* Quick XP Activity Preview */}
              <div className={styles.quickActivityCard}>
                <div className={styles.quickActivityHeader}>
                  <h3 className={styles.quickActivityTitle}>Recent Activity</h3>
                  <button 
                    className={styles.viewAllBtn}
                    onClick={() => setActiveView('activity')}
                  >
                    View All →
                  </button>
                </div>
                <div className={styles.quickList}>
                  {history.slice(0, 3).map((item) => (
                    <div key={item.id} className={styles.quickItem}>
                      <span className={styles.quickItemBadge}>+{item.xpAmount} XP</span>
                      <div className={styles.quickItemInfo}>
                        <span className={styles.quickItemTitle}>{item.badge}</span>
                        <span className={styles.quickItemTime}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Progression Roadmap Section */}
            <section className={styles.roadmapSection}>
              <LevelRoadmap currentLevel={user.currentLevel} />
            </section>
          </div>
        )}

        {/* VIEW 2: PLAYABLE MINI-GAME ("XP CATCHER") */}
        {activeView === 'game' && (
          <div className={`${styles.subViewContainer} ${styles.gameSubView}`}>
            <GameContainer 
              user={user}
              onRecordGameResult={recordGameResult}
              onBackToDashboard={() => setActiveView('dashboard')}
              onOpenInfo={(type) => setActiveInfoModal(type)}
            />
          </div>
        )}

        {/* VIEW 3: EARN & LEVEL UP DEDICATED HUB */}
        {activeView === 'earn' && (
          <div className={styles.subViewContainer}>
            <EarnAndLevelUpView 
              activities={EARNING_ACTIVITIES}
              onBack={() => setActiveView('dashboard')}
              onLaunchGame={() => setActiveView('game')}
              onAddXP={addXP}
              user={user}
            />
          </div>
        )}

        {/* VIEW 4: RECENT ACTIVITY TIMELINE */}
        {activeView === 'activity' && (
          <div className={styles.subViewContainer}>
            <XPActivityView 
              history={history}
              onBack={() => { setActiveView('dashboard'); setActiveTab('rewards'); }}
              xpToday={user.xpEarnedToday}
              vesToday={user.vesEarnedToday}
            />
          </div>
        )}

        {/* VIEW 5: USER PROFILE VIEW */}
        {activeView === 'profile' && (
          <div className={styles.subViewContainer}>
            <ProfileView 
              user={user}
              onBack={() => { setActiveView('dashboard'); setActiveTab('rewards'); }}
              onLogout={() => {
                logout();
                setActiveView('dashboard');
                setActiveTab('rewards');
              }}
              onResetData={() => {
                resetToDefault();
              }}
            />
          </div>
        )}
      </main>

      {/* Persistent Bottom Navigation for Mobile & Seamless Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={handleNavTab} />

      {/* Level-Up Celebration Modal */}
      {showLevelUpModal && (
        <LevelUpCelebration 
          levelNumber={user.currentLevel}
          onClaim={() => setShowLevelUpModal(false)}
        />
      )}

      {/* Level & Reward Info Tooltip Modal */}
      {activeInfoModal && (
        <InfoModal 
          type={activeInfoModal}
          onClose={() => setActiveInfoModal(null)}
        />
      )}
    </div>
  );
}
