import React from "react";
import { useQuery } from "convex/react";
import { useAccount } from "wagmi";
import { api } from "../../../../../../../convex/_generated/api";
import { 
  Wrapper, 
  LeaderboardTitle, 
  LeaderboardList, 
  LeaderboardItem, 
  PlayerStats,
  RankBadge,
  ScoreValue,
  PlayerInfo
} from "./styles";

export const Leaderboard: React.FC = () => {
  const { address } = useAccount();
  
  // Get top 20 players for full leaderboard view
  const topPlayers = useQuery(api.leaderboard.getTopScores, { limit: 20 });
  
  // Get current player's rank
  const playerRank = useQuery(
    api.leaderboard.getPlayerRank,
    address ? { player_address: address } : "skip"
  );

  const getEmojiForRank = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      case 4: return "🏅";
      case 5: return "🎖️";
      default: return "🔸";
    }
  };

  const getFactionColor = (faction: string) => {
    switch (faction.toLowerCase()) {
      case "prima": return "#4A90E2";
      case "zook": return "#7ED321";
      case "mecha": return "#D0021B";
      case "flavo": return "#F5A623";
      default: return "#9B9B9B";
    }
  };

  return (
    <Wrapper>
      <LeaderboardTitle>Global Leaderboard</LeaderboardTitle>
      
      {playerRank && address && (
        <PlayerStats>
          <h4>Your Current Rank</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <RankBadge rank={playerRank.rank}>#{playerRank.rank}</RankBadge>
            <div>
              <ScoreValue>{playerRank.score} points</ScoreValue>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {playerRank.waves} waves • {playerRank.kills} kills
              </div>
            </div>
          </div>
        </PlayerStats>
      )}

      <LeaderboardList>
        {topPlayers?.map((player) => (
          <LeaderboardItem 
            key={player.address} 
            isCurrentPlayer={address?.toLowerCase() === player.address.toLowerCase()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>{getEmojiForRank(player.rank)}</span>
              <RankBadge rank={player.rank}>#{player.rank}</RankBadge>
              <PlayerInfo>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  {player.address.slice(0, 6)}...{player.address.slice(-4)}
                </div>
                <div style={{ fontSize: "10px", color: getFactionColor(player.faction) }}>
                  {player.faction} • Token #{player.tokenId}
                </div>
              </PlayerInfo>
            </div>
            <div style={{ textAlign: "right" }}>
              <ScoreValue>{player.score}</ScoreValue>
              <div style={{ fontSize: "10px", opacity: 0.8 }}>
                {player.waves}W • {player.kills}K • {player.lived.toFixed(1)}M
              </div>
            </div>
          </LeaderboardItem>
        ))}
      </LeaderboardList>
      
      {!topPlayers && (
        <div style={{ color: "#fff", textAlign: "center", padding: "20px" }}>
          Loading leaderboard...
        </div>
      )}
    </Wrapper>
  );
};