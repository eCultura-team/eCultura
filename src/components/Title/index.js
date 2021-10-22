import React from 'react';
import { TitleContent, TitleContentText } from './style';

const Title = ({ children }) => (
  <>
    <TitleContent>
      <TitleContentText>{children}</TitleContentText>
    </TitleContent>
  </>
);

export default Title;
