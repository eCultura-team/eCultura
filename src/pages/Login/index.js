import React from 'react';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import Logo from '../../assets/logo.png';
import Back from '../../assets/Back.png';
import invited from '../../assets/invited.png';

import fire from '../../services/fire';
import { useStore } from '../../providers/store';

import {
  Container,
  Form,
  LogoImage,
  LogoContent,
  LinkContent,
  LinkText,
  InvitedContent,
  OptionText,
  RegisterContent,
  SeparatorText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = ({ navigation }) => {
  const { accessToken, setAccessToken } = useStore();

  const SignIn = async () => {
    try {
      const result = await fire.auth().signInWithEmailAndPassword('', '');

      if (result) {
        setAccessToken(result.user.toJSON().stsTokenManager.accessToken);
        await AsyncStorage.setItem('token', accessToken);

        const userName = await AsyncStorage.getItem('userName');

        if (userName !== null) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Begin');
        }
      }
    } catch (error) {
      alert('E-mail ou senha inválidos');
    }
  };

  return (
    <Container>
      <LogoContent>
        <LogoImage source={Logo} />
      </LogoContent>

      <RegisterContent>
        <SeparatorText>Ainda não possui uma conta?</SeparatorText>
        <TouchableHighlight
          onPress={() => console.log('Resgistrar-se')}
          underlayColor="transparent"
        >
          <LinkText>Registrar-se</LinkText>
        </TouchableHighlight>
      </RegisterContent>

      <Form>
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" password />
        <Button icon={Back} handle={SignIn}>
          Entrar
        </Button>
        <LinkContent
          onPress={() => console.log('Esqueci minha senha')}
          underlayColor="transparent"
        >
          <LinkText>Esqueci minha senha</LinkText>
        </LinkContent>
      </Form>

      <OptionText>Ou</OptionText>

      <InvitedContent>
        <Button icon={invited} handle={() => navigation.navigate('Begin')}>
          Entrar como convidado
        </Button>
      </InvitedContent>
    </Container>
  );
};

export default Login;
