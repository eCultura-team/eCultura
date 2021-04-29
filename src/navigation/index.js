import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../tokens';
import Logout from '../components/Logout';
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
            headerLeft: () => <Logout />,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default Navigation;
