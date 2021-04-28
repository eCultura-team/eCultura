import React from 'react';
import { Image } from 'react-native';
import * as S from './style';
import { colors } from '../../tokens';
import theater from '../../assets/theater.png';
import market from '../../assets/market.png';
import museum from '../../assets/museum.png';

const CategoryMenu = () => (
  <>
    <S.MenuContainer>
      <S.MenuBox>
        <S.MenuBoxButton
          onPress={() => console.log('Teatro')}
          underlayColor={colors.primary}
        >
          <S.MenuBoxButtonContent>
            <Image source={theater} />
            <S.MenuBoxButtonText>Teatro</S.MenuBoxButtonText>
          </S.MenuBoxButtonContent>
        </S.MenuBoxButton>
      </S.MenuBox>
      <S.MenuBox>
        <S.MenuBoxButton
          onPress={() => console.log('Museu')}
          underlayColor={colors.primary}
        >
          <S.MenuBoxButtonContent>
            <Image source={museum} />
            <S.MenuBoxButtonText>Museu</S.MenuBoxButtonText>
          </S.MenuBoxButtonContent>
        </S.MenuBoxButton>
      </S.MenuBox>
      <S.MenuBox>
        <S.MenuBoxButton
          onPress={() => console.log('Mercado Público')}
          underlayColor={colors.primary}
        >
          <S.MenuBoxButtonContent>
            <Image source={market} />
            <S.MenuBoxButtonText>Mercado Público</S.MenuBoxButtonText>
          </S.MenuBoxButtonContent>
        </S.MenuBoxButton>
      </S.MenuBox>
    </S.MenuContainer>
  </>
);

export default CategoryMenu;
