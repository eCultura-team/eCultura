import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image } from 'react-native';
import CategoryTitle from '../../components/CategoryTitle';
import CategoryItem from '../../components/CategoryItem';
import { useStore } from '../../providers/store';
import * as S from './style';
import search from '../../assets/search.png';

const CategoryList = ({ route, navigation }) => {
  const { museumResults, theatreResults, marketResults } = useStore();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [inputText, setInputText] = useState([]);
  const refInput = useRef(null);

  const getCurrentCategory = (title) => {
    const teatro = 'Teatro';
    const museu = 'Museu';

    switch (title) {
      case teatro:
        setCurrentCategory(theatreResults);
        break;

      case museu:
        setCurrentCategory(museumResults);
        break;

      default:
        setCurrentCategory(marketResults);
        break;
    }
  };

  const filterPlaces = (array) => {
    const result = array.filter((item) =>
      item.nome.toLowerCase().includes(inputText),
    );
    return result;
  };

  useEffect(() => {
    getCurrentCategory(route.params.title);
  }, []);

  return (
    <>
      <CategoryTitle>{route.params.title}</CategoryTitle>
      <S.CategoryListContainer>
        <S.CategorySearch>
          <S.CategorySearchInput
            placeholder="Pesquise..."
            ref={refInput}
            onChangeText={(text) => setInputText(text.toLowerCase())}
          />
          <S.CategorySearchContent
            underlayColor="transparent"
            onPress={() => refInput.current.focus()}
          >
            <Image source={search} />
          </S.CategorySearchContent>
        </S.CategorySearch>
      </S.CategoryListContainer>
      {filterPlaces(currentCategory).length === 0 ? (
        <S.EmptyPlace>
          <S.EmptyPlaceText>
            Nenhuma localização encontrada. 😥
          </S.EmptyPlaceText>
        </S.EmptyPlace>
      ) : (
        <FlatList
          style={{
            marginTop: 41,
          }}
          contentContainerStyle={{
            alignSelf: 'center',
          }}
          data={
            inputText.length === 0
              ? currentCategory
              : filterPlaces(currentCategory)
          }
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <CategoryItem
              infoREC={{
                title: item.nome,
                description: item.descricao,
                addressDistrict: item.bairro,
                addressStreet: item.logradouro,
                phone: `${item.telefone || item.Telefone}`,
                site: item.site,
              }}
              navigation={navigation}
            />
          )}
        />
      )}
    </>
  );
};

export default CategoryList;
