import React from 'react';
import { TitleContent, TitleContentText } from './style';

const CategoryTitle = ({ children }) => (
  <>
    <TitleContent>
      <TitleContentText>{children}</TitleContentText>
    </TitleContent>
  </>
);

export default CategoryTitle;
