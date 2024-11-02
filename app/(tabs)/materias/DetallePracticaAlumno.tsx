import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { useAuth } from '../../auth/useAuth';
import RenderHTML from 'react-native-render-html';
import { TitlePage, TitleSection, ContentTitle, Paragraphs, DescriptionActivity } from '../../../components/Text';

interface Rubrica {
  criterioDescripcion: string;
  calificacionObtenida: string;
  valorMaximo: string;
}

interface DetalleActividad {
  vchNombre: string;
  vchDescripcion: string;
  vchInstrucciones: string;
}
const screenWidth = Dimensions.get('window').width;

const DetallePracticaAlumno: React.FC = () => {
  const { userData } = useAuth();
  const route = useRoute();
  const { intNumeroPractica } = route.params as any;

  const [detalleActividad, setDetalleActividad] = useState<DetalleActividad | null>(null);
  const [rubricaData, setRubricaData] = useState<Rubrica[]>([]);
  const [rubricaCalAlumno, setRubricaCalAlumno] = useState<Rubrica[]>([]);
  const [puntajeTotalCal, setPuntajeTotalCal] = useState(0);
  const [puntajeObtenido, setPuntajeObtenido] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = 'https://robe.host8b.me/WebServices/';

  const fetchCalificacionesAlumno = async () => {
    try {
      const response = await fetch(`${apiUrl}/accionesAlumnos.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPractica: intNumeroPractica,
          alumnoMatricula: userData.vchMatricula,
        }),
      });
      const result = await response.json();
      if (result.done) {
        setRubricaCalAlumno(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchActividad = async () => {
    try {
      const response = await fetch(`${apiUrl}/cargarMaterias.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPracticaDetalle: intNumeroPractica }),
      });
      const data = await response.json();
      console.log("Respuesta practica", data);

      if (data.done) {
        setDetalleActividad(data.message.detallePractica);
        setRubricaData(data.message.detalleRubrica);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const calculateTotalScores = () => {
      const totalMaximo = rubricaCalAlumno.reduce((acc, rubrica) => acc + (parseFloat(rubrica.valorMaximo) || 0), 0);
      const totalObtenido = rubricaCalAlumno.reduce((acc, rubrica) => acc + (parseFloat(rubrica.calificacionObtenida) || 0), 0);
      setPuntajeTotalCal(totalMaximo);
      setPuntajeObtenido(totalObtenido);
    };
    fetchActividad();
    fetchCalificacionesAlumno();
    calculateTotalScores();
  }, [rubricaCalAlumno]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#6B21A8" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-gray-100`}>
      {detalleActividad && (
        <View style={tw`mb-4`}>
        <TitlePage label={detalleActividad.vchNombre} />
        <Paragraphs className="ml-3" label={detalleActividad.vchDescripcion} />

          <Card style={tw`bg-white mb-4`}>
            <Card.Content>
            <TitleSection label="Instrucciones" />
            <RenderHTML
              contentWidth={screenWidth}
              source={{ html: detalleActividad.vchInstrucciones }}
              tagsStyles={{
                p: { marginBottom: 10 },
                li: { marginLeft: 20 },
                h1: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
                h2: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
              }}
            />
            </Card.Content>
          </Card>
        </View>
      )}

      <Card style={tw`mb-4 bg-white`}>
        <Card.Content>
        <TitleSection label="Rúbrica de Evaluación" />
        <Divider style={tw`my-2`} />
          {rubricaCalAlumno.map((rubrica, index) => (
            <View key={index} style={tw`flex-row justify-between items-center py-2 border-b border-gray-200`}>
              <Text style={tw`text-gray-900 flex-1`}>{rubrica.criterioDescripcion}</Text>
              <Text style={tw`text-gray-700 font-semibold`}>{rubrica.calificacionObtenida || '0'} / {rubrica.valorMaximo}</Text>
            </View>
          ))}

          <View style={tw`mt-6 flex-row justify-between items-center border-t pt-4`}>
            <Text style={tw`text-xl font-semibold`}>Puntaje Total</Text>
            <Text style={tw`text-2xl font-bold`}>{puntajeObtenido} / {puntajeTotalCal}</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetallePracticaAlumno;
