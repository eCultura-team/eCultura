import React from 'react';
import { Image, BackHandler } from 'react-native';
import Exit from '../../assets/exit.png';
import { LogoutContent } from './style';
import { colors } from '../../tokens';

const Logout = () => (
  <>
    <LogoutContent
      onPress={BackHandler.exitApp}
      underlayColor={colors.secondary}
    >
      <Image source={Exit} />
    </LogoutContent>
  </>
);

export default Logout;
