import React, { useState, useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import { ScrollView, TouchableHighlight, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import iconUser from '../../assets/iconUser.png';

import Welcome from '../../components/Welcome';
import Map from '../../components/Map';
import CategoryMenu from '../../components/CategoryMenu';
import { Box } from './styles';
import Modal from '../../components/Modal';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Main = ({ navigation }) => {
  const [errorSend, setErrorSend] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const control = useRef(null);
  const controlNotificaton = useRef(null);

  const [expoPushToken, setExpoPushToken] = useState('');

  async function registerForPushNotificationsAsync() {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      setErrorNotification('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );
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

      <Modal
        control={controlNotificaton}
        buttonMessage="Fechar"
        error={errorNotification}
        handle={() => controlNotificaton.current?.close()}
      />
    </>
  );
};

export default Main;
