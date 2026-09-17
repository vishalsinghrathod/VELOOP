export const LEVEL_DATA = [
  {
    level: 1,
    levelNumber: "01",
    name: "Novice Looper",
    minXP: 0,
    requiredXP: 1000,
    status: "completed",
    reward: { type: "VEs", amount: 50, label: "+50 VEs" },
    perks: ["Basic Daily Tasks", "Standard Earning Rates"]
  },
  {
    level: 2,
    levelNumber: "02",
    name: "Rookie Explorer",
    minXP: 1000,
    requiredXP: 2200,
    status: "completed",
    reward: { type: "VEs", amount: 100, label: "+100 VEs" },
    perks: ["Unlock Watch & Earn", "Streak Bonus Tracking"]
  },
  {
    level: 3,
    levelNumber: "03",
    name: "Active Achiever",
    minXP: 2200,
    requiredXP: 3800,
    status: "completed",
    reward: { type: "VEs", amount: 150, label: "+150 VEs & 5 Gems" },
    perks: ["XP Catcher Arcade", "Custom Referral Link"]
  },
  {
    level: 4,
    levelNumber: "04",
    name: "Rising Champion",
    minXP: 3800,
    requiredXP: 5500,
    status: "completed",
    reward: { type: "Gems", amount: 10, label: "+10 Gems" },
    perks: ["2X Streak Multiplier", "Weekly Quest Access"]
  },
  {
    level: 5,
    levelNumber: "05",
    name: "Elite Strategist",
    minXP: 5500,
    requiredXP: 8000,
    currentXP: 6420,
    status: "current", // YOU ARE HERE
    reward: { type: "VEs & Gems", amount: 500, label: "+500 VEs & +25 Gems" },
    perks: [
      "Higher daily XP limit",
      "Access to new challenges",
      "Better reward opportunities"
    ]
  },
  {
    level: 6,
    levelNumber: "06",
    name: "Master VeLooper",
    minXP: 8000,
    requiredXP: 12000,
    status: "next", // NEXT GOAL
    reward: { type: "VEs", amount: 800, label: "+800 VEs & 2 VIP Spins" },
    perks: [
      "VIP Arcade Tournaments",
      "Instant Token Cashout Tier",
      "Exclusive Profile Glow"
    ]
  },
  {
    level: 7,
    levelNumber: "07",
    name: "Grand Voyager",
    minXP: 12000,
    requiredXP: 18000,
    status: "locked",
    reward: { type: "VEs", amount: 1500, label: "+1500 VEs & 50 Gems" },
    perks: ["Priority Reward Redemptions", "3X Weekend XP Drops"]
  },
  {
    level: 8,
    levelNumber: "08",
    name: "Legendary Ascendant",
    minXP: 18000,
    requiredXP: 26000,
    status: "locked",
    reward: { type: "VIP Vault", amount: 2500, label: "+2500 VEs & Golden Badge" },
    perks: ["Permanent 1.5X Multiplier", "Dedicated Support Agent"]
  }
];
