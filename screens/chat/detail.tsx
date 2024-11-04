import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Section } from '@/components/Screen';
import { ExternalLink } from '@/components/ExternalLink';
import { Button } from '@/components/Button';
import { IconBrandWhatsapp } from '@tabler/icons-react-native';

export default function ChatDetailScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Chat Link' });
  }, [navigation]);

  const route = useRoute();
  const { phone }: any = route.params;
  const phoneNumber = phone.startsWith('0') ? `62${phone.slice(1)}` : phone;

  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    if (phoneNumber) {
      setWhatsapp(`https://api.whatsapp.com/send/?phone=${phoneNumber}`);
    }
  },[])

  return (
    <Container scrollable>
      <Section style={{ gap: 30 }}>
        <ExternalLink href={whatsapp}>
          <Button
            title='Chat WhatsApp'
            variant='primary'
            icon={<IconBrandWhatsapp color='white' />}
            style={{
              backgroundColor: '#25D366',
              borderColor: '#25D366',
            }}
          />
        </ExternalLink>
      </Section>
    </Container>
  );
}