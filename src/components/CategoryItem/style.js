import styled from 'styled-components/native';
import { colors, fontSizes, fontFamilies } from '../../tokens';

export const ItemContent = styled.TouchableHighlight`
  background: ${colors.white};
  margin-bottom: 15px;
  width: 350px;
  height: 50px;
  border-radius: 8px;
`;

export const InfoContent = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const InfoContentTitle = styled.Text`
  font-size: ${fontSizes.medium}px;
  font-family: ${fontFamilies.primary};
  font-weight: 700;
  color: ${(props) => (props.isPressed ? colors.white : colors.gray)};
  width: 90%;
`;
