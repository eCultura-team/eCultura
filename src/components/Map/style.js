import styled from 'styled-components/native';
import { colors } from '../../tokens';

export const MapContainer = styled.View`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

export const MapContent = styled.View`
  border-radius: 10px;
  height: 480px;
  overflow: hidden;
  width: 345px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Indicator = styled.Text`
  background: ${(props) =>
    props.type === 1
      ? colors.darkGreen
      : props.type === 2
      ? colors.secondary
      : colors.primary};
  color: ${colors.white};
  font-size: 14px;
  font-weight: bold;
  padding: 8px;
  border-radius: 30px;
`;

export const ButtonMyLocation = styled.TouchableHighlight`
  position: absolute;
  background: white;
  color: red;
  top: 430px;
  right: 10px;
  border-radius: 40px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
