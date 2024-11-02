import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import tw from 'tailwind-react-native-classnames';
import { useAuth } from '../../auth/useAuth'; // Hook de autenticación
import { useRouter, Stack } from 'expo-router';

import { useNavigation } from 'expo-router'

const Materias = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { userData } = useAuth();
  const [materias, setMaterias] = useState<Materia[]>([]);
 

  interface Materia {
    NombreCuatrimestre: string;
    NombrePeriodo: string;
    intClvCuatrimestre: number;
    intIdActividadCurso: number;
    intPeriodo: number;
    vchClvMateria: string;
    vchNomMateria: string;
    intHoras: string;
    vchFotoPerfil: string;
    vchPeriodo: string;
    chrGrupo: string;
    vchNombre: string;
    vchAPaterno: string;
    vchAMaterno: String;

  }
  useEffect(() => {
    // Espera a que userData esté disponible antes de llamar a onloadMaterias
    if (userData && userData.vchMatricula) {
      onloadMaterias();
    }
  }, [userData]); // Ejecuta este efecto cuando userData cambie



  const onloadMaterias = async () => {
    try {

      const response = await fetch('https://robe.host8b.me/WebServices/cargarMaterias.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matriculaAlumn: userData.vchMatricula,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.done) {
        setMaterias(result.message);
      }
    } catch (error) {
      console.error('Error 500', error);
    } finally {
      
    }
  };




  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      {materias.length > 0 ? (
        <FlatList
          data={materias}
          keyExtractor={(item) => item.vchClvMateria}
          style={tw`bg-gray-100  rounded`}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7} // Ajusta este valor para el efecto de opacidad al hacer clic

             // onPress={() => router.push(`/(tabs)/materias/actividades?clvMateria=${item.vchClvMateria}&matriculaAlumno=${userData.vchMatricula}&chrGrupo=${item.chrGrupo}&periodo=${item.intPeriodo}`)}
             onPress={() => 
              router.push({
                pathname: '/(tabs)/materias/actividades',
                params: {
                  clvMateria: item.vchClvMateria,
                  matriculaAlumno: userData.vchMatricula,
                  chrGrupo: item.chrGrupo,
                  periodo: item.intPeriodo,
                }
              })
            }









              style={tw`bg-gray-100  rounded`}
            >
              <Card

                style={[
                  tw`mb-4 bg-white p-4 rounded`,
                  {
                    padding: 16,
                    margin: 16,
                    borderColor: 'transparent', // Borde invisible
                    borderWidth: 1, // Borde invisible pero presente
                    shadowColor: '#000', // Color de la sombra (negro)
                    shadowOffset: { width: 0, height: 4 }, // Posición de la sombra
                    shadowOpacity: 0.3, // Opacidad de la sombra
                    shadowRadius: 4, // Radio de la sombra
                    elevation: 5, // Elevación para sombra en Android
                  },
                ]}
              >
                <Card.Content style={tw`items-center`}>
                  {/* Imagen de perfil */}
                  <Image
                    source={{ uri: `https://robe.host8b.me/assets/imagenes/${item.vchFotoPerfil}` }}
                    style={tw`w-24 h-24 rounded-full mb-4`}
                  />

                  {/* Información del docente y materia */}
                  <Text style={tw`text-lg font-bold text-center`}>
                    {item.vchNombre} {item.vchAPaterno} {item.vchAMaterno}
                  </Text>
                  <Text style={tw`text-center text-gray-700 mt-1`}>
                    {item.vchClvMateria}: {item.vchNomMateria} - {item.intHoras} Horas
                  </Text>
                  <Text style={tw`text-center text-gray-700 mt-1`}>
                    {item.intClvCuatrimestre}{item.chrGrupo}
                  </Text>
                  <Text style={tw`text-center text-gray-700 mt-1`}>
                    <Text style={tw`font-bold`}>Periodo:</Text> {item.vchPeriodo}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <FontAwesome name="frown-o" size={50} color="gray" />
          <Text style={tw`text-gray-500 mt-4`}>
            No hay clases agregadas. Añade una clase para empezar.
          </Text>
        </View>
      )}
    </View>

  );
};

export default Materias;
