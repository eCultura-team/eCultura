import { Linking, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import * as S from './style';

const Button = ({ children, url, handle, icon, disabled }) => (
  <>
    <S.ButtonContainer>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={url ? () => Linking.openURL(url) : handle}
        disabled={disabled}
      >
        <S.ButtonContent>
          <S.ButtonContentIcon disabled={disabled}>
            <Image source={icon} />
          </S.ButtonContentIcon>
          <S.ButtonContentText disabled={disabled}>
            <S.ButtonContentTextTitle>{children}</S.ButtonContentTextTitle>
          </S.ButtonContentText>
        </S.ButtonContent>
      </TouchableHighlight>
    </S.ButtonContainer>
  </>
);

export default Button;
