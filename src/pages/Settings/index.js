import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import Logout from '../../assets/logout.png';
import Favorites from '../../assets/favorites.png';
import Password from '../../assets/password.png';
import Blocked from '../../assets/blocked.png';
import Edit from '../../assets/edit.png';
import Checked from '../../assets/checked.png';

import fire from '../../services/fire';
import Input from '../../components/Input';
import { message } from '../../utils/error/constants';
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
} from './styles';

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logged, setLogged] = useState();
  const [userEmail, setUserEmail] = useState();
  const { userName, setUserName, setAccessToken } = useStore();
  const [newUserName, setNewUserName] = useState(userName);
  const [nameError, setNameError] = useState(false);

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
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const isLogged = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
      setLogged(false);
    } else {
      api
        .get('/getUserData')
        .then(({ data: { email } }) => setUserEmail(email))
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
        alert(
          'Foi enviado para seu e-mail um link para a redefinição de senha. Após redefini-la, entre novamente.',
        );
      })
      .catch(() => {
        setIsLoading(false);
        alert(message.FIREBASE_AUTH_INVALID_ACCOUNT);
      });
  };

  const storeName = async () => {
    if (newUserName.length === 0 || newUserName.length >= 18) {
      setNameError('O nome deve ter no mínimo 1 e no máximo 18 letras');
    } else {
      await AsyncStorage.setItem('userName', newUserName);
      setUserName(newUserName);
      alert('Seu nome foi atualizado 😎');
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
    </Container>
  );
};

export default Settings;
