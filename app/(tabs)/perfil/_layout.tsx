import React from 'react';
import { Stack } from 'expo-router';
export default function _layout() {
  return (
    <Stack
    screenOptions={{
      headerShown: true,
      headerTintColor: '#000', // Cambia este color según necesites
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >



    <Stack.Screen name="index" options={{ title: 'Perfil' }} />
    
    
  </Stack>
  )
}
