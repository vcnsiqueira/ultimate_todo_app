import styled from 'styled-components';

export const TaskItemContainer = styled.tr`
  margin-bottom: 2px;
  padding: 8px 5px;
  border-radius: 8px;
`;

export const Element = styled.td`
  text-align: center;
  font-size: 14px;
  text-decoration: ${(props) => props.done ? 'line-through' : 'none'}
`

export const TaskOptions = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;