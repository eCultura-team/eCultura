import styled from 'styled-components/native';
import { colors, fontSizes, fontFamilies } from '../../tokens';

export const LoadingImage = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

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
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 120px;
  margin-bottom: 20px;
`;
