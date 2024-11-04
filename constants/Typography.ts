import { Platform } from 'react-native';

export const theme = {
  color: {
    light: 'rgba(0,0,0,0.5)',
    dark: 'rgba(255,255,255,0.5)',
  },
};

const styles = {
  h1: {
    fontSize: Platform.OS === 'android' ? 44 : 54,
    lineHeight: Platform.OS === 'android' ? 51 : 61,
    fontWeight: '700',
  },
  h2: {
    fontSize: Platform.OS === 'android' ? 36 : 48,
    lineHeight: Platform.OS === 'android' ? 43 : 55,
    fontWeight: '700',
  },
  h3: {
    fontSize: Platform.OS === 'android' ? 32 : 44,
    lineHeight: Platform.OS === 'android' ? 39 : 51,
    fontWeight: '700',
  },
  h4: {
    fontSize: Platform.OS === 'android' ? 28 : 36,
    lineHeight: Platform.OS === 'android' ? 35 : 43,
    fontWeight: '700',
  },
  h5: {
    fontSize: Platform.OS === 'android' ? 24 : 32,
    lineHeight: Platform.OS === 'android' ? 31 : 39,
    fontWeight: '700',
  },
  h6: {
    fontSize: Platform.OS === 'android' ? 20 : 28,
    lineHeight: Platform.OS === 'android' ? 27 : 35,
    fontWeight: '700',
  },
  p: {
    fontSize: Platform.OS === 'android' ? 15 : 17,
    lineHeight: Platform.OS === 'android' ? 22 : 24,
    fontWeight: '400',
  },
  sm: {
    fontSize: Platform.OS === 'android' ? 12 : 14,
    lineHeight: Platform.OS === 'android' ? 18 : 20,
    fontWeight: '400',
  },
} as const;

export default styles;

export type TextSize = keyof typeof styles;