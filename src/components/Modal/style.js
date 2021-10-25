import styled from 'styled-components/native';
import { colors, fontSizes } from '../../tokens';

export const Header = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 180px;
  background: ${colors.primary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.large}px;
  font-weight: bold;
  text-align: center;
`;

export const Content = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  width: 100%;
  height: 100px;
`;

export const Text = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.medium}px;
  font-weight: bold;
  text-align: justify;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
`;

export const Footer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 40px 20px;
  width: 100%;
`;
