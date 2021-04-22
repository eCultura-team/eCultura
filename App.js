import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/index';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}
