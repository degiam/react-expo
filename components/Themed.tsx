/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

import styles, { theme } from '@/constants/Typography';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type TypeProps = {
  heading?: boolean;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  italic?: boolean;
};

export type TextProps = ThemeProps & TypeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    heading,
    size = 'p',
    italic = false,
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

  return <DefaultText style={[{ color }, textSize, textItalic, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
