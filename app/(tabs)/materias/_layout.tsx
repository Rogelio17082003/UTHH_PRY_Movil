import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../../auth/AuthContext';




export default function _layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: '#000', // Cambia este color según necesites
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >

        <Stack.Screen name="index" options={{ title: 'Materias' }} />
        <Stack.Screen name="actividades" options={{ title: 'Trabajo de clase' }} />
        <Stack.Screen name="detalleActividad" options={{ title: 'Detalles' }} />
        <Stack.Screen name="DetallePracticaAlumno" options={{ title: 'Practicas' }} />


      </Stack>
    </AuthProvider>
  )
}
