import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import loading from '../../assets/loading.gif';
import global from '../../assets/global.png';
import phone from '../../assets/phone.png';
import * as S from './style';
import placeSearchAPI from '../../services/WikiAPI/placeSearch';
import Button from '../../components/Button';

const Portfolio = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoWiki, setInfoWiki] = useState();
  const { infoREC } = route.params;

  const getWikiPlace = async () => {
    const response = await placeSearchAPI.get(
      `api.php?format=json&action=query&generator=search&gsrlimit=1&prop=extracts%7Cpageimages&pithumbsize=800&origin=*&exintro&explaintext&exsentences=10&exlimit=max&gsrsearch=${infoREC.title}`,
    );
    const { pages } = response.data.query;
    const pageid = Object.keys(pages);
    const place = pages[pageid];
    setInfoWiki(place);
    setIsLoading(false);
  };

  useEffect(() => {
    getWikiPlace();
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
              {infoWiki.thumbnail ? (
                <Image
                  source={{ uri: infoWiki.thumbnail.source }}
                  style={{ width: 353, height: 207, borderRadius: 8 }}
                />
              ) : (
                <S.WithoutImage>
                  <S.WithoutImageTitle>Imagem Indisponível</S.WithoutImageTitle>
                </S.WithoutImage>
              )}
              <S.Title>{infoREC.title}</S.Title>
              <S.SubTitle>Descrição</S.SubTitle>
              <S.Text>{infoWiki.extract}</S.Text>
              <S.Text>{infoREC.description}</S.Text>
              <S.SubTitle>Endereço</S.SubTitle>
              <S.Address>
                {infoREC.addressStreet && `${infoREC.addressStreet}, `}
                {infoREC.addressDistrict}, Recife-PE.
              </S.Address>
              <S.PortifolioContact>
                {infoREC.phone === undefined || infoREC.phone === '' ? null : (
                  <Button
                    icon={phone}
                    url={`tel:${infoREC.phone.slice(0, 14)}`}
                  >
                    Entre em contato
                  </Button>
                )}
                {infoREC.site === undefined ? null : (
                  <Button icon={global} url={infoREC.site}>
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
