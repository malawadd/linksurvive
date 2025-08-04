import styled from "styled-components";

// Main Tournament List Styles
export const Wrapper = styled.div`
  padding: 20px;
  color: #fff;
  min-height: 500px;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #444;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#444' : 'transparent'};
  border: none;
  color: ${props => props.$active ? '#fff' : '#ccc'};
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #444;
    color: #fff;
  }
`;

export const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const LoadingState = styled.div`
  text-align: center;
  color: #ccc;
  padding: 40px;
  font-size: 16px;
`;

export const NoTournaments = styled.div`
  text-align: center;
  color: #888;
  padding: 40px;
  font-size: 16px;
`;

// Tournament Card Styles
export const Card = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #666;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardBody = styled.div`
  margin-bottom: 15px;
`;

export const CardFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const TournamentName = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 16px;
`;

export const TournamentStatus = styled.span<{ $color: string }>`
  background: ${props => props.$color};
  color: #000;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
`;

export const RewardPool = styled.div`
  color: #FFD700;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TournamentInfo = styled.div`
  color: #ccc;
  font-size: 12px;
`;

export const TimeInfo = styled.div`
  margin: 2px 0;
`;

export const Participants = styled.div`
  color: #ccc;
  font-size: 12px;
  margin-top: 5px;
`;

// Tournament Details Styles
export const DetailsWrapper = styled.div`
  padding: 20px;
  color: #fff;
  max-width: 1000px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #fff;
    color: #fff;
  }
`;

export const TournamentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
`;

export const TournamentTitle = styled.h1`
  margin: 0;
  color: #fff;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  background: ${props => {
    switch (props.$status) {
      case "upcoming": return "#FFA500";
      case "active": return "#00FF00";
      case "voting": return "#FFD700";
      case "finished": return "#888";
      default: return "#FFF";
    }
  }};
  color: #000;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #444;
`;

export const ContentArea = styled.div`
  min-height: 400px;
`;

export const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #444;
  }

  th {
    background: rgba(255, 255, 255, 0.1);
    font-weight: bold;
    color: #fff;
  }

  td {
    color: #ccc;
  }
`;

export const PlayerRow = styled.tr<{ $isWinner?: boolean }>`
  background: ${props => props.$isWinner ? 'rgba(255, 215, 0, 0.1)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  ${props => props.$isWinner && `
    td {
      color: #FFD700;
      font-weight: bold;
    }
  `}
`;

export const VotingSection = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    color: #fff;
  }

  p {
    color: #ccc;
    line-height: 1.5;
  }

  h4 {
    color: #fff;
    margin-bottom: 10px;
  }
`;

export const VoteButton = styled.button<{ $selected: boolean }>`
  background: ${props => props.$selected ? '#FFD700' : 'transparent'};
  border: 1px solid ${props => props.$selected ? '#FFD700' : '#666'};
  color: ${props => props.$selected ? '#000' : '#ccc'};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    border-color: #FFD700;
    color: ${props => props.$selected ? '#000' : '#FFD700'};
  }
`;