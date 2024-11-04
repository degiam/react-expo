import React, { useState } from 'react';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Form';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ChatScreenNavigationProp } from '@/app/navigation';


export default function ChatScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const [phone, setPhone] = useState('');

  const handleGenerate = async () => {
    if (!phone) return;
    navigation.navigate('chat-detail', { phone });
  };

  return (
    <Container scrollable>
      <Section style={{ gap: 24 }}>
        <View>
          <Controller
            control={control}
            name='phone'
            rules={{
              required: 'Nomor ponsel harus diisi',
              validate: {
                isValidPhone: value => {
                  const phonePattern = /^(08)\d{8,14}$/;
                  return phonePattern.test(value) || 'Nomor ponsel tidak valid, contoh yang valid: 08123456789';
                },
              }
            }}
            render={({ field: { onChange } }) => (
              <Input
                label='Nomor Ponsel'
                placeholder='08•••••••••••'
                onChangeText={(value) => { onChange(value); setPhone(value); }}
                value={phone}
                keyboardType='numeric'
              />
            )}
          />
          {errors.phone && typeof errors.phone.message === 'string' && (
            <Text size='sm' style={{ color: 'red', marginTop: 5 }}>{errors.phone.message}</Text>
          )}
        </View>

        <Button
          title='Chat Sekarang'
          variant='primary'
          onPress={handleSubmit(handleGenerate)}
          style={{
            marginTop: 4,
          }}
        />
      </Section>
    </Container>
  );
}