import { Linking, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import * as S from './style';

const Button = ({ children, url, handle, icon }) => (
  <>
    <S.ButtonContainer>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={url ? () => Linking.openURL(url) : handle}
      >
        <S.ButtonContent>
          <S.ButtonContentIcon>
            <Image source={icon} />
          </S.ButtonContentIcon>
          <S.ButtonContentText>
            <S.ButtonContentTextTitle>{children}</S.ButtonContentTextTitle>
          </S.ButtonContentText>
        </S.ButtonContent>
      </TouchableHighlight>
    </S.ButtonContainer>
  </>
);

export default Button;
