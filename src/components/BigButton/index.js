import React from 'react';
import { Image } from 'react-native';

import { Content, ContentButton, Info, Text } from './styles';
import { colors } from '../../tokens';

const BigButton = ({ image, text, handle }) => (
  <Content>
    <ContentButton onPress={handle} underlayColor={colors.primary}>
      <Info>
        <Image source={image} />
        <Text>{text}</Text>
      </Info>
    </ContentButton>
  </Content>
);

export default BigButton;
