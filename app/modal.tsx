import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import PopupScreen from '@/screens/popup';

export default function ModalScreen() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <PopupScreen />
    </>
  );
}