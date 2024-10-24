import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../Login'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../auth/useAuth'; // Mock del hook useAuth
import { CommonActions } from '@react-navigation/native';

// Mockear el hook `useAuth` para las pruebas
jest.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

// Mockear `CommonActions.reset`
jest.mock('@react-navigation/native', () => ({
  CommonActions: {
    reset: jest.fn(),
  },
}));

describe('Login Component', () => {
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockLogin = useAuth().login; // Obtener el mock de `login`
    jest.clearAllMocks(); // Limpiar todos los mocks antes de cada prueba
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    // Verificar que los elementos importantes están presentes
    expect(getByText('Bienvenido de vuelta')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu Matrícula')).toBeTruthy();
    expect(getByPlaceholderText('Ingresa tu Contraseña')).toBeTruthy();
    expect(getByText('Iniciar Sesión')).toBeTruthy();
  });

  it('shows errors when fields are empty', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.press(loginButton); // Simular la pulsación del botón sin rellenar campos

    // Verificar los errores
    await waitFor(() => {
      expect(getByText('El campo matrícula es obligatorio.')).toBeTruthy();
      expect(getByText('El campo contraseña es obligatorio.')).toBeTruthy();
    });
  });

  it('submits the form correctly with valid inputs', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const matriculaInput = getByPlaceholderText('Ingresa tu Matrícula');
    const passwordInput = getByPlaceholderText('Ingresa tu Contraseña');
    const loginButton = getByText('Iniciar Sesión');

    // Llenar los campos del formulario
    fireEvent.changeText(matriculaInput, '20210643');
    fireEvent.changeText(passwordInput, 'password123');

    // Simular la pulsación del botón de inicio de sesión
    fireEvent.press(loginButton);

    await waitFor(() => {
      // Asegúrate de que la función `login` ha sido llamada
      expect(mockLogin).toHaveBeenCalledWith(expect.anything(), expect.anything());

      // Verifica que se haya ejecutado la acción de navegación
      expect(CommonActions.reset).toHaveBeenCalledWith({
        routes: [{ key: "(tabs)", name: "(tabs)" }],
      });
    });
  });

  it('shows an error alert if login fails', async () => {
    // Simula una respuesta fallida del servidor
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ done: false, message: 'Login fallido' }),
      })
    );

    const { getByPlaceholderText, getByText } = render(<Login />);
    const matriculaInput = getByPlaceholderText('Ingresa tu Matrícula');
    const passwordInput = getByPlaceholderText('Ingresa tu Contraseña');
    const loginButton = getByText('Iniciar Sesión');

    // Llenar los campos del formulario
    fireEvent.changeText(matriculaInput, '20210643');
    fireEvent.changeText(passwordInput, 'password123');

    // Simular la pulsación del botón de inicio de sesión
    fireEvent.press(loginButton);

    await waitFor(() => {
      // Asegúrate de que se muestra el alert de error
      expect(getByText('No se pudo iniciar sesión. Verifique sus credenciales e intente nuevamente.')).toBeTruthy();
    });
  });
});
