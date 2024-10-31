import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Container, Section } from '@/components/Screen';

export default function ChatScreen() {
  return (
    <Container>
      <Section>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Exercitation pariatur aute exercitation veniam ex est sunt.
        </Text>
      </Section>
    </Container>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
