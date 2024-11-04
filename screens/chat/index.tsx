import React, { useEffect, useState } from 'react';
import { Alert, Modal, FlatList, TouchableOpacity, useColorScheme } from 'react-native';

import { Container, Section } from '@/components/Screen';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Input } from '@/components/Form';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ChatScreenNavigationProp } from '@/app/navigation';

import * as Contacts from 'expo-contacts';

export default function ChatScreen() {
  const colorScheme = useColorScheme();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const [phone, setPhone] = useState('');

  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      const contactsWithPhoneNumbers: any = data.filter((contact: any) => contact.phoneNumbers?.length > 0);
      setContacts(contactsWithPhoneNumbers);
      setFilteredContacts(contactsWithPhoneNumbers);
    } else {
      Alert.alert('Izin akses kontak ditolak');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  const openContactsModal = () => {
    getContacts();
    setModalVisible(true);
  };

  const selectContact = (contact: any) => {
    let phoneNumber = contact.phoneNumbers[0].number;

    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.startsWith('62')) {
      phoneNumber = '0' + phoneNumber.slice(2);
    }

    if (!phoneNumber.startsWith('08')) {
      console.log('Format nomor tidak valid.');
      return;
    }

    setPhone(phoneNumber);
    setValue('phone', phoneNumber, { shouldValidate: true });
    setModalVisible(false);
  };

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
            render={({ field: { onChange, value = '' } }) => (
              <Input
                label='Nomor Ponsel'
                placeholder='08•••••••••••'
                onChangeText={(value) => { onChange(value); setPhone(value); }}
                value={phone || value}
                keyboardType='numeric'
              />
            )}
          />
          {errors.phone && typeof errors.phone.message === 'string' && (
            <Text size='sm' style={{ color: 'red', marginTop: 5 }}>{errors.phone.message}</Text>
          )}
        </View>

        <Button
          title='Pilih Kontak'
          variant='secondary'
          onPress={openContactsModal}
        />

        <Button
          title='Chat Sekarang'
          variant='primary'
          onPress={handleSubmit(handleGenerate)}
          style={{
            marginTop: 4,
          }}
        />
      </Section>

      <Modal visible={modalVisible} animationType='slide'>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
          <Input
            placeholder='Cari kontak'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredContacts}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => selectContact(item)}
                style={{
                  padding: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderTopColor: colorScheme === 'light' ? '#eee' : '#222',
                  borderBottomColor: colorScheme === 'light' ? '#eee' : '#222',
                  marginTop: -1
                }}
              >
                <Text lightColor='black' darkColor='white'>{item.name}</Text>
                <Text size='sm' style={{ opacity: 0.7 }}>{item.phoneNumbers[0].number}</Text>
              </TouchableOpacity>
            )}
            style={{
              paddingVertical: 10,
            }}
          />
          <Button title='Tutup' onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </Container>
  );
}