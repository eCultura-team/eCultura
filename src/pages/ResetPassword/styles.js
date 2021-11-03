import styled from 'styled-components/native';
import { colors, fontSizes } from '../../tokens';

export const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const Option = styled.View`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const SeparatorText = styled.Text`
  color: ${colors.gray};
  font-size: ${fontSizes.medium}px;
  margin-right: 2px;
`;

export const Form = styled.View`
  align-items: center;
  display: flex;
  width: 80%;
  height: 310px;
  justify-content: center;
`;

export const AdviceText = styled.Text`
  color: ${colors.secondary};
  font-size: ${fontSizes.large}px;
  font-weight: bold;
  margin-bottom: 6px;
  width: 80%;
  text-align: left;
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
  width: 326px;
  height: 69px;
`;

export const LinkText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.medium}px;
`;

export const ModalHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 180px;
  background: ${colors.primary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const ModalTitle = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.large}px;
  font-weight: bold;
  text-align: center;
`;

export const ModalContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  width: 100%;
  height: 100px;
`;

export const ModalText = styled.Text`
  color: ${colors.primary};
  font-size: ${fontSizes.medium}px;
  font-weight: bold;
  text-align: justify;
`;

export const ModalImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
`;

export const ModalFooter = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 40px 20px;
  width: 100%;
`;
