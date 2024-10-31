import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Container, Section } from '@/components/Screen';

export default function QrcodeScreen() {
  return (
    <Container scrollable={true}>
      <Section>
        <Text style={styles.title}>Generate</Text>
        <View style={styles.separator} lightColor="#ddd" darkColor="rgba(255,255,255,0.1)" />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Anim ut in mollit nulla adipisicing labore sunt dolor occaecat ad consequat.
        </Text>
      </Section>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
