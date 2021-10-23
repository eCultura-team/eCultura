/* eslint-disable global-require */
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  AsyncStorage,
  Dimensions,
  View,
  Linking,
} from 'react-native';
import WebView from 'react-native-webview';
import { Popup } from 'react-native-map-link';
import LottieView from 'lottie-react-native';
import { Modalize } from 'react-native-modalize';
import loading from '../../assets/loading.gif';
import global from '../../assets/global.png';
import phone from '../../assets/phone.png';
import navigation from '../../assets/navigation.png';
import Close from '../../assets/close.png';
import * as S from './style';
import Button from '../../components/Button';
import { useStore } from '../../providers/store';
import { colors, fontSizes } from '../../tokens';

import api from '../../services/api';

const Portfolio = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [logged, setLogged] = useState();
  const [userId, setUserId] = useState('');
  const { height: initialHeight } = Dimensions.get('window');
  const [height, setHeight] = useState(initialHeight);
  const { userName } = useStore();
  const { data } = route.params;

  const modalControl = useRef(null);
  const animation = useRef(null);
  const isFirstRun = useRef(true);

  const isLogged = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
      setLogged(false);
    } else {
      api
        .get('/getUserData')
        .then(({ data: { uid } }) => setUserId(uid))
        .catch((e) => console.log(e));
      setLogged(true);
    }
  };

  const handleFavorite = () => {
    if (!logged) {
      alert(
        'Apenas usuários cadastrados podem favoritar lugares, cadastre-se ou faça login no app.',
      );
    } else {
      setIsFavorited(!isFavorited);
    }
  };

  const handleLayout = ({ layout }) => {
    setHeight(layout.height);
  };

  useEffect(() => {
    isLogged();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isFirstRun.current) {
        if (isFavorited) {
          animation.current.play(120, 190);
        } else {
          animation.current.play(1, 84);
        }
        isFirstRun.current = false;
      } else if (isFavorited) {
        animation.current.play(1, 190);
      } else {
        animation.current.play(120, 84);
      }
    }
  }, [animation.current, isFavorited]);

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
                <S.ImageContent>
                  <Image
                    source={{ uri: data?.photo[0] }}
                    style={{ width: 353, height: 207, borderRadius: 8 }}
                  />
                  <S.Favorite
                    onPress={handleFavorite}
                    underlayColor={colors.transparent}
                  >
                    <LottieView
                      ref={animation}
                      source={require('../../assets/lottie/favorite.json')}
                      autoPlay={false}
                      loop={false}
                      style={{ width: 50, height: 50, marginTop: 3.3 }}
                    />
                  </S.Favorite>
                </S.ImageContent>
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
                  <Button
                    icon={global}
                    handle={() => modalControl.current?.open()}
                  >
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

          <Modalize
            modalHeight={800}
            ref={modalControl}
            panGestureEnabled={false}
            onLayout={handleLayout}
            HeaderComponent={
              <S.ModalHeader>
                <S.ModalTitle>eCultura Browser</S.ModalTitle>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 90,
                    justifyContent: 'space-between',
                  }}
                >
                  <S.ModalOptions
                    onPress={() => Linking.openURL(data?.website)}
                    underlayColor={colors.darkGreen}
                  >
                    <S.ModalOptionsImage source={global} />
                  </S.ModalOptions>
                  <S.ModalOptions
                    onPress={() => modalControl.current?.close()}
                    underlayColor={colors.darkGreen}
                  >
                    <S.ModalOptionsImage source={Close} />
                  </S.ModalOptions>
                </View>
              </S.ModalHeader>
            }
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1, height }}>
              <WebView
                style={{ minHeight: height }}
                source={{ uri: data?.website }}
                scrollEnabled
              />
            </ScrollView>
          </Modalize>
        </>
      )}
    </>
  );
};

export default Portfolio;
