/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useStore } from '../providers/store';

import { colors } from '../tokens';
import Logout from '../components/Logout';
import Main from '../pages/Main';
import Begin from '../pages/Begin';
import Portfolio from '../pages/Portfolio';
import CategoryList from '../pages/CategoryList';
import Login from '../pages/Login';
import RegisterContent from '../pages/Register';

const Stack = createStackNavigator();

const NavigationStyle = {
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.backgroundPage,
  },
  headerTintColor: colors.primary,
};

const Navigation = () => {
  const { accessToken, setAccessToken, userName, setUserName } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  async function isStored() {
    try {
      const token = await AsyncStorage.getItem('token');
      setAccessToken(token);

      const name = await AsyncStorage.getItem('userName');
      setUserName(name);

      setIsLoading(false);
    } catch (error) {
      alert('Nome não registrado.');
    }
  }

  useEffect(() => {
    isStored();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              accessToken === null && userName === null
                ? 'Login'
                : accessToken === null && userName !== null
                ? 'Home'
                : 'Begin'
            }
            screenOptions={NavigationStyle}
          >
            <Stack.Screen
              name="Register"
              component={RegisterContent}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Begin"
              component={Begin}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Main}
              options={{
                headerLeft: () => <Logout />,
                title: '',
              }}
            />
            <Stack.Screen
              name="CategoryList"
              component={CategoryList}
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="Portfolio"
              component={Portfolio}
              options={{
                title: '',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default Navigation;
