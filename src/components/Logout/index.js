import React from 'react';
import { Image, BackHandler } from 'react-native';
import LogoutImg from '../../assets/Logout.png';
import { LogoutContent } from './style';
import { colors } from '../../tokens';

const Logout = () => (
  <>
    <LogoutContent
      onPress={BackHandler.exitApp}
      underlayColor={colors.secondary}
    >
      <Image source={LogoutImg} />
    </LogoutContent>
  </>
);

export default Logout;
