import styled from 'styled-components/native';
import { colors, fontFamilies } from '../../tokens';

export const Content = styled.View`
  width: 100px;
  height: 90px;
`;

export const ContentButton = styled.TouchableHighlight`
  background: ${colors.secondary};
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const Info = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-family: ${fontFamilies.primary};
  font-weight: 700;
  text-align: center;
  margin-top: 5px;
`;
