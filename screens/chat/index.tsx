import React, { useEffect, useState } from 'react';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';

export default function ChatScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev: any) => {
        if (prev.length < 3) {
          return prev + '.';
        }
        return '';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Section>
        <Text heading size='h4' align='center'>Chat Link</Text>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
          <Text align='center' italic>Work in progress</Text>
          <Text align='center' italic style={{ minWidth: 20, textAlign: 'left' }}> {dots}</Text>
        </View>
      </Section>
    </Container>
  );
}