import { Pressable, StyleProp, useColorScheme, ViewStyle } from 'react-native';
import { Text } from '@/components/Text';
import getStyles, { ButtonType, ButtonVariant } from '@/constants/Button';

type ButtonProps = {
  title: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  align?: 'left' | 'right' | 'center' | 'around' | 'evenly' | 'between';
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export function Button(props: ButtonProps) {
  const {
    title,
    type = 'fill',
    variant = 'default',
    icon,
    iconPosition = 'left',
    align = 'center',
    style,
    ...otherProps
  } = props;

  const colorScheme: any = useColorScheme();
  const styles = getStyles(colorScheme);

  const button = styles[type][variant];
  const buttonStyle: any = {
    flexDirection: icon && iconPosition === 'left' ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : align === 'around' ? 'space-around' : align === 'evenly' ? 'space-evenly' : align === 'between' ? 'space-between' : 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: button.borderColor,
    backgroundColor: button.backgroundColor,
  };

  const buttonTextStyle = {
    color: button.color,
    marginHorizontal: icon ? 10 : 0,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        style,
        { transform: pressed ? [{ translateY: 1 }] : [{ translateY: 0 }] },
      ]}
      {...otherProps}
    >
      {icon}
      <Text style={[buttonTextStyle]}>{title}</Text>
    </Pressable>
  );
}