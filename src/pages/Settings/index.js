import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import Logout from '../../assets/logout.png';

import fire from '../../services/fire';

import Title from '../../components/Title';
import BigButton from '../../components/BigButton';
import Loading from '../../components/Loading';
import { Container, TitleBox, Content } from './styles';

const Settings = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

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
            <BigButton
              image={Logout}
              text="Deslogar"
              handle={() => signOut()}
            />
          </Content>
        </>
      )}
    </Container>
  );
};

export default Settings;
