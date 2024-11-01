const styles = {
  fill: {
    default: {
      color: '#888',
      borderColor: '#eee',
      backgroundColor: '#eee',
    },
    primary: {
      color: '#fff',
      borderColor: '#802b9f',
      backgroundColor: '#802b9f',
    },
    secondary: {
      color: '#fff',
      borderColor: '#3595b3',
      backgroundColor: '#3595b3',
    },
  },
  outline: {
    default: {
      color: '#aaa',
      borderColor: '#aaa',
      backgroundColor: 'transparent',
    },
    primary: {
      color: '#802b9f',
      borderColor: '#802b9f',
      backgroundColor: 'transparent',
    },
    secondary: {
      color: '#3595b3',
      borderColor: '#3595b3',
      backgroundColor: 'transparent',
    },
  },
} as const;

export default styles;

export type ButtonType = keyof typeof styles;
export type ButtonVariant = keyof typeof styles.fill;