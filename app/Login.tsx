import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useForm } from 'react-hook-form';
import { CustomInput, CustomInputPassword, LoadingButton } from '../components/inputs';
import { TitlePage, TitleSection, ContentTitle, Paragraphs } from '../components/Text';
import { Checkbox } from 'react-native-paper';
import { View, Text, ImageBackground, TouchableOpacity, Image, Button, Alert as NativeAlert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Stack, } from 'expo-router';
import { useAuth } from './auth/useAuth';


///
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'



export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    register,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const { login } = useAuth();

  const handlePress = async (data: any) => {
    setIsLoading(true);
    
    try {
      setIsLoading(true);
      console.log('Datos enviados:', JSON.stringify(data));

      const response = await fetch('https://robe.host8b.me/WebServices/loginUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,

        }),
      });

      const result = await response.json();
      console.log(result);
      if (result.done) {
        console.log('Login exitoso:', result);

        const { JWTUser, ...userData } = result.userData;
        // Guarda el token y los datos del usuario
        login(JWTUser, userData);
       




        navigation.dispatch(CommonActions.reset({
          routes: [{ key: "(tabs)", name: "(tabs)" }]
        }));
      }
      else {
        console.error('Error en el registro:', result.message);
        NativeAlert.alert(
          "Error de inicio de sesión",
          "No se pudo iniciar sesión. Verifique sus credenciales e intente nuevamente.",
          [{ text: "OK" }]
        );




        if (result.debug_info) {

        }
        if (result.errors) {

        }

      }

    } catch (error) {
      console.error('Error 500', error);

    } finally {
      setIsLoading(false);
    } 





  };


  return (
    <View style={tw`flex-1`}>
      <Stack.Screen
        options={{
          headerTintColor: "black",
          headerLeft: undefined,
          headerBackVisible: true,
          headerTitle: "Iniciar Sesión",
          headerRight: () => (
            <Image
              source={require('../assets/images/secondary-logo.png')} // Coloca el enlace a tu logo aquí
              style={{ width: 100, height: 40 }} // Ajusta el tamaño del logo
              resizeMode="contain"
            />

          ),
          headerStyle: {},


        }}
      />
      <View style={tw` bg-white flex-1`}>

        {/* Imagen de fondo en la parte superior */}
        <View style={tw`h-1/3`}>
          <ImageBackground
            source={require('../assets/images/partial-react-logo.png')}
            style={tw`w-full h-full`}
            resizeMode="cover"
          />
        </View>

        <View style={tw`bg-white pt-4 px-8`}>
          <View style={tw`flex items-center`}>
            {/* Imagen de la Universidad */}
            <Image
              source={require('../assets/images/secondary-logo.png')}
              style={tw`w-24 h-16 self-center mb-5`}
              resizeMode="contain" 
            />

            {/* Título 1 */}
            <TitlePage label={"Bienvenido de vuelta"} />
            <Paragraphs label={"Empieza donde lo dejaste, inicia sesión para continuar."} />
          </View>


          <CustomInput
            label="Matrícula"
            name="matriculaAlum"
            control={control}
            errors={errors}
            trigger={trigger}
            placeholder="Ingresa tu Matrícula"
            rules={{
              required: 'El campo matrícula es obligatorio.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Solo se permiten números.',
              },
            }}
          />

          <CustomInputPassword
            label="Contraseña"
            name="password"
            control={control}
            errors={errors}
            trigger={trigger}
            placeholder="Ingresa tu Contraseña"
            rules={{
              required: 'El campo contraseña es obligatorio.',
            }}
          />

          {/* Checkbox para recordar */}
          <View style={tw`flex-row items-center justify-between mb-5`}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color='#00883e'
            />
            <Text>Acuerdate de mí</Text>
            <Text style={tw`text-blue-500`}>¿Olvidaste tu contraseña?</Text>
          </View>

          <LoadingButton
            isLoading={isLoading}
            normalLabel="Iniciar Sesión"
            loadingLabel="Cargando..."
            onPress={handleSubmit(handlePress)}
          />
        </View>
      </View>

    </View>

  );
}
