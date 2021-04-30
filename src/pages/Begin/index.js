import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import { useStore } from '../../providers/store';
import * as S from './style';
import logo from '../../assets/logo.png';
import BeginBackground from '../../assets/BeginBackground.png';

const Begin = ({ navigation }) => {
  const { userName, setUserName } = useStore();

  const saveName = async () => {
    try {
      if (userName === null) {
        alert('Ops, parece que você esqueceu de digitar seu nome.😕');
      } else {
        await AsyncStorage.setItem('1', userName);
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <S.BeginHeader>
        <S.BeginHeaderBackground source={BeginBackground} />
        <S.BeginHeaderLogo source={logo} />
      </S.BeginHeader>
      <S.BeginDescription>
        <S.BeginDescriptionTitle>
          Seu marketplace para encontrar locais históricos.
        </S.BeginDescriptionTitle>
        <S.BeginDescriptionText>
          Ajudamos você a achar lugares históricos de forma rápida e eficiente.
        </S.BeginDescriptionText>
      </S.BeginDescription>
      <S.BeginName>
        <S.BeginNameInput
          placeholder="Como podemos te chamar?"
          onChangeText={(text) => setUserName(text)}
        />
        <Button title="Entrar" onPress={() => saveName()} />
      </S.BeginName>
    </>
  );
};

export default Begin;
