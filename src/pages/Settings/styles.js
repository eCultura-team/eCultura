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

export const InfoContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-top: 20px;
`;

export const Box = styled.View`
  width: 100%;
  height: 100px;
`;

export const ButtonBox = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const Label = styled.Text`
  font-size: ${fontSizes.medium}px;
  font-family: ${fontFamilies.primary};
  color: ${colors.primary};
  font-weight: bold;
  margin-bottom: 10px;
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
