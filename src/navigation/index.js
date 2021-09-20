import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../tokens';
import { useStore } from '../providers/store';
import Logout from '../components/Logout';
import Main from '../pages/Main';
import Begin from '../pages/Begin';
import Portfolio from '../pages/Portfolio';
import CategoryList from '../pages/CategoryList';

const Stack = createStackNavigator();

const NavigationStyle = {
  headerStyle: {
    elevation: 0,
    backgroundColor: colors.backgroundPage,
  },
  headerTintColor: colors.primary,
};

const Navigation = () => {
  const { userName, setUserName } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  async function isStored() {
    try {
      const name = await AsyncStorage.getItem('1');
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
            initialRouteName={userName === null ? 'Begin' : 'Home'}
            screenOptions={NavigationStyle}
          >
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
