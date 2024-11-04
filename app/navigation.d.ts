import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  '(tabs)': undefined;
  'chat-detail': undefined;
  'modal': undefined;
};

export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'chat-detail'>;
