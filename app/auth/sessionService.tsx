import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el token
export const saveToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error("Error al guardar el token", error);
  }
};

// Obtener el token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error("Error al obtener el token", error);
    return null;
  }
};

// Eliminar el token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error("Error al eliminar el token", error);
  }
};

// Guardar los datos del usuario
export const saveUserData = async (userData:string) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error("Error al guardar los datos del usuario", error);
  }
};

// Obtener los datos del usuario
export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error("Error al obtener los datos del usuario", error);
    return null;
  }
};

// Eliminar los datos del usuario
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error("Error al eliminar los datos del usuario", error);
  }
};
