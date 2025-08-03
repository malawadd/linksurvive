import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { createWalletClient, http, parseEther } from "viem";
import { opBNBTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// ERC-20 ABI for mint function
const ERC20_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;

export const distributeLeaderboardRewards = action({
  args: {
    season_id: v.string(),
    reward_pool: v.string(), // Total tokens to distribute
  },
  handler: async (ctx, args): Promise<any> => {
    const PRIVATE_KEY = process.env.MINT_PRIVATE_KEY;
    const TOKEN_CONTRACT_ADDRESS = process.env.REWARD_TOKEN_ADDRESS;
    
    if (!PRIVATE_KEY || !TOKEN_CONTRACT_ADDRESS) {
      throw new Error("Missing environment variables for reward distribution");
    }

    try {
      // Get top 10 players
      const topPlayers: any = await ctx.runQuery(api.leaderboard.getTopScores, { limit: 10 });
      
      if (topPlayers.length === 0) {
        return { success: false, message: "No players found" };
      }

      // Setup wallet client
      const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
      const walletClient = createWalletClient({
        account,
        chain: opBNBTestnet,
        transport: http("https://opbnb-testnet-rpc.bnbchain.org"),
      });

      // Define reward distribution (percentage of total pool)
      const rewardPercentages = [
        0.4,  // 1st place: 40%
        0.25, // 2nd place: 25%
        0.15, // 3rd place: 15%
        0.1,  // 4th place: 10%
        0.05, // 5th place: 5%
        0.02, // 6th place: 2%
        0.01, // 7th place: 1%
        0.01, // 8th place: 1%
        0.005, // 9th place: 0.5%
        0.005, // 10th place: 0.5%
      ];

      const totalRewardPool = parseEther(args.reward_pool);
      const results = [];

      for (let i = 0; i < Math.min(topPlayers.length, 10); i++) {
        const player: any = topPlayers[i];
        const rewardAmount = (totalRewardPool * BigInt(Math.floor(rewardPercentages[i] * 10000))) / BigInt(10000);
        
        try {
          // Record pending reward
          await ctx.runMutation(api.rewards.recordReward, {
            player_address: player.address,
            reward_amount: rewardAmount.toString(),
            season_id: args.season_id,
            rank: player.rank,
            status: "pending",
          });

          // Mint tokens to player
          const hash = await walletClient.writeContract({
            address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "mint",
            args: [player.address as `0x${string}`, rewardAmount],
          });

          // Update reward status to completed
          await ctx.runMutation(api.rewards.updateRewardStatus, {
            player_address: player.address,
            season_id: args.season_id,
            transaction_hash: hash,
            status: "completed",
          });

          results.push({
            player: player.address,
            rank: player.rank,
            reward: rewardAmount.toString(),
            hash,
            success: true,
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          
          // Update reward status to failed
          await ctx.runMutation(api.rewards.updateRewardStatus, {
            player_address: player.address,
            season_id: args.season_id,
            status: "failed",
          });

          results.push({
            player: player.address,
            rank: player.rank,
            error: errorMessage,
            success: false,
          });
        }
      }

      return { success: true, results };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  },
});

export const recordReward = mutation({
  args: {
    player_address: v.string(),
    reward_amount: v.string(),
    season_id: v.string(),
    rank: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reward_history", {
      player_address: args.player_address,
      reward_amount: args.reward_amount,
      season_id: args.season_id,
      rank: args.rank,
      distributed_at: Date.now(),
      status: args.status,
    });
  },
});

export const updateRewardStatus = mutation({
  args: {
    player_address: v.string(),
    season_id: v.string(),
    transaction_hash: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    const reward = await ctx.db
      .query("reward_history")
      .filter((q) => 
        q.and(
          q.eq(q.field("player_address"), args.player_address),
          q.eq(q.field("season_id"), args.season_id)
        )
      )
      .first();

    if (reward) {
      const updateData: any = { status: args.status };
      if (args.transaction_hash) {
        updateData.transaction_hash = args.transaction_hash;
      }
      await ctx.db.patch(reward._id, updateData);
    }
  },
});

export const getPlayerRewards = query({
  args: {
    player_address: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reward_history")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .order("desc")
      .collect();
  },
});

export const createSeason = mutation({
  args: {
    name: v.string(),
    duration_days: v.number(),
    reward_pool: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const endDate = now + (args.duration_days * 24 * 60 * 60 * 1000);

    // Deactivate any existing active season
    const activeSeason = await ctx.db
      .query("seasons")
      .withIndex("by_active", (q) => q.eq("is_active", true))
      .first();

    if (activeSeason) {
      await ctx.db.patch(activeSeason._id, { is_active: false });
    }

    return await ctx.db.insert("seasons", {
      name: args.name,
      start_date: now,
      end_date: endDate,
      reward_pool: args.reward_pool,
      is_active: true,
    });
  },
});

export const getCurrentSeason = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seasons")
      .withIndex("by_active", (q) => q.eq("is_active", true))
      .first();
  },
});