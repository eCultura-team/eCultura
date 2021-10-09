import styled from 'styled-components/native';
import { colors } from '../../tokens';

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 60px;
  margin-bottom: 20px;
`;

export const InputText = styled.TextInput`
  background: ${colors.white};
  border-radius: 8px;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  color: ${colors.gray};
  font-weight: 400;
`;

export const ContentPassword = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SeePassword = styled.TouchableHighlight`
  height: 100%;
  width: 16%;
  position: absolute;
  right: 0;
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
