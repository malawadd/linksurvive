import { v } from "convex/values";
import { action } from "./_generated/server";

// Admin function to manually trigger reward distribution
export const manualRewardDistribution = action({
  args: {
    season_id: v.optional(v.string()),
    reward_pool: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const seasonId = args.season_id || `manual_${Date.now()}`;
    const rewardPool = args.reward_pool || "100";

    return await ctx.runAction("rewards:distributeLeaderboardRewards", {
      season_id: seasonId,
      reward_pool: rewardPool,
    });
  },
});

// Admin function to create a test season
export const createTestSeason = action({
  args: {},
  handler: async (ctx) => {
    return await ctx.runMutation("rewards:createSeason", {
      name: `Test Season ${Date.now()}`,
      duration_days: 7,
      reward_pool: "500",
    });
  },
});