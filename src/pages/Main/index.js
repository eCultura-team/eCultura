import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from 'react-native';
import iconUser from '../../assets/iconUser.png';

import api from '../../services/api';
import { useStore } from '../../providers/store';
import fire from '../../services/fire';

import Welcome from '../../components/Welcome';
import Map from '../../components/Map';
import CategoryMenu from '../../components/CategoryMenu';
import { Box } from './styles';
import Modal from '../../components/Modal';

const Main = ({ navigation }) => {
  const [errorSend, setErrorSend] = useState(false);
  const control = useRef(null);
  const { userData, setUserData, setAccessToken, setUserName } = useStore();

  const signOut = () => {
    fire
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('token');

        setAccessToken(null);
        setUserName(null);
        setUserData({ uid: '', email: '' });
        navigation.navigate('Login');
      })
      .catch((e) => console.log(e));
  };

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      if (userData.uid === '') {
        api
          .get('/getUserData')
          .then(({ data: { uid, email, status } }) => {
            if (status === 200) {
              setUserData({ uid, email });
            } else {
              signOut();
            }
          })
          .catch((e) => console.log(e));
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <ScrollView>
        <Box>
          <Welcome />
          <TouchableHighlight
            onPress={() => navigation.navigate('Settings')}
            underlayColor="transparent"
          >
            <Image source={iconUser} />
          </TouchableHighlight>
        </Box>
        <Map
          navigation={navigation}
          modalControls={{ control, errorSend, setErrorSend }}
        />
        <CategoryMenu navigation={navigation} />
      </ScrollView>
      <Modal
        control={control}
        buttonMessage="Fechar"
        error={errorSend}
        handle={() => control.current?.close()}
      />
    </>
  );
};

export default Main;
