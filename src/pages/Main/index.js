import React from 'react';
import { MainContent } from './style';
import Hello from '../../components/Hello/index';
import Welcome from '../../components/Welcome';

const Main = () => (
  <>
    <Welcome />
    <MainContent>
      <Hello />
    </MainContent>
  </>
);

export default Main;
