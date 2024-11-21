import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  mockPush,
} from '@testing-library/react-native';
import Home from '../app/home';
import { useRouter } from 'expo-router';

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

// Definir mock para `useAuth`
jest.mock('../app/auth/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    trigger: jest.fn(),
    register: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, TextInput, Text } = require('react-native'); // Importar dentro del mock

  return {
    Checkbox: ({ status, onPress }) => (
      <View testID="checkbox" onPress={onPress}>
        {status}
      </View>
    ),
    TextInput: ({ label, value, onChangeText }) => (
      <View>
        <Text>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={{ borderColor: 'gray', borderWidth: 1 }}
        />
      </View>
    ),
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







// Mock para los inputs personalizados
jest.mock('../components/inputs', () => {
  const React = require('react');
  const { View, TextInput, Text } = require('react-native');

  return {
    CustomInput: ({ placeholder, label, errors }) => (
      <View testID="custom-input">
        {label && <Text>{label}</Text>}
        <TextInput placeholder={placeholder} />
        {errors && errors[label] && (
          <Text style={{ color: 'red' }}>{errors[label]?.message}</Text>
        )}
      </View>
    ),
    CustomInputPassword: ({ placeholder }) => (
      <View testID="custom-input-password">
        <TextInput placeholder={placeholder} secureTextEntry />
      </View>
    ),
    LoadingButton: ({ isLoading }) => (
      <View testID="loading-button">
        <Text>{isLoading ? 'Cargando...' : 'Iniciar Sesión'}</Text>
      </View>
    ),
  };
});

// Definir el mock para `useRouter`
describe('Login renderizado', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  it('should render inputs and button correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Home />);
    expect(getByText('Para los Alumnos')).toBeTruthy();
    expect(
      getByText(
        'En esta plataforma, podrás consultar las calificaciones de las prácticas que te asignan tus docentes. Revisa tus avances, mantente al tanto de tus resultados en tiempo real y trabaja para mejorar en cada actividad.'
                        
      )
    ).toBeTruthy();
    expect(getByText('Para los Docentes')).toBeTruthy();
    expect(
      getByText(
        'Como docente, tendrás la posibilidad de crear actividades y prácticas personalizadas para tus alumnos, y evaluarlas en tiempo real. Facilita el seguimiento del desempeño de tus estudiantes y brinda retroalimentación inmediata para potenciar su aprendizaje.'
      )
    ).toBeTruthy();
  });
});
