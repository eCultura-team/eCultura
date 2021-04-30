import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/index';
import Store from './src/providers/store';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Store>
        <Navigation />
      </Store>
    </>
  );
}
