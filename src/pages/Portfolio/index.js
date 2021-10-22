import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import loading from '../../assets/loading.gif';
import global from '../../assets/global.png';
import phone from '../../assets/phone.png';
import * as S from './style';
import Button from '../../components/Button';

const Portfolio = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data } = route.params;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <S.LoadingImage>
          <Image source={loading} />
        </S.LoadingImage>
      ) : (
        <>
          <ScrollView>
            <S.PortifolioContent>
              {data?.photo[0] ? (
                <Image
                  source={{ uri: data?.photo[0] }}
                  style={{ width: 353, height: 207, borderRadius: 8 }}
                />
              ) : (
                <S.WithoutImage>
                  <S.WithoutImageTitle>Imagem Indisponível</S.WithoutImageTitle>
                </S.WithoutImage>
              )}
              <S.Title>{data?.name}</S.Title>
              <S.SubTitle>Descrição</S.SubTitle>
              <S.Text>{data?.description}</S.Text>
              <S.SubTitle>Endereço</S.SubTitle>
              <S.Address>{data?.address}, Recife-PE.</S.Address>
              <S.PortifolioContact>
                {data?.phone !== '' && (
                  <Button icon={phone} url={`tel:${data?.phone}`}>
                    Entre em contato
                  </Button>
                )}
                {data?.website !== '' && (
                  <Button icon={global} url={data?.website}>
                    Acesse o site da instituição
                  </Button>
                )}
              </S.PortifolioContact>
            </S.PortifolioContent>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Portfolio;
