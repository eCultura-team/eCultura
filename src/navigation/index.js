import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { BackHandler } from 'react-native';
import { colors } from '../tokens';
import Main from '../pages/Main';

const Stack = createStackNavigator();

const NavigationStyle = {
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.backgroundPage,
  },
};

const Navigation = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={NavigationStyle}>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{
            headerLeft: () => (
              <HeaderBackButton onPress={BackHandler.exitApp} />
            ),
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default Navigation;
