import React from 'react';
import { AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { useStore } from '../../providers/store';
import * as S from './style';
import logo from '../../assets/logo.png';
import Back from '../../assets/Back.png';
import BeginBackground from '../../assets/BeginBackground.png';
import Button from '../../components/Button';

const Begin = ({ navigation }) => {
  const { userName, setUserName } = useStore();

  const saveName = async () => {
    try {
      if (userName === null) {
        alert('Ops, parece que você esqueceu de digitar seu nome.😕');
      } else {
        await AsyncStorage.setItem('userName', userName);
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position" enabled>
        <S.BeginHeader>
          <S.BeginHeaderBackground source={BeginBackground} />
          <S.BeginHeaderLogo source={logo} />
        </S.BeginHeader>
        <S.BeginDescription>
          <S.BeginDescriptionTitle>
            Seu marketplace para encontrar locais históricos.
          </S.BeginDescriptionTitle>
          <S.BeginDescriptionText>
            Ajudamos você a achar lugares históricos de forma rápida e
            eficiente.
          </S.BeginDescriptionText>
        </S.BeginDescription>
        <S.BeginName>
          <S.BeginNameInput
            placeholder="Como podemos te chamar?"
            onChangeText={(text) => setUserName(text)}
          />
          <Button icon={Back} handle={() => saveName()}>
            Entrar
          </Button>
        </S.BeginName>
      </KeyboardAvoidingView>
    </>
  );
};

export default Begin;
