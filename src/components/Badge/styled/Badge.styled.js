import styled from 'styled-components';
import theme from '../../../utils/theme';

const getColor = (type) => {
  switch (type) {
    case 'low':
      return { color: theme.successLight, border: theme.successDark }

    case 'medium':
      return { color: theme.warningLight, border: theme.warningDark }

    case 'high':
      return { color: theme.errorLight, border: theme.errorDark }

    default:
      return { color: theme.infoLight, border: theme.infoDark }
  }
}

export const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 100px;
  margin: 0 auto;
  background-color: ${(props) => getColor(props.type).color };
  border-radius: 8px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 3px;
  text-align: center;
  cursor: default;
`;