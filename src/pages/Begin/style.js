import styled from 'styled-components/native';
import { colors, fontFamilies, fontSizes } from '../../tokens';

export const BeginHeader = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 280px;
  justify-content: flex-start;
  position: relative;
`;

export const BeginHeaderBackground = styled.Image`
  position: absolute;
  right: 0;
  top: 40px;
`;

export const BeginHeaderLogo = styled.Image`
  margin-left: 40px;
  margin-top: 115px;
`;

export const BeginDescription = styled.View`
  display: flex;
  margin-top: 40px;
  margin: 0 40px;
`;

export const BeginDescriptionTitle = styled.Text`
  color: ${colors.primary};
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.xxlarge}px;
  font-weight: 700;
  line-height: 40px;
  text-shadow: -4px 4px 4px rgba(0, 0, 0, 0.25);
  width: 380px;
`;

export const BeginDescriptionText = styled.Text`
  color: ${colors.gray};
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.small}px;
  line-height: 20px;
  margin-top: 12px;
`;

export const BeginName = styled.View`
  display: flex;
  left: 40px;
  width: 310px;
  justify-content: center;
  align-items: center;
`;

export const BeginNameInput = styled.TextInput`
  background: ${colors.white};
  border-radius: 8px;
  margin-top: 124px;
  padding: 15px;
  width: 100%;
  margin-bottom: 18px;
`;
