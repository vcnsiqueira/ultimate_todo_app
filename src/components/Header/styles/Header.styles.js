import styled from 'styled-components';
import { devices } from '../../Breakpoints';

export const LeftSideToolbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-Items: center;
  gap: 15px;
`;

export const StyledBoxBurger = styled.div`

  display: none;

  @media ${devices.phoneL} {
    display: flex;
  };
`;