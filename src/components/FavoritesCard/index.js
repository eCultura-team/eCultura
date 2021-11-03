import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Museum from '../../assets/museum.png';
import Theater from '../../assets/theater.png';
import Market from '../../assets/market.png';
import Back from '../../assets/Back.png';

import {
  Container,
  ImageContent,
  Image,
  Content,
  Title,
  PlaceType,
  TypeImage,
  Subtitle,
  Text,
} from './styles';
import Button from '../Button';

const FavoritesCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
    >
      <ImageContent>
        <Image source={{ uri: item.photo[0] }} />

        <PlaceType>
          <TypeImage
            source={
              item.type === 1 ? Museum : item.type === 2 ? Theater : Market
            }
          />
        </PlaceType>
      </ImageContent>

      <Content>
        <View>
          <Title>{item.name}</Title>
          <Subtitle>Está apenas à {item.distance} km de você!</Subtitle>
        </View>

        <Text ellipsizeMode="tail" numberOfLines={6}>
          {item.description}
        </Text>

        <Button
          fullWidth
          icon={Back}
          handle={() => navigation.navigate('Portfolio', { data: item })}
        >
          Ver mais
        </Button>
      </Content>
    </Container>
  );
};

export default FavoritesCard;
