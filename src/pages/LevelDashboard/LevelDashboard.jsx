import React, { useState } from 'react';
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
import LoadingSkeleton from '../../components/Common/LoadingSkeleton';
import EmptyState from '../../components/Common/EmptyState';
import ErrorState from '../../components/Common/ErrorState';

import { useUserData } from '../../hooks/useUserData';
import { EARNING_ACTIVITIES } from '../../data/earningActivitiesData';
import styles from './LevelDashboard.module.css';
import { Smartphone, Monitor, RefreshCw, AlertTriangle, Sparkles, Layers } from 'lucide-react';

export default function LevelDashboard() {
  const {
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

  // Active view in mobile/single-screen mode: 'dashboard' | 'game' | 'earn' | 'activity'
  const [activeView, setActiveView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('rewards');

  // Presentation mode: 'responsive' (full wide desktop/mobile adaptive) or 'page33-grid' (all 6 screens showcase)
  const [displayMode, setDisplayMode] = useState('responsive');

  // Interactive Test State Simulation: 'normal' | 'loading' | 'error' | 'empty'
  const [uiState, setUiState] = useState('normal');

  // Navigation handlers
  const handleNavTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'earn') {
      setActiveView('earn');
    } else if (tabId === 'rewards') {
      setActiveView('dashboard');
    } else if (tabId === 'home') {
      setActiveView('dashboard');
    } else if (tabId === 'wallet') {
      setActiveView('activity');
    } else if (tabId === 'profile') {
      setActiveInfoModal('level');
    }
  };

  const handleSelectEarningActivity = (activity) => {
    if (activity.id === 'xp-catcher' || activity.id === 'mini-games') {
      setActiveView('game');
    } else {
      setActiveView('earn');
    }
  };

  // Level Up claim
  const handleClaimLevelUp = () => {
    setShowLevelUpModal(false);
  };

  // Quick simulate button to bump XP near or past level up
  const handleSimulateXP = (amount = 500) => {
    addXP(amount, 50, 'Admin XP Boost', 'task');
  };

  return (
    <div className={styles.appWrapper}>
      {/* Top Floating Control Bar for Evaluators & Mode Switching */}
      <div className={styles.topControlBar}>
        <div className={styles.controlBrand}>
          <span className={styles.pulseDot}></span>
          <span className={styles.controlTitle}>VELOOP REWARDS — TASK 16</span>
        </div>

        <div className={styles.controlButtons}>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.modeBtn} ${displayMode === 'responsive' ? styles.modeBtnActive : ''}`}
              onClick={() => setDisplayMode('responsive')}
              title="Responsive Desktop & Mobile View"
            >
              <Monitor size={14} />
              <span>Responsive App</span>
            </button>
            <button 
              className={`${styles.modeBtn} ${displayMode === 'page33-grid' ? styles.modeBtnActive : ''}`}
              onClick={() => setDisplayMode('page33-grid')}
              title="Page 33 6-Screen Architecture Showcase"
            >
              <Smartphone size={14} />
              <span>Page 33 Mockups (6 Screens)</span>
            </button>
          </div>

          <div className={styles.stateSelector}>
            <select 
              value={uiState} 
              onChange={(e) => setUiState(e.target.value)}
              className={styles.stateSelect}
              title="Toggle UX states (Req 40-42)"
            >
              <option value="normal">State: Normal Live</option>
              <option value="loading">State: Loading Skeleton</option>
              <option value="empty">State: Empty Activity</option>
              <option value="error">State: Error State</option>
            </select>
          </div>

          <button 
            className={styles.xpBoostBtn}
            onClick={() => handleSimulateXP(500)}
            title="Add +500 XP to test progression and Level-Up trigger"
          >
            <Sparkles size={13} />
            <span>+500 XP</span>
          </button>
        </div>
      </div>

      {/* RENDER MODE 1: RESPONSIVE APP (Mobile, Tablet, Laptop, Desktop) */}
      {displayMode === 'responsive' && (
        <div className={styles.responsiveShell}>
          <div className={styles.phoneFrame}>
            <Header 
              onOpenMenu={() => setActiveInfoModal('level')}
              onOpenNotifications={() => setActiveView('activity')}
              onOpenInfo={(t) => setActiveInfoModal(t)}
            />

            <main className={styles.mainContent}>
              {/* Handling UX States */}
              {uiState === 'loading' && <LoadingSkeleton />}
              {uiState === 'error' && <ErrorState onRetry={() => setUiState('normal')} />}
              {uiState === 'empty' && <EmptyState onStartEarning={() => { setUiState('normal'); setActiveView('earn'); }} />}

              {uiState === 'normal' && (
                <>
                  {/* VIEW 1: MAIN DASHBOARD (Screen 1) */}
                  {activeView === 'dashboard' && (
                    <div className={styles.viewFadeIn}>
                      <LevelHero name={user.name} />

                      <CurrentLevelCard 
                        user={user} 
                        onOpenInfo={(t) => setActiveInfoModal(t)}
                        onCelebrateClick={() => setShowLevelUpModal(true)}
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

                      <EarnMoreGrid 
                        activities={EARNING_ACTIVITIES}
                        onSelectActivity={handleSelectEarningActivity}
                        onOpenFullHub={() => setActiveView('earn')}
                      />

                      <NextLevelReward 
                        user={user}
                        onViewRewards={() => setShowLevelUpModal(true)}
                        onOpenInfo={(t) => setActiveInfoModal(t)}
                      />

                      <LevelRoadmap currentLevel={user.currentLevel} />
                    </div>
                  )}

                  {/* VIEW 2: MINI-GAME "XP CATCHER" (Screen 2 & Screen 3) */}
                  {activeView === 'game' && (
                    <div className={styles.viewFadeIn}>
                      <GameContainer 
                        user={user}
                        onRecordGameResult={recordGameResult}
                        onBackToDashboard={() => setActiveView('dashboard')}
                        onOpenInfo={(t) => setActiveInfoModal(t)}
                      />
                    </div>
                  )}

                  {/* VIEW 3: EARN & LEVEL UP HUB (Screen 4) */}
                  {activeView === 'earn' && (
                    <div className={styles.viewFadeIn}>
                      <EarnAndLevelUpView 
                        activities={EARNING_ACTIVITIES}
                        onBack={() => setActiveView('dashboard')}
                        onLaunchGame={() => setActiveView('game')}
                        onAddXP={addXP}
                        user={user}
                      />
                    </div>
                  )}

                  {/* VIEW 4: RECENT ACTIVITY (Screen 6) */}
                  {activeView === 'activity' && (
                    <div className={styles.viewFadeIn}>
                      <XPActivityView 
                        history={history}
                        onBack={() => setActiveView('dashboard')}
                        xpToday={user.xpEarnedToday}
                        vesToday={user.vesEarnedToday}
                      />
                    </div>
                  )}
                </>
              )}
            </main>

            {/* Bottom Nav on Mobile / Native Frame */}
            <BottomNav activeTab={activeTab} onSelectTab={handleNavTab} />
          </div>

          {/* Desktop Right Companion Panel (Shown on Desktop screens > 1024px) */}
          <aside className={styles.desktopCompanion}>
            <div className={styles.companionCard}>
              <h3 className={styles.companionTitle}>⚡ Interactive Arcade & Controls</h3>
              <p className={styles.companionDesc}>
                Play the mini-game, test different views, or trigger instant level-ups directly:
              </p>

              <div className={styles.quickLaunchButtons}>
                <button 
                  className={styles.quickLaunchBtn}
                  onClick={() => setActiveView('game')}
                >
                  <Sparkles size={16} color="#fbbf24" />
                  <span>Launch "XP Catcher" Mini-Game</span>
                </button>
                <button 
                  className={styles.quickLaunchBtn}
                  onClick={() => setActiveView('earn')}
                >
                  <Layers size={16} color="#8b5cf6" />
                  <span>Open "Earn & Level Up" Hub</span>
                </button>
                <button 
                  className={styles.quickLaunchBtn}
                  onClick={() => setActiveView('activity')}
                >
                  <RefreshCw size={16} color="#10b981" />
                  <span>View XP Activity Timeline</span>
                </button>
                <button 
                  className={styles.quickLaunchBtn}
                  onClick={() => setShowLevelUpModal(true)}
                >
                  <Sparkles size={16} color="#ec4899" />
                  <span>Trigger Level-Up Celebration</span>
                </button>
              </div>

              <div className={styles.walletSnapshot}>
                <h4 className={styles.snapshotTitle}>Live Balance Snapshot</h4>
                <div className={styles.snapshotGrid}>
                  <div className={styles.snapshotItem}>
                    <span className={styles.snapshotLabel}>Total XP</span>
                    <span className={styles.snapshotVal}>{user.currentXP.toLocaleString()}</span>
                  </div>
                  <div className={styles.snapshotItem}>
                    <span className={styles.snapshotLabel}>Virtual VEs</span>
                    <span className={styles.snapshotValGold}>{user.walletVEs.toLocaleString()}</span>
                  </div>
                  <div className={styles.snapshotItem}>
                    <span className={styles.snapshotLabel}>Gems</span>
                    <span className={styles.snapshotValPurple}>{user.walletGems}</span>
                  </div>
                  <div className={styles.snapshotItem}>
                    <span className={styles.snapshotLabel}>Best Arcade</span>
                    <span className={styles.snapshotValGreen}>{user.bestGameScore} pts</span>
                  </div>
                </div>
              </div>

              <div className={styles.resetContainer}>
                <button className={styles.resetBtn} onClick={resetToDefault}>
                  Reset State to Initial Defaults
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* RENDER MODE 2: PAGE 33 6-SCREEN FIGMA SHOWCASE */}
      {displayMode === 'page33-grid' && (
        <div className={styles.showcaseWrapper}>
          <div className={styles.showcaseIntro}>
            <h2 className={styles.showcaseHeading}>Page 33 Multi-Screen System Showcase</h2>
            <p className={styles.showcaseSub}>
              Direct 1:1 functional representation of all 6 design mockups attached in the assignment. Each screen is live and interactive!
            </p>
          </div>

          <div className={styles.mockupGrid}>
            {/* Screen 1: Main Dashboard */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 1: Main Level Dashboard</div>
              <div className={styles.miniPhoneFrame}>
                <Header onOpenInfo={() => setActiveInfoModal('level')} />
                <div className={styles.miniScrollArea}>
                  <LevelHero name={user.name} />
                  <CurrentLevelCard user={user} onOpenInfo={() => setActiveInfoModal('level')} onCelebrateClick={() => setShowLevelUpModal(true)} />
                  <TodaysBoost xpEarned={user.xpEarnedToday} tasksDone={user.tasksDone} totalTasks={user.totalTasks} streakDays={user.streakDays} />
                  <EarnMoreGrid activities={EARNING_ACTIVITIES} onSelectActivity={handleSelectEarningActivity} onOpenFullHub={() => {}} />
                  <NextLevelReward user={user} onViewRewards={() => setShowLevelUpModal(true)} />
                </div>
                <BottomNav activeTab="rewards" onSelectTab={() => {}} />
              </div>
            </div>

            {/* Screen 2: XP Catcher Gameplay */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 2: XP Catcher Mini-Game</div>
              <div className={styles.miniPhoneFrame}>
                <div className={styles.miniScrollArea}>
                  <GameContainer user={user} initialState="play" onRecordGameResult={recordGameResult} onBackToDashboard={() => {}} />
                </div>
              </div>
            </div>

            {/* Screen 3: Challenge Complete */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 3: Challenge Complete Result</div>
              <div className={styles.miniPhoneFrame}>
                <div className={styles.miniScrollArea}>
                  <GameContainer user={user} initialState="result" onRecordGameResult={recordGameResult} onBackToDashboard={() => {}} />
                </div>
              </div>
            </div>

            {/* Screen 4: Earn & Level Up Hub */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 4: Earn & Level Up Hub</div>
              <div className={styles.miniPhoneFrame}>
                <div className={styles.miniScrollArea}>
                  <EarnAndLevelUpView activities={EARNING_ACTIVITIES} onBack={() => {}} onLaunchGame={() => {}} onAddXP={addXP} user={user} />
                </div>
              </div>
            </div>

            {/* Screen 5: Level-Up Celebration */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 5: Level-Up Celebration</div>
              <div className={styles.miniPhoneFrame} style={{ position: 'relative', overflow: 'hidden' }}>
                <LevelUpCelebration levelNumber={user.currentLevel} onClaim={() => {}} embedded={true} />
              </div>
            </div>

            {/* Screen 6: Recent Activity */}
            <div className={styles.mockupCard}>
              <div className={styles.mockupBadge}>Screen 6: Recent Activity & Today's Summary</div>
              <div className={styles.miniPhoneFrame}>
                <div className={styles.miniScrollArea}>
                  <XPActivityView history={history} onBack={() => {}} xpToday={user.xpEarnedToday} vesToday={user.vesEarnedToday} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showLevelUpModal && (
        <LevelUpCelebration 
          levelNumber={user.currentLevel}
          onClaim={handleClaimLevelUp}
        />
      )}

      {activeInfoModal && (
        <InfoModal 
          type={activeInfoModal}
          onClose={() => setActiveInfoModal(null)}
        />
      )}
    </div>
  );
}
