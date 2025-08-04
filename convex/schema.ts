import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leaderboard_scores: defineTable({
    player_address: v.string(),
    player_name: v.optional(v.string()),
    score: v.number(),
    waves_completed: v.number(),
    kills: v.number(),
    lived_minutes: v.number(),
    faction: v.optional(v.string()),
    token_id: v.optional(v.number()),
    difficulty: v.string(),
    planet: v.string(),
    updated_at: v.number(), // timestamp
  })
    .index("by_score", ["score"])
    .index("by_player", ["player_address"])
    .index("by_updated_at", ["updated_at"]),

  nft_mints: defineTable({
    player_address: v.string(),
    token_id: v.number(),
    transaction_hash: v.string(),
    contract_address: v.string(),
    mint_timestamp: v.number(),
    faction: v.optional(v.string()),
    pet_id: v.optional(v.number()),
    gene: v.optional(v.string()),
    token_uri: v.optional(v.string()),
    is_verified: v.boolean(), // Whether the mint has been verified on-chain
  })
    .index("by_player", ["player_address"])
    .index("by_token_id", ["token_id"])
    .index("by_transaction", ["transaction_hash"])
    .index("by_contract", ["contract_address"])
    .index("by_timestamp", ["mint_timestamp"]),

  reward_history: defineTable({
    player_address: v.string(),
    reward_amount: v.string(), // Using string for big numbers
    transaction_hash: v.optional(v.string()),
    season_id: v.string(),
    rank: v.number(),
    distributed_at: v.number(), // timestamp
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  })
    .index("by_player", ["player_address"])
    .index("by_season", ["season_id"])
    .index("by_status", ["status"]),

  seasons: defineTable({
    name: v.string(),
    start_date: v.number(), // timestamp
    end_date: v.number(), // timestamp
    reward_pool: v.string(), // Total reward pool in tokens
    is_active: v.boolean(),
  })
    .index("by_active", ["is_active"])
    .index("by_dates", ["start_date", "end_date"]),
});