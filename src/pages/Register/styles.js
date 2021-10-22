import styled from 'styled-components/native';
import { colors, fontSizes } from '../../tokens';

export const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const RegisterContent = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SeparatorText = styled.Text`
  color: ${colors.gray};
  font-size: ${fontSizes.medium}px;
  margin-right: 6px;
`;

export const Form = styled.View`
  align-items: center;
  display: flex;
  width: 80%;
  height: 350px;
  justify-content: center;
`;

export const LogoContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin-top: 80px;
  margin-bottom: 60px;
`;

export const LogoImage = styled.Image`
  width: 322px;
  height: 69px;
`;

export const LinkText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.medium}px;
`;
