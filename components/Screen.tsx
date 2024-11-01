import { Platform, SafeAreaView, ScrollView, StyleProp, useColorScheme, ViewStyle } from 'react-native';
import { View } from '@/components/View';

type ContainerProps = {
  title?: string;
  scrollable?: boolean;
  align?: 'start' | 'center' | 'end';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export function Container({ title, scrollable = false, align, style, children }: ContainerProps) {
  if (Platform.OS === 'web') {
    document.title = title || 'Degiam App';
  }

  const colorScheme = useColorScheme();

  if (scrollable) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' && Platform.OS !== 'web' ? 'black' : 'white', }}>
        <ScrollView
          contentContainerStyle={[
            style,
            {
              flexGrow: 1,
              justifyContent: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
            }
          ]}
          style={{
            backgroundColor: colorScheme === 'dark' && Platform.OS !== 'web' ? 'black' : 'white',
          }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' && Platform.OS !== 'web' ? 'black' : 'white', }}>
      <View style={[
        style,
        {
          flex: 1,
          justifyContent: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
        }
      ]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

type SectionProps = {
  style?: StyleProp<ViewStyle>;
  padding?: boolean;
  children: React.ReactNode;
};

export function Section({ style, padding = true, children }: SectionProps) {
  return (
    <View style={[
      style,
      {
        padding: padding ? 24 : 0,
      }
    ]}>
      {children}
    </View>
  );
}