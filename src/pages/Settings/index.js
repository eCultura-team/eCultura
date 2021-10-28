import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
import Logout from '../../assets/logout.png';
import Favorites from '../../assets/favorites.png';
import Password from '../../assets/password.png';
import Blocked from '../../assets/blocked.png';
import Edit from '../../assets/edit.png';
import Checked from '../../assets/checked.png';

import fire from '../../services/fire';
import Input from '../../components/Input';
import { message, error } from '../../utils/error/constants';
import { useStore } from '../../providers/store';
import api from '../../services/api';

import Title from '../../components/Title';
import BigButton from '../../components/BigButton';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import {
  Container,
  TitleBox,
  Content,
  UserInfo,
  Options,
  Subtitle,
  InfoContent,
  Label,
  Box,
  ButtonBox,
} from './styles';

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logged, setLogged] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userID, setUserID] = useState();
  const { userName, setUserName, setAccessToken } = useStore();
  const [newUserName, setNewUserName] = useState(userName);
  const [nameError, setNameError] = useState(false);
  const [sucessSend, setSucessSend] = useState();
  const [errorSend, setErrorSend] = useState();

  const modalControl = useRef(null);
  const modalControlReset = useRef(null);

  const signOut = () => {
    setIsLoading(true);

    fire
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('token');

        setAccessToken(null);
        setUserName(null);
        navigation.navigate('Login');
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const isLogged = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
      setLogged(false);
    } else {
      api
        .get('/getUserData')
        .then(({ data }) => {
          if (data.code === error.FIREBASE_AUTH_ID_TOKEN_EXPIRED) {
            alert(message.FIREBASE_AUTH_ID_TOKEN_EXPIRED);
            signOut();
          } else {
            setUserEmail(data.email);
            setUserID(data.uid);
          }
        })
        .catch((e) => console.log(e));

      setLogged(true);
    }
  };

  const SendPassword = () => {
    setIsLoading(true);

    fire
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        setIsLoading(false);
        setSucessSend(
          'Acabamos de te enviar um link via e-mail para a redefinição de senha. Caso não esteja em sua caixa de entrada procure em lixo eletrônico. 🔐😇',
        );
        modalControlReset.current?.open();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorSend('Houve um erro inesperado, vamos logar de novo?');
        signOut();
      });
  };

  const storeName = async () => {
    Keyboard.dismiss();

    if (newUserName.length === 0 || newUserName.length >= 18) {
      setNameError('O nome deve ter no mínimo 1 e no máximo 18 letras');
    } else {
      await AsyncStorage.setItem('userName', newUserName);
      setUserName(newUserName);
      setSucessSend(
        ` Ôpa ${newUserName}, seu nome foi atualizado com sucesso.😄`,
      );
      modalControl.current?.open();
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TitleBox>
            <Title>Configurações de conta</Title>
          </TitleBox>
          <Content>
            <Options>
              <BigButton
                image={Password}
                text="Redefinir senha"
                disabled={!logged}
                handle={SendPassword}
              />
              <BigButton
                image={Favorites}
                text="Favoritos"
                disabled={!logged}
                handle={() => navigation.navigate('Favorites', { userID })}
              />
              <BigButton
                image={Logout}
                text="Deslogar"
                handle={() => signOut()}
              />
            </Options>

            <UserInfo>
              <TitleBox>
                <Subtitle>Informações do usuário</Subtitle>
              </TitleBox>

              <InfoContent>
                <Box>
                  <Label>Nome do usuário</Label>
                  <Input
                    name="userName"
                    placeholder="Nome do usuário"
                    value={userName}
                    icon={Edit}
                    helpText={nameError}
                    handleChange={(text) => {
                      setNameError(false);
                      setNewUserName(text);
                    }}
                  />
                </Box>

                <ButtonBox>
                  <Button
                    icon={Checked}
                    disabled={newUserName === userName}
                    handle={storeName}
                  >
                    Salvar alteração
                  </Button>
                </ButtonBox>

                {logged && (
                  <Box>
                    <Label>E-mail</Label>
                    <Input
                      name="userName"
                      placeholder="Nome do usuário"
                      value={userEmail}
                      icon={Blocked}
                      disabled
                    />
                  </Box>
                )}
              </InfoContent>
            </UserInfo>
          </Content>
        </>
      )}

      <Modal
        control={modalControlReset}
        buttonMessage="Fechar"
        error={errorSend}
        sucessMessage={sucessSend}
        handle={() => modalControlReset.current?.close()}
      />

      <Modal
        control={modalControl}
        buttonMessage="Fechar"
        sucessMessage={sucessSend}
        handle={() => modalControl.current?.close()}
      />
    </Container>
  );
};

export default Settings;
