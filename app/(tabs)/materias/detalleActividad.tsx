import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { useAuth } from '../../auth/useAuth';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TitlePage, TitleSection, ContentTitle, Paragraphs, DescriptionActivity } from '../../../components/Text';

interface Practica {
  idPractica: string;
  vchNombre: string;
  vchDescripcion: string;
  calificacionPractica: string;
  calificacionObtenidaAlumno: string;
}

interface Actividad {
  Nombre_Actividad: string;
  Descripcion_Actividad: string;
  Fecha_Solicitud: string;
  Fecha_Entrega: string;
  Valor_Actividad: string;
  Clave_Instrumento: string;
  Modalidad: string;
}

export default function DetalleActividadAlumno ()  {
  const { userData } = useAuth();
  const route = useRoute();
  const { clvMateria, chrGrupo, periodo, numeroActividad, numeroActividadCurso } = useLocalSearchParams();

  const [actividad, setActividad] = useState<Actividad | null>(null);
  const [practicas, setPracticas] = useState<Practica[]>([]);
  const [datosCalAlumn, setDatosCalAlumn] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = 'https://robe.host8b.me/WebServices/';
  const router = useRouter();

  const fetchActividad = async () => {
    try {
      const response = await fetch(`${apiUrl}/cargarMaterias.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clvMateria: clvMateria,
          grupo: chrGrupo,
          periodo: periodo,
          numeroActividad: numeroActividad,
          numeroActividadCurso: numeroActividadCurso,
        }),
      });

      const data = await response.json();
      console.log("Respuesta", data);

      if (data.done) {
        setActividad(data.message.detalleActividad);
        setPracticas(data.message.practicasActividad);
      }
    } catch (error) {
      // Alert.alert('Error', 'Error 500: Ocurrió un problema en el servidor. Intenta nuevamente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDatosCalAlumn = async () => {
    try {
      const response = await fetch(`${apiUrl}/cargarMaterias.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datosAlumno: {
            matricula: userData.vchMatricula,
            fkActividadGlobal: numeroActividad,
            idActividadCurso: numeroActividadCurso,
          },
        }),
      });

      const data = await response.json();
      if (data.done) {
        setDatosCalAlumn(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchActividad();
      await fetchDatosCalAlumn();
    };
    fetchData(); 
  }, []);

  const practicasConCalificaciones = (practicas || []).map((practica) => {
    const calificacion = datosCalAlumn?.find((c) => c.idPractica === practica.idPractica);
    return {
      ...practica,
      calificacionPractica: calificacion ? calificacion.calificacionPractica : 'No calificado',
      calificacionObtenidaAlumno: calificacion ? calificacion.calificacionObtenidaAlumno : 'No calificado',
    };
  });

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#6B21A8" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-gray-100`}>
      {actividad && (
        <View style={tw`mb-4`}>
          <TitlePage label={actividad.Nombre_Actividad} />
          <DescriptionActivity label={actividad.Descripcion_Actividad} />


          <Card style={tw`mb-4 bg-white`}>
            <Card.Content>
              <TitleSection label="Detalles de la Actividad" />

              <ContentTitle label="Fecha de Solicitud: " />
              <Paragraphs label={actividad.Fecha_Solicitud} />

              <ContentTitle label="Fecha de Entrega: " />
              <Paragraphs label={actividad.Fecha_Entrega} />

              <ContentTitle label="Valor de la Actividad: " />
              <Paragraphs label={actividad.Valor_Actividad} />

              <ContentTitle label="Calificación Obtenida: " />
              <Paragraphs label={datosCalAlumn.length > 0 ? datosCalAlumn[0].calificacionActividadAlumno || '0' : '0'} />

              <ContentTitle label="Clave de Instrumento:" />
              <Paragraphs label={actividad.Clave_Instrumento} />

              <ContentTitle label="Modalidad:" />
              <Paragraphs label={actividad.Modalidad} />

            </Card.Content>
          </Card>
        </View>
      )}

      <View>
        {practicasConCalificaciones.length > 0 ? (
          practicasConCalificaciones.map((practica) => (
            <Card key={practica.idPractica} style={tw`mb-4 bg-white h-36`}
              onPress={() =>
                router.push({
                  // @ts-ignore
                  pathname: '/(tabs)/materias/DetallePracticaAlumno',
                  params: {
                    
                    intNumeroPractica: practica.idPractica,
                   

                  }
                })
              }

            >
              <Card.Content>
                <View style={tw`absolute top-2 right-2 bg-gray-800 px-2 py-1 rounded-full`}>
                  <Text style={tw`text-white text-xs`}>
                    {practica.calificacionObtenidaAlumno}/{practica.calificacionPractica}</Text>
                </View>
                <Title style={tw`text-xl font-bold text-gray-900 text-center`}>{practica.vchNombre}</Title>

                <Paragraph style={tw`text-sm text-gray-500 text-center`}>{practica.vchDescripcion}</Paragraph>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={tw`flex flex-col items-center justify-center h-64`}>
            <Text style={tw` text-gray-500 mb-4`}>😔</Text>
            <Text style={tw`text-gray-500 text-center`}>No hay actividades o prácticas disponibles.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};


