import { Text as DefaultText } from 'react-native';
import { ThemeProps, useThemeColor } from '@/components/useThemeColor';
import styles, { theme, TextSize } from '@/constants/Typography';

type TypeProps = {
  heading?: boolean;
  size?: TextSize;
  italic?: boolean;
  align?: 'left' | 'right' | 'center' | 'justify';
};

export type TextProps = ThemeProps & TypeProps & DefaultText['props'];

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    heading,
    size = 'p',
    italic = false,
    align,
    ...otherProps
  } = props;

  const color = useThemeColor(
    {
      light: !heading && !lightColor ? theme.color.light : lightColor,
      dark: !heading && !darkColor ? theme.color.dark : darkColor,
    },
  'text');

  const textSize = styles[size] || styles.p;
  const textItalic: any = italic ? { fontStyle: 'italic' } : {};
  const textAlign: any = { textAlign: align === 'right' ? 'right' : align === 'center' ? 'center' : align === 'justify' ? 'justify' : 'left' };

  return <DefaultText style={[{ color }, textSize, textItalic, textAlign, style]} {...otherProps} />;
}