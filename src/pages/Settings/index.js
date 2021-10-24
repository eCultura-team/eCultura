import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage, Keyboard } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Logout from '../../assets/logout.png';
import Favorites from '../../assets/favorites.png';
import Password from '../../assets/password.png';
import Blocked from '../../assets/blocked.png';
import Edit from '../../assets/edit.png';
import Checked from '../../assets/checked.png';
import Back from '../../assets/Back.png';
import Sucess from '../../assets/sucess.png';

import fire from '../../services/fire';
import Input from '../../components/Input';
import { message, error } from '../../utils/error/constants';
import { useStore } from '../../providers/store';
import api from '../../services/api';

import Title from '../../components/Title';
import BigButton from '../../components/BigButton';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
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
  ModalContent,
  ModalHeader,
  ModalImage,
  ModalText,
  ModalTitle,
  ModalFooter,
} from './styles';

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logged, setLogged] = useState();
  const [userEmail, setUserEmail] = useState();
  const { userName, setUserName, setAccessToken } = useStore();
  const [newUserName, setNewUserName] = useState(userName);
  const [nameError, setNameError] = useState(false);

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
        modalControlReset.current?.open();
      })
      .catch(() => {
        setIsLoading(false);
        alert(message.FIREBASE_AUTH_INVALID_ACCOUNT);
      });
  };

  const storeName = async () => {
    Keyboard.dismiss();

    if (newUserName.length === 0 || newUserName.length >= 18) {
      setNameError('O nome deve ter no mínimo 1 e no máximo 18 letras');
    } else {
      await AsyncStorage.setItem('userName', newUserName);
      setUserName(newUserName);
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
                handle={() => console.log('meus favoritos')}
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

      <Modalize
        ref={modalControlReset}
        modalHeight={360}
        HeaderComponent={
          <ModalHeader>
            <ModalImage source={Sucess} />
            <ModalTitle>SUCESSO</ModalTitle>
          </ModalHeader>
        }
        FooterComponent={
          <ModalFooter>
            <Button
              handle={() => modalControlReset.current?.close()}
              icon={Back}
            >
              Fechar
            </Button>
          </ModalFooter>
        }
      >
        <ModalContent>
          <ModalText>
            Acabamos de te enviar um link via e-mail para a redefinição de
            senha. Caso não esteja em sua caixa de entrada procure em lixo
            eletrônico. 🔐😇
          </ModalText>
        </ModalContent>
      </Modalize>

      <Modalize
        ref={modalControl}
        modalHeight={360}
        HeaderComponent={
          <ModalHeader>
            <ModalImage source={Sucess} />
            <ModalTitle>SUCESSO</ModalTitle>
          </ModalHeader>
        }
        FooterComponent={
          <ModalFooter>
            <Button handle={() => modalControl.current?.close()} icon={Back}>
              Fechar
            </Button>
          </ModalFooter>
        }
      >
        <ModalContent>
          <ModalText>
            Ôpa {newUserName}, seu nome foi atualizado com sucesso.😄
          </ModalText>
        </ModalContent>
      </Modalize>
    </Container>
  );
};

export default Settings;
