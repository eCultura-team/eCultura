import styled from 'styled-components/native';
import { colors } from '../../tokens';

export const Container = styled.View`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1;
  justify-content: center;
  top: 0;
  left: 0;
  position: absolute;
  background: ${colors.white};
`;
