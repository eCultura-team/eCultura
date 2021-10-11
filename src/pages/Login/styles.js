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
  width: 80%;
  align-items: center;
  justify-content: space-around;
`;

export const SeparatorText = styled.Text`
  color: ${colors.gray};
  font-size: ${fontSizes.medium}px;
`;

export const Form = styled.View`
  align-items: center;
  display: flex;
  width: 100%;
  height: 310px;
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

export const LinkContent = styled.TouchableHighlight`
  padding-top: 16px;
`;

export const LinkText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.medium}px;
`;

export const OptionText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.large}px;
  padding: 10px 0;
`;

export const InvitedContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100px;
  padding-bottom: 20px;
`;
