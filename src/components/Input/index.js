import React, { useState } from 'react';
import { Image } from 'react-native';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/closeEye.png';

import { InputText, Content, Box, HelpText, ImageContent } from './styles';
import { colors } from '../../tokens';

const Input = ({
  name,
  placeholder,
  handleChange,
  value,
  helpText,
  password,
  disabled,
  icon,
}) => {
  const [seePassword, setSeePassword] = useState(true);

  return (
    <Content error={!!helpText}>
      <Box>
        {password ? (
          <>
            <InputText
              name={name}
              placeholder={placeholder}
              secureTextEntry={seePassword}
              onChangeText={(text) => handleChange(text)}
              defaultValue={value}
              editable={!disabled}
            />
            <ImageContent
              onPress={() => setSeePassword(!seePassword)}
              underlayColor={colors.white}
            >
              <Image source={seePassword ? Eye : CloseEye} />
            </ImageContent>
          </>
        ) : (
          <>
            <InputText
              placeholder={placeholder}
              defaultValue={value}
              onChangeText={(text) => handleChange(text)}
              editable={!disabled}
            />
            {icon && (
              <ImageContent
                onPress={
                  disabled
                    ? () => alert('Este campo não pode ser alterado')
                    : null
                }
                underlayColor={colors.white}
              >
                <Image source={icon} />
              </ImageContent>
            )}
          </>
        )}
      </Box>
      <HelpText>{helpText ?? ''}</HelpText>
    </Content>
  );
};

export default Input;
