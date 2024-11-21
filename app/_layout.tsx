import { Slot, Stack, useRouter } from "expo-router";
import { View, Text } from "react-native";
import React, { useState, useEffect } from 'react'
import Nav from "./nav";
import { AuthProvider } from './auth/AuthContext';
import { getToken } from './auth/sessionService';  // Asegúrate de importar correctamente getToken


///notificaciones 
import firebase from 'firebase/app';
import 'firebase/messaging';
import Constants from 'expo-constants';

export default function _layout() {
  const router = useRouter();

  

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();  // Espera a que el token sea obtenido correctamente
        console.log("Token recuperado: " + token);


        if (token) {
          router.replace('/(tabs)/materias');  // Si hay token, redirige a las tabs
          console.log("este es el bueno " + token);
        }
      } catch (error) {
        console.error('Error al obtener el token', error);
      }
    };

    checkToken();  // Llama a la función asíncrona dentro del useEffect
  }, []);


  useEffect(() => {
    
    
    
  }, []);







  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerTitle: "",
            headerLeft: () => <Nav />,

          }}

        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          
          
        </Stack>

      </View>
    </AuthProvider>

  )
}