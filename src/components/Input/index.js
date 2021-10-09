import React, { useState } from 'react';
import { Image } from 'react-native';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/closeEye.png';

import { InputText, Content, ContentPassword, SeePassword } from './styles';
import { colors } from '../../tokens';

const Input = ({ placeholder, handleChange, password }) => {
  const [seePassword, setSeePassword] = useState(true);

  return (
    <Content>
      {password ? (
        <ContentPassword>
          <InputText
            placeholder={placeholder}
            secureTextEntry={seePassword}
            onChangeText={(text) => handleChange(text)}
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
    </Content>
  );
};

export default Input;
