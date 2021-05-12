import styled from 'styled-components/native';
import { colors, fontFamilies, fontSizes } from '../../tokens';

export const CategoryListContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategorySearch = styled.View`
  width: 350px;
  height: 50px;
  background: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 14px;
  margin-top: 20px;
  border-radius: 8px;
`;

export const CategorySearchContent = styled.TouchableHighlight`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategorySearchInput = styled.TextInput`
  height: 100%;
  width: 90%;
  font-weight: 500;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.small}px;
`;

export const EmptyPlace = styled.View`
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyPlaceText = styled.Text`
  font-weight: 500;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.large}px;
  color: ${colors.gray};
`;
