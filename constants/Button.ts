import { colorPrimary, colorSecondary } from '@/constants/Colors';

const getStyles = (colorScheme: 'light' | 'dark') => ({
  fill: {
    default: {
      color: colorScheme === 'light' ? '#888' : 'white',
      borderColor: colorScheme === 'light' ? '#eee' : '#333',
      backgroundColor: colorScheme === 'light' ? '#eee' : '#333',
    },
    primary: {
      color: '#fff',
      borderColor: colorPrimary,
      backgroundColor: colorPrimary,
    },
    secondary: {
      color: '#fff',
      borderColor: colorSecondary,
      backgroundColor: colorSecondary,
    },
  },
  outline: {
    default: {
      color: '#aaa',
      borderColor: '#aaa',
      backgroundColor: 'transparent',
    },
    primary: {
      color: colorPrimary,
      borderColor: colorPrimary,
      backgroundColor: 'transparent',
    },
    secondary: {
      color: colorSecondary,
      borderColor: colorSecondary,
      backgroundColor: 'transparent',
    },
  },
});

export default getStyles;

export type ButtonType = keyof ReturnType<typeof getStyles>;
export type ButtonVariant = keyof ReturnType<typeof getStyles>['fill'];