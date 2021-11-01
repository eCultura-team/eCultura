import React, { useEffect, useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Search from '../../assets/search.png';
import { colors } from '../../tokens';

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
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [carousselIndex, setCarousselIndex] = useState(0);
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
          ...allLocations
            .filter(
              (item) =>
                result?.data?.idLocation.includes(item.idLocation) && item,
            )
            .sort((a, b) => Number(a.distance) >= Number(b.distance)),
        ]);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const handleSearch = (text) => {
    setSearchValue(text);

    const array = [
      ...locations
        .filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
        .sort((a, b) => Number(a.distance) >= Number(b.distance)),
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
              <>
                <Carousel
                  layout="default"
                  layoutCardOffset={300}
                  ref={carousselRef}
                  data={filtered || locations}
                  sliderWidth={400}
                  itemWidth={300}
                  renderItem={({ item }) => <FavoritesCard item={item} />}
                  onSnapToItem={(index) => setCarousselIndex(index)}
                  autoplay={false}
                />

                <Pagination
                  dotsLength={filtered.length || locations.length}
                  activeDotIndex={carousselIndex}
                  containerStyle={{ paddingVertical: 8 }}
                  dotColor={colors.secondary}
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 8,
                  }}
                  inactiveDotColor={colors.primary}
                  inactiveDotOpacity={0.7}
                  inactiveDotScale={0.6}
                  carouselRef={carousselRef}
                  tappableDots={!!carousselRef}
                />
              </>
            )}
          </CarousselContent>
        </Container>
      )}
    </>
  );
};

export default Favorites;
