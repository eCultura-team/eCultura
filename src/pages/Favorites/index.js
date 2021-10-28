import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Search from '../../assets/search.png';

import api from '../../services/api';
import { useStore } from '../../providers/store';

import {
  Container,
  CarousselContent,
  SearchContent,
  TitleBox,
  Text,
} from './styles';
import Title from '../../components/Title';
import Input from '../../components/Input';
import FavoritesCard from '../../components/FavoritesCard';
import Loading from '../../components/Loading';

const Favorites = ({ route }) => {
  const { width: initialWidth } = Dimensions.get('window');
  const [width] = useState(initialWidth);
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const { marketResults, theatreResults, museumResults } = useStore();

  const carousselRef = useRef(null);

  const { userID } = route.params;

  const getFavorites = () => {
    setIsLoading(true);

    const allLocations = [
      ...marketResults.concat(theatreResults, museumResults),
    ];

    api
      .post('/getUserFavorites', { uid: userID })
      .then((result) => {
        setLocations([
          ...allLocations.filter(
            (item) =>
              result?.data?.idLocation.includes(item.idLocation) && item,
          ),
        ]);
      })
      .catch((e) => console.log(e));

    setIsLoading(false);
  };

  const handleSearch = (text) => {
    setSearchValue(text);

    const array = [
      ...locations.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      ),
    ];

    if (array.length === 0) {
      setFiltered(false);
    } else {
      setFiltered(array);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <TitleBox>
            <Title>Favoritos</Title>
          </TitleBox>

          <SearchContent>
            <Input
              name="Search"
              value={searchValue}
              handleChange={(text) => handleSearch(text)}
              placeholder="Pesquise..."
              icon={Search}
            />
          </SearchContent>

          <CarousselContent>
            {!filtered && searchValue.length !== 0 ? (
              <Text>Nenhum resultado encontrado 😥</Text>
            ) : (
              <Carousel
                layout="default"
                ref={carousselRef}
                data={filtered || locations}
                sliderWidth={width}
                itemWidth={width * 0.75}
                renderItem={({ item }) => <FavoritesCard item={item} />}
              />
            )}
          </CarousselContent>
        </Container>
      )}
    </>
  );
};

export default Favorites;
