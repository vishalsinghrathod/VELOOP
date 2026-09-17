import React, { useState } from 'react';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, UserCheck, Play } from 'lucide-react';
import styles from './Login.module.css';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('velooper@veloop.io');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('existing', email);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Brand Header */}
        <div className={styles.brandGroup}>
          <div className={styles.brandIconHexagon}>
            <span className={styles.brandLogoText}>VE</span>
          </div>
          <div className={styles.brandTitle}>
            <span className={styles.goldBrand}>VE</span>LOOP
            <span className={styles.rewardsTag}>REWARDS</span>
          </div>
        </div>

        <h1 className={styles.welcomeHeading}>Sign In to Your Account</h1>
        <p className={styles.welcomeSubtitle}>
          Track your level progression, play the arcade mini-game, and unlock exclusive rewards.
        </p>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email or Username</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} color="#94a3b8" />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className={styles.inputField}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} color="#94a3b8" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.inputField}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} id="btn-login-submit">
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Divider */}
        <div className={styles.dividerRow}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>QUICK DEMO ACCESS</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Quick 1-Click Access Buttons */}
        <div className={styles.demoButtonsGroup}>
          <button 
            type="button"
            className={styles.demoBtnLevel5}
            onClick={() => onLogin('existing', 'velooper@veloop.io', 'VeLooper')}
            id="btn-demo-level5"
          >
            <div className={styles.demoBtnIcon}>
              <Sparkles size={16} color="#fbbf24" />
            </div>
            <div className={styles.demoBtnTexts}>
              <strong className={styles.demoBtnTitle}>Continue as VeLooper (Level 05)</strong>
              <span className={styles.demoBtnSub}>Page 33 Default State • 6,420 XP</span>
            </div>
          </button>

          <button 
            type="button"
            className={styles.demoBtnLevel1}
            onClick={() => onLogin('new', 'newuser@veloop.io', 'New Looper')}
            id="btn-demo-level1"
          >
            <div className={styles.demoBtnIconGreen}>
              <Play size={14} color="#10b981" fill="#10b981" />
            </div>
            <div className={styles.demoBtnTexts}>
              <strong className={styles.demoBtnTitle}>Start as New User (Level 01)</strong>
              <span className={styles.demoBtnSub}>Fresh Start from Scratch • 0 XP</span>
            </div>
          </button>
        </div>

        {/* Security / Trust Footer */}
        <div className={styles.trustFooter}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Encrypted Session • VELOOP Rewards Platform</span>
        </div>
      </div>
    </div>
  );
}
