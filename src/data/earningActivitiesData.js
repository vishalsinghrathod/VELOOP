export const EARNING_ACTIVITIES = [
  {
    id: 'watch-earn',
    title: 'Watch & Earn',
    subtitle: 'Watch ads and earn',
    xpReward: 50,
    veReward: 10,
    icon: 'Play',
    color: '#8b5cf6',
    category: 'Watch',
    ctaText: 'Watch Now',
    description: 'Watch short 15-second partner previews and earn direct XP into your progression pool.',
    availableDaily: 3,
    completedToday: 1,
    status: 'available'
  },
  {
    id: 'daily-missions',
    title: 'Daily Missions',
    subtitle: 'Complete daily tasks',
    xpReward: 30,
    veReward: 15,
    icon: 'CheckSquare',
    color: '#10b981',
    category: 'Tasks',
    ctaText: 'View Tasks',
    description: 'Complete your tailored daily tasks including app logins, check-ins, and reward browsing.',
    availableDaily: 8,
    completedToday: 4,
    status: 'in-progress'
  },
  {
    id: 'refer-earn',
    title: 'Refer & Earn',
    subtitle: 'Invite friends & earn',
    xpReward: 100,
    veReward: 50,
    icon: 'Users',
    color: '#f59e0b',
    category: 'Referrals',
    ctaText: 'Invite Friends',
    description: 'Share your exclusive link with friends. Earn +100 XP as soon as they reach Level 02!',
    availableDaily: 10,
    completedToday: 2,
    status: 'available'
  },
  {
    id: 'xp-catcher',
    title: 'XP Catcher',
    subtitle: 'Catch orbs & coins',
    xpReward: 10, // base, up to 50+
    veReward: 12,
    icon: 'Sparkles',
    color: '#ec4899',
    category: 'Games',
    ctaText: 'Play Challenge',
    description: 'Catch falling XP orbs, golden V-coins, and multipliers with the basket in 20 seconds!',
    availableDaily: 5,
    completedToday: 1,
    status: 'featured'
  },
  {
    id: 'mini-games',
    title: 'Mini Games',
    subtitle: 'Play games & win',
    xpReward: 75,
    veReward: 25,
    icon: 'Gamepad2',
    color: '#38bdf8',
    category: 'Games',
    ctaText: 'Browse Arcade',
    description: 'Explore upcoming skill-based challenges and compete for weekly leaderboard prizes.',
    availableDaily: 3,
    completedToday: 0,
    status: 'available'
  },
  {
    id: 'streak-bonus',
    title: 'Streak Bonus',
    subtitle: 'Maintain your streak',
    xpReward: 25,
    veReward: 20,
    icon: 'Flame',
    color: '#f97316',
    category: 'Streak',
    ctaText: 'Claim Streak',
    description: 'Maintain your 7-day streak to enjoy a 2X XP boost across all activities today.',
    availableDaily: 1,
    completedToday: 1,
    status: 'claimed'
  }
];

export const UPCOMING_FEATURES = [
  {
    title: 'Reward Hunt',
    description: 'Find hidden reward tokens distributed across partner apps and platforms.',
    xpReward: 120,
    status: 'Coming Soon'
  },
  {
    title: 'Quick Crypto & Fintech Quiz',
    description: 'Answer 3 fast trivia questions about financial literacy and earn instant tokens.',
    xpReward: 40,
    status: 'Concept'
  },
  {
    title: 'Weekly Boss Quest',
    description: 'Team up with friends or community members to reach a collective 100k XP milestone.',
    xpReward: 500,
    status: 'Coming Soon'
  }
];
