import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addOrUpdateScore = mutation({
  args: {
    player_address: v.string(),
    score: v.number(),
    waves_completed: v.number(),
    kills: v.number(),
    lived_minutes: v.number(),
    faction: v.optional(v.string()),
    token_id: v.optional(v.number()),
    difficulty: v.string(),
    planet: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if player already has a score entry
    const existingScore = await ctx.db
      .query("leaderboard_scores")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .first();

    if (existingScore) {
      // Only update if new score is higher
      if (args.score > existingScore.score) {
        await ctx.db.patch(existingScore._id, {
          score: args.score,
          waves_completed: args.waves_completed,
          kills: args.kills,
          lived_minutes: args.lived_minutes,
          faction: args.faction,
          token_id: args.token_id,
          difficulty: args.difficulty,
          planet: args.planet,
          updated_at: now,
        });
        return { updated: true, newRecord: true };
      }
      return { updated: false, newRecord: false };
    } else {
      // Create new entry
      await ctx.db.insert("leaderboard_scores", {
        player_address: args.player_address,
        score: args.score,
        waves_completed: args.waves_completed,
        kills: args.kills,
        lived_minutes: args.lived_minutes,
        faction: args.faction,
        token_id: args.token_id,
        difficulty: args.difficulty,
        planet: args.planet,
        updated_at: now,
      });
      return { updated: true, newRecord: true };
    }
  },
});

export const getTopScores = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    
    const scores = await ctx.db
      .query("leaderboard_scores")
      .withIndex("by_score")
      .order("desc")
      .take(limit);

    return scores.map((score, index) => ({
      rank: index + 1,
      address: score.player_address,
      score: score.score,
      waves: score.waves_completed,
      kills: score.kills,
      lived: score.lived_minutes,
      faction: score.faction || "Unknown",
      tokenId: score.token_id?.toString() || "0",
      difficulty: score.difficulty,
      planet: score.planet,
      updatedAt: score.updated_at,
    }));
  },
});

export const getPlayerRank = query({
  args: {
    player_address: v.string(),
  },
  handler: async (ctx, args) => {
    const playerScore = await ctx.db
      .query("leaderboard_scores")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .first();

    if (!playerScore) {
      return null;
    }

    // Count how many players have a higher score
    const higherScores = await ctx.db
      .query("leaderboard_scores")
      .withIndex("by_score")
      .filter((q) => q.gt(q.field("score"), playerScore.score))
      .collect();

    return {
      rank: higherScores.length + 1,
      score: playerScore.score,
      waves: playerScore.waves_completed,
      kills: playerScore.kills,
      lived: playerScore.lived_minutes,
      faction: playerScore.faction,
      tokenId: playerScore.token_id,
    };
  },
});