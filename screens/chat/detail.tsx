import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { Container, Section } from '@/components/Screen';
import { ExternalLink } from '@/components/ExternalLink';
import { Text } from '@/components/Text';
import { IconBrandWhatsapp } from '@tabler/icons-react-native';
import { View } from '@/components/View';

export default function ChatDetailScreen() {
  const route = useRoute();
  const { phone }: any = route.params;
  const phoneNumber = phone.startsWith('0') ? `62${phone.slice(1)}` : phone;

  const [call, setCall] = useState('');
  const [sms, setSms] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    if (phoneNumber) {
      setCall(`tel:+${phoneNumber}`);
      setSms(`sms:+${phoneNumber}`);
      setWhatsapp(`https://api.whatsapp.com/send/?phone=${phoneNumber}`);
    }
  },[])

  return (
    <Container>
      <Section style={{ gap: 30 }}>
        <ExternalLink href={call}>
          <View style={styles.container}>
            <View style={[
              styles.button,
              {
                backgroundColor: '#3740c1',
                borderColor: '#3740c1',
              }
            ]}>
              <IconBrandWhatsapp color='white' style={{ flexShrink: 0 }} />
              <Text style={{ color: 'white' }}>Telepon Sekarang</Text>
            </View>
          </View>
        </ExternalLink>

        <ExternalLink href={sms}>
          <View style={styles.container}>
            <View style={[
              styles.button,
              {
                backgroundColor: '#e640bc',
                borderColor: '#e640bc',
              }
            ]}>
              <IconBrandWhatsapp color='white' style={{ flexShrink: 0 }} />
              <Text style={{ color: 'white' }}>Kirim SMS</Text>
            </View>
          </View>
        </ExternalLink>

        <ExternalLink href={whatsapp}>
          <View style={styles.container}>
            <View style={[
              styles.button,
              {
                backgroundColor: '#15c155',
                borderColor: '#15c155',
              }
            ]}>
              <IconBrandWhatsapp color='white' style={{ flexShrink: 0 }} />
              <Text style={{ color: 'white' }}>Chat WhatsApp</Text>
            </View>
          </View>
        </ExternalLink>
      </Section>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1,
  },
})