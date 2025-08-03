import React from "react";
import { useQuery } from "convex/react";
import { useAccount } from "wagmi";
import { api } from "../../../../../../../convex/_generated/api";
import { Wrapper, RewardItem, RewardList, RewardTitle, RewardAmount, RewardStatus } from "./styles";

export const Rewards: React.FC = () => {
  const { address } = useAccount();
  
  // Get player's reward history
  const playerRewards = useQuery(
    api.rewards.getPlayerRewards, 
    address ? { player_address: address } : "skip"
  );
  
  // Get player's current rank
  const playerRank = useQuery(
    api.leaderboard.getPlayerRank,
    address ? { player_address: address } : "skip"
  );

  // Get current season info
  const currentSeason = useQuery(api.rewards.getCurrentSeason);

  if (!address) {
    return (
      <Wrapper>
        <RewardTitle>Connect Wallet to View Rewards</RewardTitle>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <RewardTitle>Your Rewards & Ranking</RewardTitle>
      
      {playerRank && (
        <div style={{ marginBottom: "20px", color: "#fff" }}>
          <h3>Current Rank: #{playerRank.rank}</h3>
          <p>Score: {playerRank.score}</p>
          <p>Waves: {playerRank.waves}</p>
          <p>Kills: {playerRank.kills}</p>
        </div>
      )}

      {currentSeason && (
        <div style={{ marginBottom: "20px", color: "#fff" }}>
          <h3>Current Season: {currentSeason.name}</h3>
          <p>Reward Pool: {currentSeason.reward_pool} tokens</p>
          <p>Ends: {new Date(currentSeason.end_date).toLocaleDateString()}</p>
        </div>
      )}

      <RewardTitle>Reward History</RewardTitle>
      <RewardList>
        {playerRewards?.length === 0 ? (
          <RewardItem>
            <span>No rewards yet. Keep playing to earn your first reward!</span>
          </RewardItem>
        ) : (
          playerRewards?.map((reward, index) => (
            <RewardItem key={index}>
              <div>
                <strong>Season: {reward.season_id}</strong>
                <br />
                Rank #{reward.rank}
              </div>
              <RewardAmount>
                {(parseFloat(reward.reward_amount) / 1e18).toFixed(2)} tokens
              </RewardAmount>
              <RewardStatus status={reward.status}>
                {reward.status}
              </RewardStatus>
            </RewardItem>
          ))
        )}
      </RewardList>
    </Wrapper>
  );
};