import styled from 'styled-components/native';
import { colors, fontFamilies } from '../../tokens';

export const MenuContainer = styled.View`
  margin: 20px 24px 0;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MenuBox = styled.View`
  width: 100px;
  height: 90px;
`;

export const MenuBoxButton = styled.TouchableHighlight`
  background: ${colors.secondary};
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const MenuBoxButtonContent = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuBoxButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${fontFamilies.primary};
  font-weight: 700;
  text-align: center;
  margin-top: 5px;
`;
