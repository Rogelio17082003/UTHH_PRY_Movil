import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Avatar, Button } from 'react-native-paper';
import { useAuth } from '../auth/useAuth';

import { useRouter } from 'expo-router';

import { useEffect } from 'react';

import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router'
export default function Perfil() {
    const { userData, logout } = useAuth();  // Usa el hook de autenticación
    const navigation = useNavigation();



    const profileImageUrl = userData && userData.vchFotoPerfil
        ? `https://robe.host8b.me/assets/imagenes/${userData.vchFotoPerfil}`
        : 'https://robe.host8b.me/assets/imagenes/userProfile.png'; // Imagen de perfil por defecto si no hay `vchFotoPerfil`
    // Imagen de perfil

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar sesión",
                    onPress: async () => {
                        navigation.dispatch(CommonActions.reset({
                            routes: [{ key: "home", name: "home"   }]
                          }));

                        logout();

                        // Redirigir a la pantalla de login o inicio
                    }
                }
            ]
        );
    }

        ;
        if (!userData) {
            return <Text>Cargando....</Text>;
          }
          
          
          

    return (
        <ScrollView style={tw`flex-1 bg-white p-4`}>
            {/* Información de usuario para poder ver su perfil */}
            <View style={tw`flex-row mb-6 items-start`}>
                <Avatar.Image size={80} source={{ uri: profileImageUrl }} />
                <View style={tw`flex-1 ml-4`}>

                    <Text style={tw`text-lg font-bold`}>
                        {userData.vchNombre} {userData.vchAPaterno} {userData.vchAMaterno}
                    </Text>


                    <Text style={tw`text-gray-500`}>
                        {userData.vchNombreRol} {userData.vchMatricula}
                    </Text>




                </View>
            </View>

            {/* Información extra */}
            <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
                <Text style={tw`text-gray-600 mb-1`}>Correo electrónico:</Text>
                <Text style={tw`text-gray-800 mb-2`}>{userData ? userData.vchEmail : "Cargando datos del usuario..."}</Text>

                <Text style={tw`text-gray-600 mb-1`}>Estado de cuenta:</Text>
                <Text style={tw`text-green-600 mb-2`}>Activo</Text>

                <Text style={tw`text-gray-600 mb-1`}>Estado de inscripción:</Text>
                <Text style={tw`text-green-600 mb-2`}>Activo</Text>

                <Text style={tw`text-gray-600 mb-1`}>Fecha de registro:</Text>
                <Text style={tw`text-gray-800 mb-2`}>2024-04-03 07:17:42</Text>
            </View>

            {/* Información adicional */}
            <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg`}>
                <Text style={tw`text-lg font-bold mb-2`}>Información adicional</Text>
                <Text style={tw`text-gray-600 mb-1`}>Departamento:</Text>
                <Text style={tw`text-gray-800`}>TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIÓN</Text>
            </View>

            {/* Actualización de contraseña */}
            <View style={tw`mb-6 p-4 bg-gray-100 rounded-lg`}>
                <Text style={tw`text-lg font-bold mb-2`}>Actualizar contraseña</Text>
                <Text style={tw`text-gray-600 mb-4`}>
                    Aquí puedes cambiar tu contraseña actual por una nueva. Asegúrate de que tu nueva contraseña sea segura y diferente de la anterior para proteger tu cuenta.
                </Text>

                {/* Aquí irían los inputs de la contraseña */}
            </View>

            {/* Botón para cerrar sesión */}
            <View style={tw`mt-4 mb-6 `}>
                <Button
                    mode="contained"
                    color="#ff0000" // Color rojo para indicar cerrar sesión
                    onPress={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </View>

        </ScrollView>
    );
}
