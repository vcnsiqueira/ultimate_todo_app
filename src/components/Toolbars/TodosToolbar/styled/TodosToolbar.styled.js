import styled from 'styled-components';

export const TodosToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin: 10px 0px 20px;
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

export const TodosInformation = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TodosTitle = styled.h3`
  color: #243A73;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0px 5px;
`;

export const ListDescription = styled.p`
  font-size: 14px;
  margin: 0px;
`;

export const NumberOfTodos = styled.span`
  color: #000000;
  font-size: 14px;

  & span {
    color: #243A73;
    font-weight: bold;
  }
`