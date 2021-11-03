import styled from 'styled-components/native';
import { colors, fontSizes, fontFamilies } from '../../tokens';

export const WithoutImage = styled.View`
  display: flex;
  width: 353px;
  height: 207px;
  background: ${colors.darkGreen};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const WithoutImageTitle = styled.Text`
  color: ${colors.white};
  font-weight: 700;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.xxlarge}px;
  margin: 5px 0;
`;

export const PortifolioContent = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

export const ImageContent = styled.View`
  display: flex;
  width: 100%;
  height: 210px;
  position: relative;
`;

export const Favorite = styled.TouchableHighlight`
  display: flex;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50px;
  background: ${colors.transparent};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-weight: 700;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.xlarge}px;
  margin: 5px 0;
`;

export const SubTitle = styled.Text`
  color: ${colors.darkGreen};
  font-weight: 700;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.large}px;
  margin: 5px 0 16px;
`;

export const Text = styled.Text`
  color: ${colors.gray};
  font-weight: 400;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.medium}px;
  margin-bottom: 10px;
  text-align: justify;
`;

export const Address = styled.Text`
  color: ${colors.gray};
  font-weight: 400;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.medium}px;
  margin-bottom: 20px;
`;

export const PortifolioContact = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  height: 180px;
  margin-bottom: 20px;
`;

export const ModalHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: ${colors.primary};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  flex-direction: row;
`;

export const ModalTitle = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.large}px;
  font-weight: bold;
  text-align: center;
`;

export const ModalOptions = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${colors.secondary};
  border-radius: 50px;
`;

export const ModalOptionsImage = styled.Image`
  width: 16px;
  height: 16px;
`;
