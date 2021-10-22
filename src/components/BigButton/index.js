import React from 'react';
import { Image } from 'react-native';

import { Content, ContentButton, Info, Text } from './styles';
import { colors } from '../../tokens';

const BigButton = ({ image, text, handle, disabled }) => (
  <Content>
    <ContentButton
      onPress={handle}
      underlayColor={colors.primary}
      disabled={disabled}
    >
      <Info>
        <Image source={image} />
        <Text>{text}</Text>
      </Info>
    </ContentButton>
  </Content>
);

export default BigButton;
