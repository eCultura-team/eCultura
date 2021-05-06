import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import CategoryTitle from '../../components/CategoryTitle';
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
        data={currentCategory}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </>
  );
};

export default CategoryList;
