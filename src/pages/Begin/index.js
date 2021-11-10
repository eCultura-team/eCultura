import React, { useRef, useState } from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../../providers/store';
import logo from '../../assets/logo.png';
import Back from '../../assets/Back.png';
import BeginBackground from '../../assets/BeginBackground.png';

import * as S from './style';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const Begin = ({ navigation }) => {
  const { userName, setUserName } = useStore();
  const [errorSend, setErrorSend] = useState();

  const modalControl = useRef();

  const saveName = async () => {
    Keyboard.dismiss();

    try {
      if (userName === null || userName.length >= 18) {
        setErrorSend(
          'Ops, o seu nome deve ter no mínimo 1 e no máximo 18 letras.😕',
        );
        modalControl.current?.open();
      } else {
        await AsyncStorage.setItem('userName', userName);
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleBackButton = () => {
    BackHandler.exitApp();

    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []),
  );

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

      <Modal
        control={modalControl}
        error={errorSend}
        buttonMessage="Fechar"
        handle={() => modalControl.current?.close()}
      />
    </>
  );
};

export default Begin;
