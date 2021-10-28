import React from 'react';

import { Container, Text } from './styles';

const FavoritesCard = ({ item }) => (
  <Container>
    <Text>{item.name}</Text>
  </Container>
);

export default FavoritesCard;
