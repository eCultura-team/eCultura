import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';
import LoadingGif from '../../assets/loadingSVG.gif';

const Loading = () => (
  <Container>
    <Image source={LoadingGif} />
  </Container>
);

export default Loading;
