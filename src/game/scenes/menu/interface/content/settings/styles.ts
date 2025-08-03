import styled from 'styled-components';
import { INTERFACE_MOBILE_BREAKPOINT } from "@const/interface";
import { InterfaceFont, InterfaceTextColor } from "@type/interface";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    gap: 4px;
    margin-bottom: 15px;
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 16px;
  line-height: 16px;
  padding: 10px 20px;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${props => props.$active ? InterfaceTextColor.SUCCESS : '#fff'};
  border: none;
  border-bottom: 3px solid ${props => props.$active ? InterfaceTextColor.SUCCESS : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: all; /* Ensure clicks are captured */
  user-select: none; /* Prevent text selection */
  position: relative;
  z-index: 1;
  
  &:hover {
    color: ${InterfaceTextColor.HOVER};
    background: rgba(255, 255, 255, 0.05);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    font-size: 14px;
    padding: 8px 15px;
  }
`;

export const TabContent = styled.div`
  > *:not(:last-child) {
    margin-bottom: 25px;
  }
`;
