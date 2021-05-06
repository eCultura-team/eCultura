import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CategoryTitle from '../../components/CategoryTitle';
import CategoryItem from '../../components/CategoryItem';
import { useStore } from '../../providers/store';

const CategoryList = ({ route }) => {
  const { museumResults, theatreResults, marketResults } = useStore();
  const [currentCategory, setCurrentCategory] = useState([]);

  const getCurrentCategory = (title) => {
    switch (title) {
      case 'Teatro':
        setCurrentCategory(theatreResults);
        break;

      case 'Museu':
        setCurrentCategory(museumResults);
        break;

      default:
        setCurrentCategory(marketResults);
        break;
    }
  };

  useEffect(() => {
    getCurrentCategory(route.params.title);
  }, []);

  return (
    <>
      <CategoryTitle>{route.params.title}</CategoryTitle>
      <FlatList
        style={{
          marginTop: 41,
        }}
        contentContainerStyle={{
          alignSelf: 'center',
        }}
        data={currentCategory}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <CategoryItem title={item.nome} />}
      />
    </>
  );
};

export default CategoryList;
