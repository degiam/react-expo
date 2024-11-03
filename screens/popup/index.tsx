import { Image } from 'react-native';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { ExternalLink } from '@/components/ExternalLink';
import { colorSecondary } from '@/constants/Colors';

export default function PopupScreen() {
  return (
    <Container>
      <Section>
        <View style={{ alignItems: 'center', marginBottom: 25 }}>
          <Image
            source={{ uri: 'assets/images/favicon.svg' }}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <Text heading size='h4' align='center'>Degiam App</Text>
        <View style={{ marginTop: 20, justifyContent: 'center' }}>
          <Text align='center'>Developed by Degiam</Text>
          <Text align='center' size='sm' style={{ marginTop: 5, marginBottom: 15 }}>v1.0.0</Text>
          <ExternalLink href='https://degiam.my.id' style={{ textAlign: 'center' }}>
            <Text style={{ color: colorSecondary }}>degiam.my.id</Text>
          </ExternalLink>
        </View>
      </Section>
    </Container>
  );
}