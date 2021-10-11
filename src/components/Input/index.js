import React, { useState } from 'react';
import { Image } from 'react-native';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/closeEye.png';

import {
  InputText,
  Content,
  ContentPassword,
  SeePassword,
  HelpText,
} from './styles';
import { colors } from '../../tokens';

const Input = ({
  name,
  placeholder,
  handleChange,
  value,
  helpText,
  password,
}) => {
  const [seePassword, setSeePassword] = useState(true);

  return (
    <Content error={!!helpText}>
      {password ? (
        <ContentPassword>
          <InputText
            name={name}
            placeholder={placeholder}
            secureTextEntry={seePassword}
            onChangeText={(text) => handleChange(text)}
            value={value}
          />
          <SeePassword
            onPress={() => setSeePassword(!seePassword)}
            underlayColor={colors.white}
          >
            <Image source={seePassword ? Eye : CloseEye} />
          </SeePassword>
        </ContentPassword>
      ) : (
        <InputText
          placeholder={placeholder}
          onChangeText={(text) => handleChange(text)}
        />
      )}
      <HelpText>{helpText}</HelpText>
    </Content>
  );
};

export default Input;
