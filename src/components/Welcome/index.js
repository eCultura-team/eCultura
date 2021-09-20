import React from 'react';
import * as S from './style';
import { useStore } from '../../providers/store';

const Welcome = () => {
  const { userName } = useStore();

  return (
    <>
      <S.WelcomeContent>
        <S.Title>Bem vindo, {userName}.</S.Title>
        <S.SubTitle>Encontre no mapa um ponto histórico.</S.SubTitle>
      </S.WelcomeContent>
    </>
  );
};

export default Welcome;
