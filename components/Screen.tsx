import { Platform, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';

function Title({ title }: {title?: string}) {
  if (Platform.OS === 'web') {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Aplikasi Uji Coba';
    }
  }

  return true;
}

export function Container({ title, children }: {title?: string, children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <Title title={title} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})