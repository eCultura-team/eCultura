import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { Popup } from 'react-native-map-link';
import loading from '../../assets/loading.gif';
import global from '../../assets/global.png';
import phone from '../../assets/phone.png';
import navigation from '../../assets/navigation.png';
import * as S from './style';
import Button from '../../components/Button';
import { useStore } from '../../providers/store';
import { colors, fontSizes } from '../../tokens';

const Portfolio = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const { userName } = useStore();
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
              headerContainer: {
                paddingTop: 24,
                paddingBottom: 24,
                borderBottomColor: colors.primary,
                backgroundColor: colors.primary,
              },
              itemContainer: {
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: colors.white,
              },
              separatorStyle: {
                backgroundColor: colors.primary,
              },
              itemText: {
                color: colors.primary,
              },
              titleText: {
                color: colors.secondary,
                fontWeight: 'bold',
                fontSize: fontSizes.medium,
              },
              subtitleText: {
                color: colors.white,
                fontWeight: '700',
                fontSize: fontSizes.large,
              },
              cancelButtonContainer: {
                backgroundColor: colors.secondary,
              },
              cancelButtonText: {
                color: colors.white,
                fontSize: fontSizes.medium,
              },
            }}
            options={{
              latitude: data?.lat,
              longitude: data?.long,
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
