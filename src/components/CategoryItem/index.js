import React, { useState } from 'react';
import { Image } from 'react-native';
import * as S from './style';
import Arrow from '../../assets/arrow.png';
import { colors } from '../../tokens';

const CategoryItem = ({ navigation, data }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <S.ItemContent
        onPressIn={() => setIsPressed(!isPressed)}
        onPressOut={() => setIsPressed(!isPressed)}
        onPress={() => navigation.navigate('Portfolio', { data })}
        underlayColor={colors.primary}
      >
        <S.InfoContent>
          <S.InfoContentTitle isPressed={isPressed}>
            {data.name}
          </S.InfoContentTitle>
          <Image source={Arrow} />
        </S.InfoContent>
      </S.ItemContent>
    </>
  );
};

export default CategoryItem;
