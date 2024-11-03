import { Link, Stack } from 'expo-router';

import { Container, Section } from '@/components/Screen';
import { Text } from '@/components/Text';

import { colorLink } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Section>
          <Text heading size='h5' align='center'>Laman tidak ditemukan</Text>
          <Link href='/' style={{ marginHorizontal: 'auto', marginVertical: 25 }}>
            <Text size='sm' style={{ color: colorLink, textDecorationLine: 'underline' }}>Kembali ke beranda</Text>
          </Link>
        </Section>
      </Container>
    </>
  );
}