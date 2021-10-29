import styled from 'styled-components/native';
import { colors, fontSizes } from '../../tokens';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SearchContent = styled.View`
  width: 90%;
  margin-top: 20px;
`;

export const CarousselContent = styled.View`
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TitleBox = styled.View`
  width: 100%;
`;

export const Text = styled.Text`
  color: ${colors.gray};
  font-size: ${fontSizes.medium}px;
`;
