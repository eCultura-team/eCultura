import React from 'react';
import { Modalize } from 'react-native-modalize';
import Back from '../../assets/Back.png';
import Failed from '../../assets/failed.png';
import Sucess from '../../assets/sucess.png';

import { Header, Title, Footer, Content, Text, Image } from './style';
import Button from '../Button';

const Modal = ({ control, error, handle, buttonMessage, sucessMessage }) => (
  <Modalize
    ref={control}
    modalHeight={360}
    HeaderComponent={
      <Header>
        <Image source={error ? Failed : Sucess} />
        <Title>{error ? 'FALHA' : 'SUCESSO'}</Title>
      </Header>
    }
    FooterComponent={
      <Footer>
        <Button handle={() => handle()} icon={Back}>
          {buttonMessage}
        </Button>
      </Footer>
    }
  >
    <Content>
      <Text>{error || sucessMessage}</Text>
    </Content>
  </Modalize>
);

export default Modal;
