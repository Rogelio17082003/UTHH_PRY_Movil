import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { AuthProvider } from '../auth/AuthContext';
import Entypo from '@expo/vector-icons/Entypo';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>


      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,

        }}>
        <Tabs.Screen
          name="materias"
          options={{
            title: 'Materias',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'book' : 'book-outline'} color={"#00883e"} />
              //<Entypo name="book" size={28} color={"#00883e"} />
              //<Entypo name={focused ? 'book' : 'book-outline'} color={color} />
            ),
            //  href: null, para ocultar la ruta
          }}

        />

        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={"#00883e"} />
            ),
            //  href: null, para ocultar la ruta
          }}

        />



      </Tabs>
    </AuthProvider>
  );
}
