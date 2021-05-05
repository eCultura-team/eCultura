import styled from 'styled-components/native';
import { fontSizes, colors, fontFamilies } from '../../tokens';

export const TitleContent = styled.View`
  padding-left: 26px;
`;

export const TitleContentText = styled.Text`
  font-size: ${fontSizes.xlarge}px;
  font-family: ${fontFamilies.primary};
  color: ${colors.primary};
  font-weight: bold;
`;
