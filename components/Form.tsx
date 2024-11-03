import { StyleProp, TextInput, useColorScheme, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { IconSelector } from '@tabler/icons-react-native';
import { useState } from 'react';

type FieldStyleProps = {
  type: 'text' | 'select';
  isFocused: boolean;
}

function useFieldStyle(props: FieldStyleProps) {
  const { type, isFocused } = props;

  const colorScheme = useColorScheme();

  const style = {
    fontSize: 17,
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
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (value: string) => void;
};

export function Input(props: InputProps) {
  const {
    label,
    value,
    defaultValue,
    placeholder,
    style,
    onChangeText,
    ...otherProps
  } = props;

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
        value={value}
        defaultValue={defaultValue}
        onChangeText={handleValueChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          inputStyle,
          style,
        ]}
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

  const [isFocused, setIsFocused] = useState(false);
  const inputStyle = useFieldStyle({ type: 'select', isFocused });

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
          }}
        />
        <IconSelector size={18} color={'#aaa'} style={{ position: 'absolute', top: 16, right: 12, }} />
      </View>
    </Fieldset>
  );
}