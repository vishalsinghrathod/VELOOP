import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Info, Timer, Zap, Sparkles } from 'lucide-react';
import styles from './Game.module.css';

export default function GamePlay({ onGameOver, onQuit, onOpenInfo }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [score, setScore] = useState(0);
  const [vesCollected, setVesCollected] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [timeLeft, setTimeLeft] = useState(20);

  // Internal mutable state for 60fps game loop
  const gameStateRef = useRef({
    score: 0,
    ves: 0,
    multiplier: 1,
    multiplierTimer: 0,
    basketX: 180,
    basketWidth: 74,
    basketHeight: 48,
    items: [],
    particles: [],
    floatingTexts: [],
    lastSpawnTime: 0,
    isGameOver: false,
    keysPressed: { left: false, right: false }
  });

  // Countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const finishGame = useCallback(() => {
    const st = gameStateRef.current;
    st.isGameOver = true;

    // Calculate awards based on score
    const baseXP = Math.max(15, Math.round(st.score * 0.35));
    const baseVEs = Math.max(5, st.ves + Math.round(st.score * 0.1));

    onGameOver({
      score: st.score,
      xpAwarded: baseXP,
      veAwarded: baseVEs
    });
  }, [onGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameStateRef.current.keysPressed.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameStateRef.current.keysPressed.right = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameStateRef.current.keysPressed.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameStateRef.current.keysPressed.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Pointer / Touch tracking
  const handlePointerMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const canvasX = ((clientX - rect.left) / rect.width) * canvasRef.current.width;
    const st = gameStateRef.current;
    st.basketX = Math.max(st.basketWidth / 2, Math.min(canvasRef.current.width - st.basketWidth / 2, canvasX));
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Setup canvas resolution
    const width = 380;
    const height = 480;
    canvas.width = width;
    canvas.height = height;
    gameStateRef.current.basketX = width / 2;

    const ITEM_TYPES = [
      { type: 'xp', radius: 15, color: '#8b5cf6', glow: '#a855f7', label: 'XP', pts: 10, ve: 0, weight: 45 },
      { type: 'vcoin', radius: 15, color: '#f59e0b', glow: '#fbbf24', label: 'V', pts: 8, ve: 5, weight: 30 },
      { type: 'gem', radius: 13, color: '#10b981', glow: '#34d399', label: '💎', pts: 25, ve: 2, weight: 15 },
      { type: 'mult', radius: 14, color: '#ec4899', glow: '#f43f5e', label: '2X', pts: 15, ve: 0, weight: 10 }
    ];

    const pickRandomItem = () => {
      const rand = Math.random() * 100;
      let cumulative = 0;
      for (const item of ITEM_TYPES) {
        cumulative += item.weight;
        if (rand <= cumulative) return item;
      }
      return ITEM_TYPES[0];
    };

    let lastTime = performance.now();

    const loop = (currentTime) => {
      if (gameStateRef.current.isGameOver) return;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const st = gameStateRef.current;

      // Handle keyboard basket movement
      const moveSpeed = 340 * deltaTime;
      if (st.keysPressed.left) {
        st.basketX = Math.max(st.basketWidth / 2, st.basketX - moveSpeed);
      }
      if (st.keysPressed.right) {
        st.basketX = Math.min(width - st.basketWidth / 2, st.basketX + moveSpeed);
      }

      // Handle multiplier countdown
      if (st.multiplierTimer > 0) {
        st.multiplierTimer -= deltaTime;
        if (st.multiplierTimer <= 0) {
          st.multiplier = 1;
          setMultiplier(1);
        }
      }

      // Spawn falling items
      if (currentTime - st.lastSpawnTime > 750) {
        st.lastSpawnTime = currentTime;
        const proto = pickRandomItem();
        st.items.push({
          ...proto,
          id: Math.random(),
          x: Math.random() * (width - 60) + 30,
          y: -20,
          speedY: Math.random() * 60 + 170, // pixels/sec
          rotation: 0,
          rotSpeed: (Math.random() - 0.5) * 4
        });
      }

      // Clear screen with deep arcade navy
      ctx.fillStyle = '#0f111e';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background grid & particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Items
      const basketTop = height - 56;
      const basketLeft = st.basketX - st.basketWidth / 2;
      const basketRight = st.basketX + st.basketWidth / 2;

      for (let i = st.items.length - 1; i >= 0; i--) {
        const item = st.items[i];
        item.y += item.speedY * deltaTime;
        item.rotation += item.rotSpeed * deltaTime;

        // Check collision with basket
        if (
          item.y + item.radius >= basketTop &&
          item.y - item.radius <= basketTop + 24 &&
          item.x >= basketLeft - 8 &&
          item.x <= basketRight + 8
        ) {
          // Item caught!
          const earnedPts = item.pts * st.multiplier;
          st.score += earnedPts;
          setScore(st.score);

          if (item.ve > 0) {
            st.ves += item.ve;
            setVesCollected(st.ves);
          }

          if (item.type === 'mult') {
            st.multiplier = 2;
            st.multiplierTimer = 5.0; // 5 seconds of 2X
            setMultiplier(2);
          }

          // Floating text effect
          st.floatingTexts.push({
            text: item.type === 'mult' ? '2X MULTIPLIER!' : item.ve > 0 ? `+${earnedPts} XP (+${item.ve} V)` : `+${earnedPts} XP`,
            x: item.x,
            y: basketTop - 10,
            opacity: 1.0,
            color: item.glow
          });

          // Sparkle burst particles
          for (let p = 0; p < 8; p++) {
            st.particles.push({
              x: item.x,
              y: basketTop,
              vx: (Math.random() - 0.5) * 160,
              vy: (Math.random() - 1) * 120,
              life: 0.45,
              maxLife: 0.45,
              color: item.glow
            });
          }

          st.items.splice(i, 1);
          continue;
        }

        // Off screen removal
        if (item.y - item.radius > height) {
          st.items.splice(i, 1);
          continue;
        }

        // Draw item with glowing effects
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        // Glow
        ctx.shadowColor = item.glow;
        ctx.shadowBlur = 12;

        if (item.type === 'vcoin') {
          // Golden Coin
          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#fef08a';
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 12px Montserrat, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('V', 0, 1);
        } else if (item.type === 'xp') {
          // Purple Orb
          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#7c3aed';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#c084fc';
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px Montserrat, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('XP', 0, 0);
        } else if (item.type === 'gem') {
          // Green Emerald Gem
          ctx.beginPath();
          ctx.moveTo(0, -item.radius);
          ctx.lineTo(item.radius, 0);
          ctx.lineTo(0, item.radius);
          ctx.lineTo(-item.radius, 0);
          ctx.closePath();
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#6ee7b7';
          ctx.stroke();
        } else {
          // 2X Multiplier Star Token
          ctx.beginPath();
          ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#db2777';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#fbcfe8';
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px Montserrat, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('2X', 0, 0);
        }

        ctx.restore();
      }

      // Update & Draw Particles
      for (let p = st.particles.length - 1; p >= 0; p--) {
        const pt = st.particles[p];
        pt.life -= deltaTime;
        if (pt.life <= 0) {
          st.particles.splice(p, 1);
          continue;
        }
        pt.x += pt.vx * deltaTime;
        pt.y += pt.vy * deltaTime;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5 * (pt.life / pt.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.fill();
      }

      // Update & Draw Floating Texts
      for (let t = st.floatingTexts.length - 1; t >= 0; t--) {
        const ft = st.floatingTexts[t];
        ft.y -= 45 * deltaTime;
        ft.opacity -= 1.2 * deltaTime;
        if (ft.opacity <= 0) {
          st.floatingTexts.splice(t, 1);
          continue;
        }
        ctx.save();
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 14px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.globalAlpha = ft.opacity;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 8;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      // Draw Basket at Bottom
      ctx.save();
      const bx = st.basketX;
      const by = basketTop;
      const bw = st.basketWidth;
      const bh = st.basketHeight;

      // Glow underneath basket
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 18;

      // Basket Rim
      ctx.beginPath();
      ctx.ellipse(bx, by, bw / 2, 10, 0, 0, Math.PI * 2);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#fbbf24';
      ctx.fillStyle = 'rgba(30, 25, 15, 0.7)';
      ctx.fill();
      ctx.stroke();

      // Basket Wire Mesh Body
      ctx.beginPath();
      ctx.moveTo(bx - bw / 2 + 5, by);
      ctx.quadraticCurveTo(bx - bw / 2 + 12, by + bh, bx, by + bh);
      ctx.quadraticCurveTo(bx + bw / 2 - 12, by + bh, bx + bw / 2 - 5, by);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Basket grid lines
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
      [-18, -6, 6, 18].forEach(offset => {
        ctx.beginPath();
        ctx.moveTo(bx + offset * 1.3, by + 4);
        ctx.lineTo(bx + offset * 0.8, by + bh);
        ctx.stroke();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [finishGame]);

  return (
    <div className={styles.gameContainer} ref={containerRef}>
      {/* Top Header */}
      <div className={styles.gameHeader}>
        <button className={styles.backBtn} onClick={onQuit} aria-label="Quit Game">
          <ArrowLeft size={20} color="#cbd5e1" />
        </button>
        <div className={styles.headerTitleGroup}>
          <h2 className={styles.gameTitle}>
            XP CATCHER
            <button 
              className={styles.infoIconBtn}
              onClick={() => onOpenInfo?.('rules')}
              title="Game Rules"
            >
              <Info size={15} color="#94a3b8" />
            </button>
          </h2>
          <span className={`${styles.timerBadge} ${timeLeft <= 5 ? styles.timerUrgent : ''}`}>
            <Timer size={13} /> {`00:${String(timeLeft).padStart(2, '0')}`}
          </span>
        </div>
        <div style={{ width: 36 }}></div>
      </div>

      <p className={styles.gameSubtitle}>
        Catch XP orbs & coins • Score high for better rewards!
      </p>

      {/* Interactive Play Canvas */}
      <div 
        className={styles.canvasWrapper}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        <canvas ref={canvasRef} className={styles.gameCanvas} />

        {/* Mobile touch guidance overlay */}
        <div className={styles.touchHint}>
          <span>← Drag or use Left / Right arrows to move basket →</span>
        </div>
      </div>

      {/* Bottom Live HUD matching Page 33 Screen 2 */}
      <div className={styles.bottomHudContainer}>
        <div className={styles.scoreDisplay}>
          <span className={styles.scoreHudLabel}>YOUR SCORE</span>
          <span className={styles.scoreHudValue}>{score}</span>
        </div>

        <div className={styles.hudPerks}>
          <div className={styles.hudPerkItem}>
            <span className={styles.hudVeIcon}>🪙</span>
            <span>+{vesCollected} VEs</span>
          </div>

          <div className={`${styles.hudPerkItem} ${multiplier > 1 ? styles.multiplierActive : ''}`}>
            <Zap size={14} color={multiplier > 1 ? '#ec4899' : '#94a3b8'} />
            <span>{multiplier}X Multiplier</span>
          </div>
        </div>
      </div>

      {/* Touch Button Controls for easier play on small screens */}
      <div className={styles.touchControlsRow}>
        <button 
          className={styles.touchControlBtn}
          onMouseDown={() => { gameStateRef.current.keysPressed.left = true; }}
          onMouseUp={() => { gameStateRef.current.keysPressed.left = false; }}
          onTouchStart={() => { gameStateRef.current.keysPressed.left = true; }}
          onTouchEnd={() => { gameStateRef.current.keysPressed.left = false; }}
        >
          ◄ LEFT
        </button>
        <button 
          className={styles.touchControlBtn}
          onMouseDown={() => { gameStateRef.current.keysPressed.right = true; }}
          onMouseUp={() => { gameStateRef.current.keysPressed.right = false; }}
          onTouchStart={() => { gameStateRef.current.keysPressed.right = true; }}
          onTouchEnd={() => { gameStateRef.current.keysPressed.right = false; }}
        >
          RIGHT ►
        </button>
      </div>
    </div>
  );
}
