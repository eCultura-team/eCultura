/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { colors, fontSizes, fontFamilies } from '../../tokens';

export const ButtonContainer = styled.View`
  width: ${(props) => props.fullWidth ? '100%' : '312px'} ;
  height: 51px;
`;

export const ButtonContent = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const ButtonContentIcon = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  background: ${(props) => props.disabled ? colors.gray : colors.darkGreen};
  width: 15%;
  padding: 10px;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const ButtonContentText = styled.View`
  background: ${(props) => props.disabled ? '#ccc' : colors.secondary};
  width: 85%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const ButtonContentTextTitle = styled.Text`
  font-family: ${fontFamilies.primary};
  font-size: ${fontSizes.medium}px;
  color: ${colors.white};
  font-weight: 700;
`;
