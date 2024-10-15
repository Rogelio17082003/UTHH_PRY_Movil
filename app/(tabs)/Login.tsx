import React, { useState } from 'react';


import { useForm, Controller } from 'react-hook-form';
import { CustomInput, CustomInputPassword, LoadingButton } from '../../components/inputs';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function Login() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        register
      } = useForm();
      //DECLARAR VARIABLES 
      const [isLoading, setIsLoading] = useState(false);
      const [checked, setChecked] = useState(false);
      const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };
  return (
    <View style={styles.container}>
    {/* Imagen de fondo en la parte superior */}
    <View style={styles.hijoImagen}>
      <ImageBackground
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Huejutla_de_Reyes_%2813%29.jpg/1280px-Huejutla_de_Reyes_%2813%29.jpg' }} // Coloca aquí el path de la imagen que deseas utilizar
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      </ImageBackground>

    </View>


    <View style={styles.hijoCajas}>

      {/* Imagen de la Universidad */}
      <Image
        source={{ uri: 'https://robe.host8b.me/assets/secondary-logo-BL9o4fsR.png' }} // Coloca aquí el enlace a la imagen
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.title}>Bienvenido de vuelta</Text>
      <Text style={styles.subtitle}>
        Empieza donde lo dejaste, inicia sesión para continuar.
      </Text>

      <CustomInput
        label="Matrícula"
        name="matricula"
        control={control}
        errors={errors}
        trigger={trigger}
        placeholder="Ingresa tu Matricula"

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
        name="contraseña"
        control={control}
        errors={errors}
        trigger={trigger}
        placeholder="Ingresa tu Contraseña"

        rules={{
          required: 'El campo contraseña es obligatorio.',

        }}
      />
      {/* Checkbox para recordar */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color='#00883e'
        />
        <Text>Acuerdate de mí</Text>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </View>

      <LoadingButton
        isLoading={isLoading}
        normalLabel="Iniciar Sesión"
        loadingLabel="Cargando..."
        onPress={handlePress}
      />


    </View>

  </View>

);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      flexDirection: "column"
    },
    hijoImagen: {
      height:"40%",
      
    },
    hijoCajas: {
      flex: 1, // Ocupa la otra mitad del espacio disponible
      
      padding:16,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: 0,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 12,
      textAlign: 'center',
      color: '#888',
      marginBottom: 20,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    forgotPassword: {
      color: '#3b82f6',
    },
    logo: {
      width: 100,
      height: 60,
      alignSelf: 'center',
      marginBottom: 20,
      marginTop: 0
    },
    
  
  });
  