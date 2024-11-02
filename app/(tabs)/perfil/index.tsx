import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Avatar, Button } from 'react-native-paper';
import { useAuth } from '../../auth/useAuth';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router'

import { TitlePage, TitleSection, ContentTitle, Paragraphs } from '../../../components/Text';
import { CustomInputPassword, LoadingButton } from '../../../components/inputs';
import { FontAwesome } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';

export default function Perfil() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        register,
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const { userData, logout } = useAuth();  // Usa el hook de autenticación
    const navigation = useNavigation();

    const profileImageUrl = userData && userData.vchFotoPerfil
        ? `https://robe.host8b.me/assets/imagenes/${userData.vchFotoPerfil}`
        : 'https://robe.host8b.me/assets/imagenes/userProfile.png'; // Imagen de perfil por defecto si no hay `vchFotoPerfil`
    // Imagen de perfil

  // Función para manejar el cierre de sesión

  const handlePress = async (data: any) => {
    setIsLoading(true);
    
  }

  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: async () => {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ key: 'home', name: 'home' }],
            })
          );
          logout();
          // Redirigir a la pantalla de login o inicio
        },
      },
    ]);
  };

  if (!userData) {
    return <Text>Cargando...</Text>;
  }

    return (
        <ScrollView style={tw`flex-1 p-4 bg-gray-100`}>
            <View style={tw`mb-4 rounded-lg bg-white p-4 shadow  `}>
                            <View style={tw`flex-row mb-6 items-start`}>
                <Avatar.Image size={80} source={{ uri: profileImageUrl }} />
                <View style={tw`flex-1 ml-4`}>
                    <TitleSection label={`${userData.vchNombre} ${userData.vchAPaterno} ${userData.vchAMaterno}`} />

                    <View style={tw`flex-row items-center`}>
                        <FontAwesome name="user" size={20} color={tw.color('gray-400')} />
                        <Text style={tw`ml-2 text-sm font-normal text-gray-500`}>
                            {userData.vchNombreRol} {userData.vchMatricula}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Información extra */}
            <View style={tw``}>
                <View style={tw``}>
                    <Text style={tw`text-sm font-normal text-gray-500`}>Correo electrónico</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${userData.vchEmail}`)}>
                    <Text style={tw`text-sm font-medium text-gray-900`}>
                        {userData.vchEmail}
                    </Text>
                    </TouchableOpacity>
                </View>

                    <View style={tw`flex-col items-start mt-4`}>
                        <Text style={tw`text-sm font-normal text-gray-500`}>Estado de cuenta</Text>
                        <View style={tw`flex-row items-center mt-1`}>
                        <View
                            style={tw`w-4 h-4 rounded-full ${
                            userData.enmEstadoCuenta ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                        <Text style={tw`text-sm font-medium text-gray-900 ml-2`}>
                            {userData.enmEstadoCuenta ? 'Activo' : 'Inactivo'}
                        </Text>
                        </View>
                    </View>

                    <View style={tw`flex-col items-start mt-4`}>
                        <Text style={tw`text-sm font-normal text-gray-500`}>Estado de inscripción</Text>
                        <View style={tw`flex-row items-center mt-1`}>
                        <View
                            style={tw`w-4 h-4 rounded-full ${
                            userData.enmEstadoUsuario ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                        <Text style={tw`text-sm font-medium text-gray-900 ml-2`}>
                            {userData.enmEstadoUsuario ? 'Activo' : 'Inactivo'}
                        </Text>
                        </View>
                    </View>
                    <Text style={tw`mt-4 text-sm font-normal text-gray-500`}>Correo electrónico</Text>
                    <Text style={tw`text-sm font-medium text-gray-900`}>
                        {userData.vchEmail}
                    </Text>
                </View>
            </View>
            {/* Información de usuario */}


            {/* Información adicional */}
            <View style={tw`mb-4 rounded-lg bg-white p-4 shadow `}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Información adicional</Text>

            <View style={tw`text-sm font-normal not-italic text-gray-500 mt-4`}>
                {userData.intRol == null ? (
                // Información del estudiante
                <View>
                    <Text style={tw`mt-4 text-gray-500`}>Carrera</Text>
                    <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                    {userData.dataEstudiante?.vchNomCarrera}
                    </Text>

                    <Text style={tw`mt-4 text-gray-500`}>Cuatrimestre</Text>
                    <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                    {userData.dataEstudiante?.vchNomCuatri}
                    </Text>

                    <Text style={tw`mt-4 text-gray-500`}>Grupo</Text>
                    <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                    {userData.dataEstudiante?.chrGrupo}
                    </Text>

                    <Text style={tw`mt-4 text-gray-500`}>Periodo</Text>
                    <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                    {userData.dataEstudiante?.vchPeriodo}
                    </Text>
                </View>
                ) : (
                // Información del empleado
                <View>
                    <Text style={tw`mt-4 text-gray-500`}>Departamento</Text>
                    <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                    {userData.vchDepartamento}
                    </Text>
                </View>
                )}
            </View>
            </View>

            {/* Actualización de contraseña */}
            <View style={tw`rounded-lg bg-white p-4 shadow `}>
                <TitleSection label="Actualizar contraseña"/>
                <Paragraphs label="Aquí puedes cambiar tu contraseña actual por una nueva. Asegúrate de que tu nueva contraseña sea segura y diferente de la anterior para proteger tu cuenta."/>
                
                
                <CustomInputPassword
                    label="Contraseña  Actual"
                    name="password"
                    control={control}
                    errors={errors}
                    trigger={trigger}
                    placeholder="Ingresa tu Contraseña"
                    rules={{
                    required: 'El campo contraseña es obligatorio.',
                    }}
                />
                <CustomInputPassword
                    label="Nueva Contraseña"
                    name="password"
                    control={control}
                    errors={errors}
                    trigger={trigger}
                    placeholder="Ingresa tu Contraseña"
                    rules={{
                    required: 'El campo contraseña es obligatorio.',
                    }}
                />
                <CustomInputPassword
                    label="Repetir Contraseña"
                    name="password"
                    control={control}
                    errors={errors}
                    trigger={trigger}
                    placeholder="Ingresa tu Contraseña"
                    rules={{
                    required: 'El campo contraseña es obligatorio.',
                    }}
                />
    
                <LoadingButton
                    isLoading={isLoading}
                    normalLabel="Actualizar"
                    loadingLabel="Cargando..."
                    onPress={handleLogout}
                />

            {/* Botón para cerrar sesión */}
            <View style={tw`mt-4 mb-6 `}>
                
                <Button
                mode="contained"
                onPress={handleLogout}
                >
                            <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
                            Cerrar sesión
                    </Text>
                </Button>
            </View>
            </View>



    </ScrollView>
  );
}
