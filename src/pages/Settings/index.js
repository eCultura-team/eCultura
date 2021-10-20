import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import Logout from '../../assets/logout.png';
import Favorites from '../../assets/favorites.png';
import Password from '../../assets/password.png';

import fire from '../../services/fire';
import Input from '../../components/Input';
import { message } from '../../utils/error/constants';

import Title from '../../components/Title';
import BigButton from '../../components/BigButton';
import Loading from '../../components/Loading';
import {
  Container,
  TitleBox,
  Content,
  UserInfo,
  Options,
  Subtitle,
} from './styles';
import { useStore } from '../../providers/store';

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logged, setLogged] = useState();
  const { userName } = useStore();

  const signOut = () => {
    setIsLoading(true);

    fire
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userName');
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
      setLogged(true);
    }
  };

  const SendPassword = (email) => {
    setIsLoading(true);

    fire
      .auth()
      .sendPasswordResetEmail(email)
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
                handle={() => SendPassword('teste@teste.com')}
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
              <Input
                name="userName"
                placeholder="Nome do usuário"
                value={userName}
                handleChange={() => console.log('email')}
              />
            </UserInfo>
          </Content>
        </>
      )}
    </Container>
  );
};

export default Settings;
