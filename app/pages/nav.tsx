import React, { useState } from 'react';
import { TextInput, Text, Button, ActivityIndicator, } from 'react-native-paper';

import tw from 'tailwind-react-native-classnames';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function Nav() {
    const router = useRouter();
    const nav = () => {

    }

    const handleLogin = () => {
        console.log('Se redirigira')
        router.push('/pages/Login');
    };

    return (
        <View
            style={[
                tw`flex-row justify-between items-center p-4 bg-white`,
                { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 3.84, elevation: 5, marginTop: "2%" }
            ]}
        >
            {/* Logotipo */}
            <View style={[tw`flex-row items-center margin`, {}]}>
                <Image
                    source={{ uri: 'https://robe.host8b.me/assets/secondary-logo-BL9o4fsR.png' }} // Aquí pon la URL del logotipo
                    style={tw`w-20 h-20`} // Tamaño del logotipo
                    resizeMode="contain" // Asegura que la imagen se ajuste dentro sin cortarse
                />
                <Text style={[tw`text-lg font-bold ml-2`, { fontSize: 12 }]}>UTHH Virtual</Text>
            </View>


            {/* Botón de Iniciar Sesión */}
            <Button
                style={[tw`flex-row   px-4 rounded-lg items-center`, { backgroundColor: "#00883e" }]}
                onPress={ handleLogin}


            >
                <FontAwesome6 name="user" size={18} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white text-lg`}>Iniciar Sesión</Text>
            </Button>

        </View>
    )
}
