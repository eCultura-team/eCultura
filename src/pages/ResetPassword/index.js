import React, { useState, useRef } from 'react';
import { TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LogoBig from '../../assets/logoBig.png';
import Back from '../../assets/Back.png';

import { message } from '../../utils/error/constants';

import fire from '../../services/fire';

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
import Modal from '../../components/Modal';

const ResetPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalControl = useRef(null);
  const [errorSend, setErrorSend] = useState(false);
  const [sucessSend, setSucessSend] = useState(false);
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
        setSucessSend(
          'Acabamos de te enviar um link via e-mail para a redefinição de senha. Caso não esteja em sua caixa de entrada procure em lixo eletrônico. 🔐😇',
        );
        modalControl.current?.open();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorSend(message.FIREBASE_AUTH_INVALID_ACCOUNT);
        modalControl.current?.open();
      });
  };

  const handleComeback = () => {
    modalControl.current?.close();
    navigation.navigate('Login');
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
            <SeparatorText>Lembrou da senha?</SeparatorText>
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

      <Modal
        control={modalControl}
        error={errorSend}
        buttonMessage="Voltar para login"
        sucessMessage={sucessSend}
        handle={handleComeback}
      />
    </Container>
  );
};

export default ResetPassword;
