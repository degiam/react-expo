import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

import { IconBrandSafari, IconDots, IconMessageChatbot, IconQrcode } from '@tabler/icons-react-native';

function AboutModal() {
  const colorScheme = useColorScheme();

  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <IconDots
            size={24}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Degiam App',
          tabBarIcon: ({ color }) => (
            <IconBrandSafari
              size={28}
              color={color}
            />
          ),
          headerRight: AboutModal,
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: 'QR Code Generator',
          tabBarIcon: ({ color }) => (
            <IconQrcode
              size={28}
              color={color}
            />
          ),
          headerRight: AboutModal,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <IconMessageChatbot
              size={28}
              color={color}
            />
          ),
          headerRight: AboutModal,
        }}
      />
    </Tabs>
  );
}
