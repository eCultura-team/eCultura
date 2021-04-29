import styled from 'styled-components/native';
import { colors, fontSizes, fontFamilies } from '../../tokens';

export const WelcomeContent = styled.View`
  margin-left: 26px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.large}px;
  font-weight: 700;
  line-height: 40px;
`;

export const SubTitle = styled.Text`
  color: ${colors.gray};
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.medium}px;
  line-height: 16px;
`;
