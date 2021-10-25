import React, { useState, useRef } from 'react';
import { ScrollView, TouchableHighlight, Image } from 'react-native';
import iconUser from '../../assets/iconUser.png';

import Welcome from '../../components/Welcome';
import Map from '../../components/Map';
import CategoryMenu from '../../components/CategoryMenu';
import { Box } from './styles';
import Modal from '../../components/Modal';

const Main = ({ navigation }) => {
  const [errorSend, setErrorSend] = useState(false);
  const control = useRef(null);

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
