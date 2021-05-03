import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/index';
import Store from './src/providers/store';
import { colors } from './src/tokens';

export default function App() {
  return (
    <>
      <StatusBar style="auto" backgroundColor={colors.primary} />
      <Store>
        <Navigation />
      </Store>
    </>
  );
}
