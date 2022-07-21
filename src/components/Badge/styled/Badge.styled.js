import styled from 'styled-components';
import theme from '../../../utils/theme';

const getColor = (type) => {
  switch (type) {
    case 'success':
      return { color: theme.successLight, border: theme.successDark }

    case 'warning':
      return { color: theme.warningLight, border: theme.warningDark }

    case 'error':
      return { color: theme.errorLight, border: theme.errorDark }

    case 'info':
      return { color: theme.infoLight, border: theme.infoDark }

    default:
      return { color: theme.successLight, border: theme.successDark }
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