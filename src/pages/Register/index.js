import React, { useState } from 'react';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LogoBig from '../../assets/logoBig.png';
import Back from '../../assets/Back.png';

import fire from '../../services/fire';
import { useStore } from '../../providers/store';
import api from '../../services/api';

import {
  Container,
  Form,
  LogoImage,
  LogoContent,
  LinkText,
  RegisterContent,
  SeparatorText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken } = useStore();
  const [initialInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .email('O e-mail informado é inválido')
        .required('O e-mail é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
        .required('A confirmação de senha é obrigatória'),
    }),
  );

  const createUser = async (values) => {
    setIsLoading(true);

    try {
      const { data } = await api.post('/createUser', {
        email: values.email,
        password: values.password,
      });

      if (data.status === 201) {
        const result = await fire
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);

        const token = result.user.toJSON().stsTokenManager.accessToken;
        setAccessToken(token);
        await AsyncStorage.setItem('token', token);

        navigation.navigate('Begin');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
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
            <SeparatorText>Já possui uma conta?</SeparatorText>
            <TouchableHighlight
              onPress={() => navigation.navigate('Login')}
              underlayColor="transparent"
            >
              <LinkText>Login</LinkText>
            </TouchableHighlight>
          </RegisterContent>

          <Formik
            initialValues={initialInfo}
            onSubmit={(values) => createUser(values)}
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
                <Input
                  name="passwordConfirm"
                  placeholder="Confirmação de senha"
                  handleChange={handleChange('passwordConfirm')}
                  helpText={
                    errors.passwordConfirm &&
                    touched.passwordConfirm &&
                    errors.passwordConfirm
                  }
                  password
                />

                <Button icon={Back} handle={handleSubmit}>
                  Registrar
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

export default Login;
