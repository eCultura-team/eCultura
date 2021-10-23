import React, { useState, useRef } from 'react';
import { TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Modalize } from 'react-native-modalize';
import LogoBig from '../../assets/logoBig.png';
import Back from '../../assets/Back.png';
import Sucess from '../../assets/sucess.png';
import Failed from '../../assets/failed.png';

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
  ModalContent,
  ModalImage,
  ModalHeader,
  ModalText,
  ModalFooter,
  ModalTitle,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import fire from '../../services/fire';

const ResetPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalControl = useRef(null);
  const [errorSend, setErrorSend] = useState(false);
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
        modalControl.current?.open();
      })
      .catch(() => {
        setIsLoading(false);
        setErrorSend(true);
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

      <Modalize
        ref={modalControl}
        modalHeight={360}
        HeaderComponent={
          <ModalHeader>
            <ModalImage source={errorSend ? Failed : Sucess} />
            <ModalTitle>{errorSend ? 'FALHA' : 'SUCESSO'}</ModalTitle>
          </ModalHeader>
        }
        FooterComponent={
          <ModalFooter>
            <Button handle={() => handleComeback()} icon={Back}>
              Voltar para login
            </Button>
          </ModalFooter>
        }
      >
        <ModalContent>
          <ModalText>
            {errorSend
              ? `${message.FIREBASE_AUTH_INVALID_ACCOUNT} A sua conta com o e-mail informado não existe, cadastre-se ou entre como nosso convidado. 🙁💜`
              : 'Acabamos de te enviar um link via e-mail para a redefinição de senha. Caso não esteja em sua caixa de entrada procure em lixo eletrônico. 🔐😇'}
          </ModalText>
        </ModalContent>
      </Modalize>
    </Container>
  );
};

export default ResetPassword;
