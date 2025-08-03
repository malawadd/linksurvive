import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Run reward distribution every Sunday at midnight UTC
crons.weekly(
  "distribute weekly rewards",
  {
    dayOfWeek: "sunday",
    hourUTC: 0,
    minuteUTC: 0,
  },
  api.rewards.distributeLeaderboardRewards,
  {
    season_id: `season_${new Date().getFullYear()}_week_${Math.ceil(new Date().getDate() / 7)}`,
    reward_pool: "1000", // 1000 tokens per week
  }
);

// Create new season every month
crons.monthly(
  "create new season",
  {
    day: 1,
    hourUTC: 0,
    minuteUTC: 0,
  },
  api.rewards.createSeason,
  {
    name: `Season ${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    duration_days: 30,
    reward_pool: "5000", // 5000 tokens per month
  }
);

export default crons;