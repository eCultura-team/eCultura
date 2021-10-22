import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LogoBig from '../../assets/logoBig.png';
import Back from '../../assets/Back.png';

import { message } from '../../utils/error/constants';

import {
  Container,
  Form,
  LogoImage,
  LogoContent,
  LinkText,
  Option,
  AdviceText,
  SeparatorText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import fire from '../../services/fire';

const ResetPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialInfo] = useState({
    email: '',
  });
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string().email('E-mail inválido').required('E-mail requerido'),
    }),
  );

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
        navigation.navigate('Login');
      })
      .catch(() => {
        setIsLoading(false);
        alert(message.FIREBASE_AUTH_INVALID_ACCOUNT);
        navigation.navigate('Login');
      });
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

          <Option>
            <SeparatorText>Lembrou da senha? </SeparatorText>
            <TouchableHighlight
              onPress={() => navigation.navigate('Login')}
              underlayColor="transparent"
            >
              <LinkText>Vamos logar!</LinkText>
            </TouchableHighlight>
          </Option>

          <Formik
            initialValues={initialInfo}
            onSubmit={(values) => SendPassword(values.email)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <AdviceText>Digite seu e-mail abaixo:</AdviceText>
                <Input
                  name="email"
                  placeholder="E-mail"
                  handleChange={handleChange('email')}
                  helpText={errors.email && touched.email && errors.email}
                />

                <Button icon={Back} handle={handleSubmit}>
                  Enviar redefinição
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

export default ResetPassword;
