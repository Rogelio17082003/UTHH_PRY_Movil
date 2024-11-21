import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../auth/useAuth';
import tw from 'tailwind-react-native-classnames';
import { Avatar, Button } from 'react-native-paper';
import { useRouter, Stack } from 'expo-router';
import { CustomInputPassword, LoadingButton } from '../../../components/inputs';

// Define la interfaz para la actividad
interface Actividad {
  intParcial: number;
  fltValor: number;
  intClvActividad: number;
  intIdActividadCurso: number;
  vchDescripcion: string;
  vchNomActivi: string;
}

// Define la interfaz para las actividades agrupadas por parcial
interface GroupedActivities {
  [key: number]: Actividad[];
}

export default function Actividades() {
  const router = useRouter();
  const { clvMateria, chrGrupo, periodo } = useLocalSearchParams();
  const { userData } = useAuth();
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (userData && userData.vchMatricula) {
      onloadActividades();
    }
  }, [userData]);

  const onloadActividades = async () => {
    try {
      const response = await fetch('https://robe.host8b.me/WebServices/cargarMaterias.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intClvCarrera: userData.dataEstudiante.intClvCarrera,
          intMateria: clvMateria,
          intPeriodo: userData.dataEstudiante.intPeriodo,
          intClvCuatrimestre: userData.dataEstudiante.intClvCuatrimestre,
          chrGrupo: chrGrupo,
        }),
      });

      const result = await response.json();
      console.log("datoalumnos: ", result)

      if (result.done) {
        setActividades(result.message as Actividad[]);

      } else {
        console.error('Error en el registro:', result.message);
      }
    } catch (error) {

    }
  };

  // Agrupar actividades por parcial
  const groupedActivities: GroupedActivities = actividades.reduce((groups, activity) => {
    const { intParcial } = activity;
    if (!groups[intParcial]) groups[intParcial] = [];
    groups[intParcial].push(activity);
    return groups;
  }, {} as GroupedActivities);

  const renderActivity = ({ item }: { item: Actividad }) => (
    <List.Accordion
      key={item.intClvActividad}
      title={item.vchNomActivi}
      titleStyle={{
        fontWeight: 'bold',
        color: '#333',
        flexWrap: 'wrap', // Permite que el texto se ajuste en varias líneas
      }}
      style={{
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e0e0e0'
      }}
      left={() => null}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ marginBottom: 10, color: '#555' }}>
          <Text style={{ fontWeight: 'bold' }}>Descripción: </Text>{item.vchDescripcion}
        </Text>
        <Text style={{ fontWeight: 'bold', color: '#333' }}>
          Valor: {item.fltValor} puntos
        </Text>

        {/* Botón para cerrar sesión */}
        <View style={tw`mt-4 mb-6 mr-4`}>
          {/*
            <Button
              mode="contained"

              onPress={() =>
                router.push({
                  // @ts-ignore
                  pathname: '/(tabs)/materias/detalleActividad',
                  params: {
                    clvMateria: clvMateria,
                    matriculaAlumno: userData.vchMatricula,
                    chrGrupo: chrGrupo,
                    periodo: periodo,
                    numeroActividad: actividades[0]?.intClvActividad,
                    numeroActividadCurso: actividades[0]?.intIdActividadCurso

                  }
                })
              }
            >
              Ver mas
            </Button>*/
          }
          <Button
            mode="contained"
            buttonColor="#00883e" // Para `react-native-paper`
            onPress={() =>
              router.push({
                // @ts-ignore
                pathname: '/(tabs)/materias/detalleActividad',
                params: {
                  clvMateria: clvMateria,
                  matriculaAlumno: userData.vchMatricula,
                  chrGrupo: chrGrupo,
                  periodo: periodo,
                  numeroActividad: actividades[0]?.intClvActividad,
                  numeroActividadCurso: actividades[0]?.intIdActividadCurso
                }
              })
            }
          >
            <Text style={[tw`mb-2 text-sm font-medium text-gray-900`,{color: 'white'}]}>
              Ver mas
            </Text>
          </Button>


        </View>

      </View>

    </List.Accordion>
  );

  const renderParcial = ({ item: [parcial, actividades] }: { item: [string, Actividad[]] }) => (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 16,
      marginBottom: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6
    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Parcial {parcial}</Text>
      <FlatList
        data={actividades}
        keyExtractor={(actividad) => actividad.intClvActividad.toString()}
        renderItem={renderActivity}

      />

    </View>
  );

  return (
    <FlatList
      data={Object.entries(groupedActivities)}
      keyExtractor={([parcial]) => parcial}
      contentContainerStyle={{ padding: 16, backgroundColor: '#f5f5f5' }}
      ListHeaderComponent={() => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#007bff', marginBottom: 10, alignItems: 'center' }}>
          <MaterialIcons name="event-note" size={24} color="#007bff" />
          <Text style={{ fontSize: 16, color: '#007bff', marginLeft: 8 }}>Actividades </Text>



        </View>

      )}
      renderItem={renderParcial}

    />

  );
}
