import { StyleSheet } from 'react-native';
import { fontFamilies, colors } from './src/tokens';

const globalStyles = StyleSheet.create({
  content: {
    backgroundColor: colors.backgroundPage,
    fontFamily: fontFamilies.primary,
    flex: 1,
    color: 'red',
  },
});

export default globalStyles;
