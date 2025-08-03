import styled from "styled-components";
import { INTERFACE_MOBILE_BREAKPOINT } from "@const/interface";
import { InterfaceFont, InterfaceTextColor } from "@type/interface";

export const Wrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

export const LeaderboardTitle = styled.h2`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 20px;
  color: ${InterfaceTextColor.SUCCESS};
  text-align: center;
`;

export const PlayerStats = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${InterfaceTextColor.SUCCESS};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  
  h4 {
    font-family: ${InterfaceFont.PIXEL_LABEL};
    margin: 0 0 10px 0;
    color: ${InterfaceTextColor.SUCCESS};
  }
`;

export const LeaderboardList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    max-height: 300px;
  }
`;

export const LeaderboardItem = styled.div<{ isCurrentPlayer?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: ${InterfaceFont.PIXEL_TEXT};
  background: ${props => props.isCurrentPlayer ? 'rgba(164, 226, 77, 0.2)' : 'transparent'};
  border-left: ${props => props.isCurrentPlayer ? `3px solid ${InterfaceTextColor.SUCCESS}` : 'none'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    padding: 8px 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const RankBadge = styled.span<{ rank: number }>`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${props => {
    if (props.rank <= 3) return InterfaceTextColor.SUCCESS;
    if (props.rank <= 10) return InterfaceTextColor.WARN;
    return "#666";
  }};
  color: #fff;
  min-width: 40px;
  text-align: center;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ScoreValue = styled.div`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 16px;
  color: ${InterfaceTextColor.SUCCESS};
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    font-size: 14px;
  }
`;