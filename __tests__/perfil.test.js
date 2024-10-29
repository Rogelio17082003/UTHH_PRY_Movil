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
    const { getByText } = render(<Perfil />);

    // Verifica que los textos se rendericen correctamente con los datos de `userData`
    expect(getByText('John Doe Smith')).toBeTruthy();
    expect(getByText('Correo electrónico:')).toBeTruthy();
    expect(getByText('johndoe@example.com')).toBeTruthy();
    expect(getByText('Estado de cuenta:')).toBeTruthy();
    //expect(getByText('Activo')).toBeTruthy();
  });
});
