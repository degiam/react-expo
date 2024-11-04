import { useState } from 'react';
import { KeyboardTypeOptions, Platform, StyleProp, TextInput, useColorScheme, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { View } from '@/components/View';
import { Text } from '@/components/Text';

import { IconSelector } from '@tabler/icons-react-native';

type FieldStyleProps = {
  type: 'text' | 'select' | 'border' | 'placeholder';
  isFocused: boolean;
}

function useFieldStyle(props: FieldStyleProps) {
  const { type, isFocused } = props;

  const colorScheme = useColorScheme();

  const style = {
    fontSize: Platform.OS === 'android' ? 15 : 17,
    minHeight: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    color: colorScheme === 'light' ? 'black' : 'white',
    backgroundColor: colorScheme === 'light' ? 'white' : '#222',
    borderColor: isFocused
      ? '#802b9f'
      : colorScheme === 'light' ? '#ccc' : '#333',
    outline: isFocused
      ? '1px solid #802b9f'
      : 'none',
  }

  if (type === 'select') {
    return {
      ...style,
      paddingEnd: 32,
      appearance: 'none' as const,
    }
  }

  if (type === 'border') {
    return {
      borderColor: isFocused
        ? '#802b9f'
        : colorScheme === 'light' ? '#ccc' : '#333',
      borderWidth: 1,
      borderRadius: 12,
      overflow: 'hidden' as const,
    }
  }

  return {
    ...style,
  };
}

export function Fieldset({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ gap: 6 }}>
      {children}
    </View>
  )
}

type InputProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export function Input(props: InputProps) {
  const {
    label,
    value,
    defaultValue,
    placeholder,
    style,
    onChangeText,
    keyboardType = 'default',
    ...otherProps
  } = props;

  const colorScheme = useColorScheme();
  const placeholderStyle = colorScheme === 'light' ? '#ccc' : '#666';

  const [isFocused, setIsFocused] = useState(false);
  const inputStyle = useFieldStyle({ type: 'text', isFocused });

  const handleValueChange = (value: string) => {
    if (onChangeText) {
      onChangeText(value);
    }
  };

  return (
    <Fieldset>
      <Text size='sm'>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderStyle}
        value={value}
        defaultValue={defaultValue}
        onChangeText={handleValueChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          inputStyle,
          style,
        ]}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'url' ? 'none' : 'sentences'}
        {...otherProps}
      />
    </Fieldset>
  );
}

type SelectProps = {
  label: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onValueChange?: (value: string, index: number) => void;
};

export function Select(props: SelectProps) {
  const {
    label,
    placeholder,
    options,
    value,
    onValueChange,
  } = props;

  const colorScheme = useColorScheme();
  const placeholderStyle = colorScheme === 'light' ? '#ccc' : '#666';

  const [isFocused, setIsFocused] = useState(false);
  const inputStyle = useFieldStyle({ type: 'select', isFocused });
  const borderStyle = useFieldStyle({ type: 'border', isFocused });

  const handleValueChange = (value: string) => {
    const index = options.findIndex(option => option.value === value);
    if (onValueChange) {
      onValueChange(value, index);
    }
  };

  return (
    <Fieldset>
      <Text size='sm'>{label}</Text>
      <View style={{ position: 'relative' }}>
        <RNPickerSelect
          placeholder={{ label: placeholder, value: '' }}
          value={value}
          items={options}
          onValueChange={handleValueChange}
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          style={{
            inputWeb: inputStyle,
            inputIOS: inputStyle,
            inputAndroid: inputStyle,
            viewContainer: borderStyle,
            placeholder: {
              color: placeholderStyle,
            },
          }}
          useNativeAndroidPickerStyle={false}
        />
        <IconSelector size={18} color={'#aaa'} style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 18 : 17,
          right: 12,
        }} />
      </View>
    </Fieldset>
  );
}