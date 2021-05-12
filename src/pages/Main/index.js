import React from 'react';
import { ScrollView } from 'react-native';
import Welcome from '../../components/Welcome';
import Map from '../../components/Map';
import CategoryMenu from '../../components/CategoryMenu';

const Main = ({ navigation }) => (
  <>
    <ScrollView>
      <Welcome />
      <Map />
      <CategoryMenu navigation={navigation} />
    </ScrollView>
  </>
);

export default Main;
