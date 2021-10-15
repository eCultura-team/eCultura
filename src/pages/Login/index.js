import React, { useState } from 'react';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LogoBig from '../../assets/logoBig.png';
import Back from '../../assets/Back.png';
import Invited from '../../assets/invited.png';

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
import Loading from '../../components/Loading';
import { message } from '../../utils/error/constants';

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken } = useStore();
  const [initialInfo] = useState({
    email: '',
    password: '',
  });
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string().email('E-mail inválido').required('E-mail requerido'),
      password: Yup.string().required('Senha obrigatória'),
    }),
  );

  const SignIn = async (values) => {
    setIsLoading(true);

    try {
      const result = await fire
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      console.log(result);
      if (result) {
        const token = result.user.toJSON().stsTokenManager.accessToken;
        setAccessToken(token);
        await AsyncStorage.setItem('token', token);

        const userName = await AsyncStorage.getItem('userName');

        if (userName !== null) {
          setIsLoading(false);
          navigation.navigate('Home');
        } else {
          setIsLoading(false);
          navigation.navigate('Begin');
        }
      }
    } catch (error) {
      console.log(error);
      alert(message.FIREBASE_AUTH_INVALID_EMAIL_PASSWORD);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <LogoContent>
            <LogoImage source={LogoBig} />
          </LogoContent>

          <RegisterContent>
            <SeparatorText>Ainda não possui uma conta?</SeparatorText>
            <TouchableHighlight
              onPress={() => navigation.navigate('Register')}
              underlayColor="transparent"
            >
              <LinkText>Registrar-se</LinkText>
            </TouchableHighlight>
          </RegisterContent>

          <Formik
            initialValues={initialInfo}
            onSubmit={(values) => SignIn(values)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Input
                  name="email"
                  placeholder="E-mail"
                  handleChange={handleChange('email')}
                  helpText={errors.email && touched.email && errors.email}
                />
                <Input
                  name="password"
                  placeholder="Senha"
                  handleChange={handleChange('password')}
                  helpText={
                    errors.password && touched.password && errors.password
                  }
                  password
                />

                <Button icon={Back} handle={handleSubmit}>
                  Entrar
                </Button>

                <LinkContent
                  onPress={() => console.log('Resgistrar-se')}
                  underlayColor="transparent"
                >
                  <LinkText>Esqueci minha senha</LinkText>
                </LinkContent>
              </Form>
            )}
          </Formik>

          <OptionText>Ou</OptionText>

          <InvitedContent>
            <Button icon={Invited} handle={() => navigation.navigate('Begin')}>
              Entrar como convidado
            </Button>
          </InvitedContent>
        </>
      )}
    </Container>
  );
};

export default Login;
