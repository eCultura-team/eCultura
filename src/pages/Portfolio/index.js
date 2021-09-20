import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { Popup } from 'react-native-map-link';
import loading from '../../assets/loading.gif';
import global from '../../assets/global.png';
import phone from '../../assets/phone.png';
import navigation from '../../assets/navigation.png';
import * as S from './style';
import placeSearchAPI from '../../services/WikiAPI/placeSearch';
import Button from '../../components/Button';
import { useStore } from '../../providers/store';
import { colors, fontSizes } from '../../tokens';

const Portfolio = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoWiki, setInfoWiki] = useState();
  const [isModal, setIsModal] = useState(false);
  const { infoREC } = route.params;
  const { userName } = useStore();

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
                <Button icon={navigation} handle={() => setIsModal(true)}>
                  Navegar
                </Button>
              </S.PortifolioContact>
            </S.PortifolioContent>
          </ScrollView>
          <Popup
            isVisible={isModal}
            onCancelPressed={() => setIsModal(false)}
            onBackButtonPressed={() => setIsModal(false)}
            modalProps={{
              animationIn: 'slideInUp',
            }}
            style={{
              container: {
                backgroundColor: colors.secondary,
              },
              headerContainer: {
                paddingTop: 24,
                paddingBottom: 24,
                borderBottomColor: colors.secondary,
              },
              itemContainer: {
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: colors.white,
              },
              separatorStyle: {
                backgroundColor: colors.darkGreen,
              },
              itemText: {
                color: colors.primary,
              },
              titleText: {
                color: colors.white,
                fontWeight: 'bold',
                fontSize: fontSizes.large,
              },
              subtitleText: {
                color: colors.primary,
                fontWeight: '700',
                fontSize: fontSizes.medium,
              },
              cancelButtonContainer: {
                backgroundColor: colors.secondary,
              },
              cancelButtonText: {
                color: colors.primary,
              },
            }}
            options={{
              latitude: infoREC.location.latitude,
              longitude: infoREC.location.longitude,
              dialogTitle: `${userName}, estamos quase lá...`,
              dialogMessage: 'Qual aplicativo gostaria de usar?',
              cancelText: 'Cancelar',
            }}
          />
        </>
      )}
    </>
  );
};

export default Portfolio;
