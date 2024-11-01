export const theme = {
  color: {
    light: 'rgba(0,0,0,0.5)',
    dark: 'rgba(255,255,255,0.5)',
  },
};

const styles = {
  h1: {
    fontSize: 54,
    lineHeight: 61,
    fontWeight: '700',
  },
  h2: {
    fontSize: 48,
    lineHeight: 55,
    fontWeight: '700',
  },
  h3: {
    fontSize: 44,
    lineHeight: 51,
    fontWeight: '700',
  },
  h4: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '700',
  },
  h5: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '700',
  },
  h6: {
    fontSize: 28,
    lineHeight: 35,
    fontWeight: '700',
  },
  p: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
} as const;

export default styles;

export type TextSize = keyof typeof styles;