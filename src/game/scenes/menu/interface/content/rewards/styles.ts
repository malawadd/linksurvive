import styled from "styled-components";
import { INTERFACE_MOBILE_BREAKPOINT } from "@const/interface";
import { InterfaceFont, InterfaceTextColor } from "@type/interface";

export const Wrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RewardTitle = styled.h3`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 15px;
  color: ${InterfaceTextColor.SUCCESS};
`;

export const RewardList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

export const RewardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-family: ${InterfaceFont.PIXEL_TEXT};
  font-size: 12px;
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const RewardAmount = styled.span`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  color: ${InterfaceTextColor.SUCCESS};
  font-size: 14px;
`;

export const RewardStatus = styled.span<{ status: string }>`
  font-family: ${InterfaceFont.PIXEL_TEXT};
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  background: ${props => {
    switch (props.status) {
      case "completed":
        return InterfaceTextColor.SUCCESS;
      case "pending":
        return InterfaceTextColor.WARN;
      case "failed":
        return InterfaceTextColor.ERROR;
      default:
        return "#666";
    }
  }};
  color: #fff;
`;