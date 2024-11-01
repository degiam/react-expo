import { StyleProp, TextInput, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { IconSelector } from '@tabler/icons-react-native';

export function Fieldset({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ gap: 6 }}>
      {children}
    </View>
  )
}

const fieldStyle = {
  fontSize: 17,
  minHeight: 50,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: 'white',
};

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
        style={[
          fieldStyle,
          style,
        ]}
        {...otherProps}
      />
    </Fieldset>
  );
}

const fieldSelectStyle = {
  fontSize: 17,
  minHeight: 50,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#ccc',
  backgroundColor: 'white',
  paddingEnd: 32,
  appearance: 'none',
};

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
          onValueChange={handleValueChange}
          value={value}
          placeholder={{ label: placeholder, value: '' }}
          items={options}
          style={{
            inputWeb: fieldSelectStyle,
            inputIOS: fieldSelectStyle,
            inputAndroid: fieldSelectStyle,
          }}
        />
        <IconSelector size={18} color={'#aaa'} style={{ position: 'absolute', top: 16, right: 12, }} />
      </View>
    </Fieldset>
  );
}