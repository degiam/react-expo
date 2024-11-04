import React, { useState } from 'react';
import { ActivityIndicator, Image, useColorScheme } from 'react-native';

import { colorPrimary } from '@/constants/Colors';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text, TextMono } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input, Select } from '@/components/Form';

import { IconDownload, IconReload } from '@tabler/icons-react-native';

import { useForm, Controller } from 'react-hook-form';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function QrcodeScreen() {
  const colorScheme = useColorScheme();

  const [text, setText] = useState('');
  const [size, setSize] = useState('');
  const [qrCode, setQrCode] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleGenerate = async () => {
    if (!text || !size) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${size}`;
    setQrCode(qrUrl);
  };

  const handleDownload = async () => {
    if (!qrCode) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin akses untuk menyimpan gambar diperlukan.');
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}qrcode.png`;
      await FileSystem.downloadAsync(qrCode, fileUri);

      await MediaLibrary.saveToLibraryAsync(fileUri);
      alert('QR Code berhasil diunduh dan disimpan ke galeri.');
    } catch (error) {
      console.error(error);
      alert('Gagal mengunduh QR Code.');
    }
  };

  const handleReload = () => {
    setText('');
    setQrCode('');
    setSize('');
  };

  return (
    <Container scrollable>
      {!qrCode ?
        <Section style={{ gap: 24 }}>
          <View>
            <Controller
              control={control}
              name='url'
              rules={{
                required: 'URL harus diisi',
                validate: {
                  isValidURL: value => {
                    const urlPattern = new RegExp(
                      '^(https?:\\/\\/)' + // Protocol
                      '((([a-z0-9]\\w*)\\.)+([a-z]{2,})|' + // Domain name
                      'localhost|' + // localhost...
                      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP
                      '\\[?[a-f0-9]*:[a-f0-9:%.]+\\])' + // IPv6
                      '(\\:\\d+)?(\\/[-a-z0-9%_.~+]*)*' + // Port and path
                      '(\\?[;&a-z0-9%_.~+=-]*)?' + // Query string
                      '(\\#[-a-z0-9_]*)?$','i'); // Fragment locator
                    return urlPattern.test(value) || 'URL tidak valid, contoh valid: https://domainsaya.com';
                  },
                },
              }}
              render={({ field: { onChange, value = '' } }) => (
                <Input
                  label='Masukkan URL'
                  placeholder='https://'
                  onChangeText={(value) => { onChange(value); setText(value); }}
                  value={text}
                  keyboardType='url'
                />
              )}
            />
            {errors.url && typeof errors.url.message === 'string' && (
              <Text size='sm' style={{ color: 'red', marginTop: 5 }}>{errors.url.message}</Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name='size'
              rules={{
                required: 'Ukuran harus dipilih',
              }}
              render={({ field: { onChange, value = '' } }) => (
                <Select
                  label='Pilih Ukuran'
                  placeholder='Silakan pilih...'
                  onValueChange={(value) => { onChange(value); setSize(value); }}
                  value={size}
                  options={[
                    { label: '512 pixel', value: '512x512' },
                    { label: '720 pixel', value: '720x720' },
                    { label: '1080 pixel', value: '1080x1080' },
                    { label: '1440 pixel', value: '1440x1440' },
                    { label: '2160 pixel', value: '2160x2160' },
                  ]}
                />
              )}
            />
            {errors.size && typeof errors.size.message === 'string' && (
              <Text size='sm' style={{ color: 'red', marginTop: 5 }}>{errors.size.message}</Text>
            )}
          </View>

          <Button
            title='Buat Sekarang'
            variant='primary'
            onPress={handleSubmit(handleGenerate)}
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

          <View style={{ gap: 6 }}>
            <Text style={{ textAlign: 'center' }}>{text}</Text>
            <View style={{
              marginHorizontal: 'auto',
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
            }} lightColor='#eee' darkColor='#444'>
              <TextMono size='sm' lightColor='#999' darkColor='white'>{size}</TextMono>
            </View>
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