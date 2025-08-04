import styled from "styled-components";
import { INTERFACE_MOBILE_BREAKPOINT } from "@const/interface";
import { InterfaceFont, InterfaceTextColor } from "@type/interface";
import { Button } from "@game/scenes/system/interface/button";

export const MintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin: 10px 0;
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    padding: 15px;
    margin: 8px 0;
  }
`;

export const MintButton = styled(Button)`
  min-width: 200px;
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    min-width: 160px;
  }
`;

export const MintStatus = styled.div`
  font-family: ${InterfaceFont.PIXEL_TEXT};
  color: ${InterfaceTextColor.SUCCESS};
  font-size: 14px;
  text-align: center;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    font-size: 12px;
  }
`;

export const MintInfo = styled.div`
  font-family: ${InterfaceFont.PIXEL_TEXT};
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  text-align: center;
  
  a {
    color: ${InterfaceTextColor.SUCCESS};
    text-decoration: none;
    
    &:hover {
      color: ${InterfaceTextColor.HOVER};
      text-decoration: underline;
    }
  }
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    font-size: 11px;
  }
`;