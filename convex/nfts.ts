import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Record a new NFT mint
export const recordMint = mutation({
  args: {
    player_address: v.string(),
    token_id: v.number(),
    transaction_hash: v.string(),
    contract_address: v.string(),
    faction: v.optional(v.string()),
    pet_id: v.optional(v.number()),
    gene: v.optional(v.string()),
    token_uri: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if this mint already exists
    const existingMint = await ctx.db
      .query("nft_mints")
      .withIndex("by_transaction", (q) => q.eq("transaction_hash", args.transaction_hash))
      .first();

    if (existingMint) {
      return { success: false, message: "Mint already recorded" };
    }

    // Record the mint
    await ctx.db.insert("nft_mints", {
      player_address: args.player_address,
      token_id: args.token_id,
      transaction_hash: args.transaction_hash,
      contract_address: args.contract_address,
      mint_timestamp: Date.now(),
      faction: args.faction,
      pet_id: args.pet_id,
      gene: args.gene,
      token_uri: args.token_uri,
      is_verified: false, // Will be verified later
    });

    return { success: true, message: "Mint recorded successfully" };
  },
});

// Get all NFTs owned by a player
export const getPlayerNFTs = query({
  args: {
    player_address: v.string(),
  },
  handler: async (ctx, args) => {
    const nfts = await ctx.db
      .query("nft_mints")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .order("desc")
      .collect();

    return nfts.map((nft) => ({
      tokenId: nft.token_id,
      transactionHash: nft.transaction_hash,
      contractAddress: nft.contract_address,
      mintTimestamp: nft.mint_timestamp,
      faction: nft.faction,
      petId: nft.pet_id,
      gene: nft.gene,
      tokenUri: nft.token_uri,
      isVerified: nft.is_verified,
    }));
  },
});

// Check if a player has any NFTs
export const hasPlayerMintedNFT = query({
  args: {
    player_address: v.string(),
  },
  handler: async (ctx, args) => {
    const nft = await ctx.db
      .query("nft_mints")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .first();

    return !!nft;
  },
});

// Get player's most recent NFT
export const getPlayerLatestNFT = query({
  args: {
    player_address: v.string(),
  },
  handler: async (ctx, args) => {
    const nft = await ctx.db
      .query("nft_mints")
      .withIndex("by_player", (q) => q.eq("player_address", args.player_address))
      .order("desc")
      .first();

    if (!nft) return null;

    return {
      tokenId: nft.token_id,
      transactionHash: nft.transaction_hash,
      contractAddress: nft.contract_address,
      mintTimestamp: nft.mint_timestamp,
      faction: nft.faction,
      petId: nft.pet_id,
      gene: nft.gene,
      tokenUri: nft.token_uri,
      isVerified: nft.is_verified,
    };
  },
});

// Update NFT verification status (for when we verify on-chain)
export const verifyNFT = mutation({
  args: {
    transaction_hash: v.string(),
    faction: v.optional(v.string()),
    pet_id: v.optional(v.number()),
    gene: v.optional(v.string()),
    token_uri: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const nft = await ctx.db
      .query("nft_mints")
      .withIndex("by_transaction", (q) => q.eq("transaction_hash", args.transaction_hash))
      .first();

    if (!nft) {
      return { success: false, message: "NFT not found" };
    }

    await ctx.db.patch(nft._id, {
      is_verified: true,
      faction: args.faction || nft.faction,
      pet_id: args.pet_id || nft.pet_id,
      gene: args.gene || nft.gene,
      token_uri: args.token_uri || nft.token_uri,
    });

    return { success: true, message: "NFT verified successfully" };
  },
});

// Get all recent mints (for admin purposes)
export const getRecentMints = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    const mints = await ctx.db
      .query("nft_mints")
      .withIndex("by_timestamp", (q) => q)
      .order("desc")
      .take(limit);

    return mints.map((mint) => ({
      playerAddress: mint.player_address,
      tokenId: mint.token_id,
      transactionHash: mint.transaction_hash,
      contractAddress: mint.contract_address,
      mintTimestamp: mint.mint_timestamp,
      faction: mint.faction,
      petId: mint.pet_id,
      isVerified: mint.is_verified,
    }));
  },
});