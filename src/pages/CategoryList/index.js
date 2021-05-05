import React from 'react';
import CategoryTitle from '../../components/CategoryTitle';

const CategoryList = ({ route }) => (
  <>
    <CategoryTitle>{route.params.title}</CategoryTitle>
  </>
);

export default CategoryList;
