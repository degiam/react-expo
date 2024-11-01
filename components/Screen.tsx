import { Platform, ScrollView, StyleProp, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { View } from '@/components/View';

type ContainerProps = {
  title?: string;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export function Container({ title, scrollable = false, style, children }: ContainerProps) {
  if (Platform.OS === 'web') {
    document.title = title || 'Degiam App';
  }

  const colorScheme = useColorScheme();

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          style,
        ]}
        style={{
          backgroundColor: colorScheme === 'dark' && Platform.OS !== 'web' ? 'black' : 'white',
        }}
      >
        {children}
      </ScrollView>
    )
  }

  return (
    <View style={[
      styles.container,
      style,
    ]}>
      {children}
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})