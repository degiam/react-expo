import React, { useState } from 'react';
import { ActivityIndicator, Image, useColorScheme } from 'react-native';

import { colorPrimary } from '@/constants/Colors';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Button } from '@/components/Button';
import { Input, Select } from '@/components/Form';

import { IconDownload, IconReload } from '@tabler/icons-react-native';

export default function QrcodeScreen() {
  const colorScheme = useColorScheme();

  const [text, setText] = useState('');
  const [size, setSize] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerate = async () => {
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${size}`);
  };

  const handleDownload = () => {
    console.warn('Fitur belum tersedia');
  };

  const handleReload = () => {
    setText('');
    setQrCode('');
  };

  return (
    <Container scrollable>
      {!qrCode ?
        <Section style={{ gap: 24 }}>
          <Input
            label='Masukkan URL'
            placeholder='https://'
            onChangeText={setText}
          />
          <Select
            label='Pilih Ukuran'
            placeholder='Pilih salah satu'
            onValueChange={setSize}
            value={size}
            options={[
              { label: '512 pixel', value: '512x512' },
              { label: '720 pixel', value: '720x720' },
              { label: '1080 pixel', value: '1080x1080' },
              { label: '1440 pixel', value: '1440x1440' },
              { label: '2160 pixel', value: '2160x2160' },
            ]}
          />
          <Button
            title='Buat Sekarang'
            variant='primary'
            onPress={handleGenerate}
            style={{
              marginTop: 4,
            }}
          />
        </Section>
      :
        <Section style={{ gap: 24 }}>
          <View style={{
            position: 'relative',
            backgroundColor: 'white',
            padding: 16,
            margin: 'auto',
            borderWidth: 1,
            borderColor: '#ddd',
          }}>
            <Image
              source={{ uri: qrCode }}
              style={{
                width: 250,
                height: 250,
                position: 'relative',
                zIndex: 1,
              }}
            />
            <ActivityIndicator
              size='large'
              color={colorPrimary}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto',
              }}
            />
          </View>
          <Button
            title='Unduh'
            variant='primary'
            icon={<IconDownload size={24} color={'white'} />}
            onPress={handleDownload}
          />
          <Button
            title='Buat Lagi'
            icon={<IconReload size={24} color={colorScheme === 'light' ? '#999' : 'white'} />}
            onPress={handleReload}
          />
        </Section>
      }
    </Container>
  );
}