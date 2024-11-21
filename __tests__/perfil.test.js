import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Perfil from '../app/(tabs)/perfil';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native'; // Importa Alert de react-native

// Mocks de dependencias
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useNavigation: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
  Stack: {
    Screen: ({ children }) => <>{children}</>, // Mock de Stack.Screen
  },
}));

jest.mock('expo-image-picker', () => {
  return {
    launchImageLibraryAsync: jest.fn(async (options) => {
      return {
        cancelled: false, // Cambia a true si deseas simular que el usuario canceló la acción
        uri: 'mocked-image-uri', // Simula una URI de imagen
      };
    }),
    launchCameraAsync: jest.fn(async (options) => {
      return {
        cancelled: false,
        uri: 'mocked-camera-image-uri', // Simula una URI de imagen tomada con la cámara
      };
    }),
    requestCameraPermissionsAsync: jest.fn(async () => {
      return {
        granted: true, // Simula que los permisos fueron otorgados
      };
    }),
    requestMediaLibraryPermissionsAsync: jest.fn(async () => {
      return {
        granted: true, // Simula que los permisos fueron otorgados
      };
    }),
  };
});


jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  const FontAwesome = ({ name, size, style }) => (
    <View
      testID="font-awesome-icon"
      style={[style, { width: size, height: size }]} // Simula tamaño
    >
      <Text>{name}</Text> {/* Muestra el nombre del icono */}
    </View>
  );

  return {
    FontAwesome,
  };
});

// Definir mock para `useAuth` con `userData` y `logout`
jest.mock('../app/auth/useAuth', () => ({
  useAuth: jest.fn(() => ({
    userData: {
      vchNombre: 'John',
      vchAPaterno: 'Doe',
      vchAMaterno: 'Smith',
      vchEmail: 'johndoe@example.com',
      vchFotoPerfil: 'userProfile.png',
      vchNombreRol: 'Docente',
      vchMatricula: '20210643',
    },
    logout: jest.fn(),
  })),
}));

// Mock de `Alert` para evitar interrupciones durante las pruebas
jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
  const logoutButton = buttons.find(
    (button) => button.text === 'Cerrar sesión'
  );
  if (logoutButton && logoutButton.onPress) {
    logoutButton.onPress();
  }
});

describe('Perfil renderizado', () => {
  it('should render user information correctly', () => {
    const { getByText, getAllByText } = render(<Perfil />);

    // Verifica que los textos se rendericen correctamente con los datos de `userData`
    expect(getByText('John Doe Smith')).toBeTruthy();
    expect(getAllByText('Estado de inscripción')).toBeTruthy();
    expect(getAllByText('johndoe@example.com')).toBeTruthy();
    expect(getByText('Estado de cuenta')).toBeTruthy();
    //expect(getByText('Activo')).toBeTruthy();
  });
});
