import styled from 'styled-components/native';
import { colors, fontSizes } from '../../tokens';

export const Container = styled.View`
  background: ${colors.primary};
  width: 100%;
  height: 90%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ImageContent = styled.View`
  width: 100%;
  height: 40%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const PlaceType = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TypeImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export const Content = styled.View`
  width: 90%;
  height: 55%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: ${fontSizes.large}px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  color: ${colors.secondary};
  font-size: ${fontSizes.medium}px;
  font-weight: bold;
`;

export const Text = styled.Text`
  color: ${colors.white};
  text-align: justify;
`;
