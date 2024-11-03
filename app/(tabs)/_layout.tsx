import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

import { IconBrandSafari, IconDots, IconMessageChatbot, IconQrcode } from '@tabler/icons-react-native';

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
          headerRight: () => (
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
          ),
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
        }}
      />
    </Tabs>
  );
}
