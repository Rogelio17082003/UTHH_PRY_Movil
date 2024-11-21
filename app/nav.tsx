import React, { useState } from 'react';
import { TextInput, Text, Button, ActivityIndicator, } from 'react-native-paper';

import tw from 'tailwind-react-native-classnames';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { LoadingButton } from '../components/inputs'
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function Nav() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
 
    const handleLogin = () => {
        console.log('Se redirigira')
        router.push('/Login');
    };

    return (
        <View
            style={[
                tw`flex-row justify-between items-center bg-white`
            ]}
        >
            {/* Logotipo */}
            <View style={tw`flex-1 items-start mr-16`}>
                <Image
                    source={{ uri: 'https://robe.host8b.me/assets/secondary-logo-BL9o4fsR.png' }} // Aquí pon la URL del logotipo
                    style={tw`w-16 h-16`} // Tamaño del logotipo
                    resizeMode="contain" // Asegura que la imagen se ajuste dentro sin cortarse
                />
            </View>

            {/* Texto "UTHH Virtual" */}
            <View style={tw`flex-auto  items-end`}>
                <Text style={[tw`text-lg  `]}>
                    UTHH Virtual
                </Text>
            </View>

            {/* Botón de Iniciar Sesión */}
            <View style={tw`flex-auto items-end`}>
                <Button
                    style={[
                        tw`flex-none  rounded-lg items-center`,  // 'flex-1' para alinear el botón
                        { backgroundColor: "#00883e" }
                    ]}
                    onPress={handleLogin}
                    rippleColor={"#02233A"}
                    contentStyle={tw` px-3`}  // Asegura que el ripple cubra todo el botón
                >
                    <FontAwesome6 name="user" size={16} color="white" style={tw`mr-1`} />
                    <Text style={tw`text-white text-lg  `}>Iniciar Sesión</Text>
                </Button>
               
            </View>
        </View>


    )
}
