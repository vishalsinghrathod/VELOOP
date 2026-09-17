import React, { useState } from 'react';
import GameStart from './GameStart';
import GamePlay from './GamePlay';
import GameResult from './GameResult';

export default function GameContainer({ 
  user, 
  onRecordGameResult, 
  onBackToDashboard, 
  onOpenInfo,
  initialState = 'start'
}) {
  const [gameState, setGameState] = useState(initialState);
  const [lastResult, setLastResult] = useState({ score: 92, xpAwarded: 30, veAwarded: 12 });

  const handleStartGame = () => {
    setGameState('play');
  };

  const handleGameOver = (res) => {
    setLastResult(res);
    onRecordGameResult?.(res.score, res.xpAwarded, res.veAwarded);
    setGameState('result');
  };

  const handlePlayAgain = () => {
    setGameState('play');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VELOOP Rewards - XP Catcher Score',
        text: `I just scored ${lastResult.score} points on VELOOP XP Catcher! Come play & earn!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert(`Score copied! You scored ${lastResult.score} points! 🎉`);
    }
  };

  if (gameState === 'play') {
    return (
      <GamePlay 
        onGameOver={handleGameOver} 
        onQuit={() => setGameState('start')} 
        onOpenInfo={onOpenInfo}
      />
    );
  }

  if (gameState === 'result') {
    return (
      <GameResult 
        result={lastResult}
        user={user}
        onPlayAgain={handlePlayAgain}
        onBackToDashboard={onBackToDashboard}
        onShare={handleShare}
      />
    );
  }

  return (
    <GameStart 
      onStartGame={handleStartGame}
      onBack={onBackToDashboard}
      bestScore={user.bestGameScore}
      onOpenInfo={onOpenInfo}
    />
  );
}
