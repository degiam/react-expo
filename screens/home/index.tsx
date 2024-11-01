import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';

import axios from 'axios';
import { IconMessageChatbot, IconQrcode } from '@tabler/icons-react-native';

type QuoteProps = {
  content: string;
  author: string;
};

type RootStackParamList = {
  index: undefined;
  qrcode: undefined;
  chat: undefined;
};

export default function HomeScreen() {
  const [quote, setQuote] = useState<QuoteProps | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      axios.get('https://zenquotes.io/api/quotes')
      .then((result: any) => {
        const data = result.data;
        if (data.length > 0) {
          setQuote({
            content: data[0].q,
            author: data[0].a,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    getQuote();
  },[]);

  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  return (
    <Container scrollable>
      <Section>
        <Text heading size='h2' align='center'>Selamat datang!</Text>
        {quote &&
          <View style={{ marginTop: 20, }}>
            <Text align='center'>{quote.content}</Text>
            <Text align='center' italic style={{ marginTop: 5 }}>— {quote.author}</Text>
          </View>
        }
      </Section>

      <Section>
        <View style={{
          gap: 20,
          marginBottom: 30,
        }}>
          <Button
            title='QR Code'
            variant='primary'
            icon={<IconQrcode size={24} color={'white'} />}
            onPress={() => navigation.navigate('qrcode')}
          />
          <Button
            title='Chat'
            variant='primary'
            icon={<IconMessageChatbot size={24} color={'white'} />}
            onPress={() => navigation.navigate('chat')}
          />
        </View>
      </Section>
    </Container>
  );
}