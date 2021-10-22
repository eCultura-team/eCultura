import React from 'react';
import { ScrollView, TouchableHighlight, Image } from 'react-native';
import iconUser from '../../assets/iconUser.png';

import Welcome from '../../components/Welcome';
import Map from '../../components/Map';
import CategoryMenu from '../../components/CategoryMenu';
import { Box } from './styles';

const Main = ({ navigation }) => (
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
      <Map navigation={navigation} />
      <CategoryMenu navigation={navigation} />
    </ScrollView>
  </>
);

export default Main;
