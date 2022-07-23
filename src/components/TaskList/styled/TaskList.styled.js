import styled from 'styled-components';
import { devices } from '../../Breakpoints';

export const TaskListContainer = styled.div`
  border-radius: 10px;

  @media ${devices.phoneS} {
    margin: 0px 15px;
  };

  @media ${devices.tablet} {
    margin: 0px 15px;
  };

  @media ${devices.desktopL} {
    margin: 0px 15px;
  };
`;

export const List = styled.table`
  width: 100%;
  padding: 0px;

  tr:nth-child(even) {
    background-color: #E3F2FD;
  }

  tr:nth-child(odd) {
    background-color: #FFFFFF;
  }
`;