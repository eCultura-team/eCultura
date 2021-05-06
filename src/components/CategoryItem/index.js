import React, { useState } from 'react';
import { Image } from 'react-native';
import * as S from './style';
import Arrow from '../../assets/arrow.png';
import { colors } from '../../tokens';

const CategoryItem = ({ title }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <S.ItemContent
        onPressIn={() => setIsPressed(!isPressed)}
        onPressOut={() => setIsPressed(!isPressed)}
        onPress={() => console.log(title)}
        underlayColor={colors.primary}
      >
        <S.InfoContent>
          <S.InfoContentTitle isPressed={isPressed}>{title}</S.InfoContentTitle>
          <Image source={Arrow} />
        </S.InfoContent>
      </S.ItemContent>
    </>
  );
};

export default CategoryItem;
