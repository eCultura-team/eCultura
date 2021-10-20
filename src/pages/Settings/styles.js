import styled from 'styled-components/native';
import { fontSizes, colors, fontFamilies } from '../../tokens';

export const Container = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleBox = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  width: 90%;
  height: 96%;
  display: flex;
  padding-top: 25px;
  justify-content: space-between;
`;

export const Options = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Subtitle = styled.Text`
  font-size: ${fontSizes.xlarge}px;
  font-family: ${fontFamilies.primary};
  color: ${colors.primary};
  font-weight: bold;
`;

export const UserInfo = styled.View`
  width: 100%;
  height: 80%;
`;
