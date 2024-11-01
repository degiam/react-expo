import React, { useEffect, useState } from 'react';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';

export default function QrcodeScreen() {
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
    <Container scrollable={true}>
      <Section>
        <Text heading size='h4' align='center'>QR Code Generator</Text>
        <View style={{ marginTop: 20, }}>
          <Text align='center' italic>
            Work in progress{dots.padEnd(3, ' ')}
          </Text>
        </View>
      </Section>
    </Container>
  );
}