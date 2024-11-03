import { useEffect } from 'react';
import { Image, Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { ExternalLink } from '@/components/ExternalLink';

import { TextMono } from '@/components/Text';
import { colorLink } from '@/constants/Colors';

export default function PopupScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Tentang Kami' });
  }, [navigation]);

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Container>
        <Section>
          <View style={{ alignItems: 'center', marginBottom: 25 }}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <View style={{ justifyContent: 'center', gap: 10 }}>
            <Text heading size='h4' align='center'>Degiam App</Text>
            <View style={{
              marginHorizontal: 'auto',
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
            }} lightColor='#eee' darkColor='#444'>
              <TextMono size='sm' lightColor='#999' darkColor='white'>1.0.0</TextMono>
            </View>
          </View>
          <View style={{ justifyContent: 'center', gap: 10, marginTop: 40, marginBottom: 25 }}>
            <Text align='center'>Developed by Degiam</Text>
            <ExternalLink href='https://degiam.my.id' style={{ width: 'auto', marginHorizontal: 'auto' }}>
              <Text style={{ color: colorLink, textDecorationLine: 'underline' }}>https://degiam.my.id</Text>
            </ExternalLink>
          </View>
        </Section>
      </Container>
    </>
  );
}