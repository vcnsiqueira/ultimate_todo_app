import styled from 'styled-components';

export const ListsToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-Items: center;
  gap: 15px;
  margin: 10px 0px 20px;
`;

export const ListsInformation = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ListsTitle = styled.h3`
  color: #243A73;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0px 5px;
`;

export const NumberOfLists = styled.span`
  color: #000000;
  font-weight: bold;
  font-size: 16px;

  & span {
    color: #243A73;
  }
`