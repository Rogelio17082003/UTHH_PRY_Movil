import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import tw from 'tailwind-react-native-classnames';
import { useAuth } from '../auth/useAuth'; // Hook de autenticación

const MateriasDocente = () => {
  const { userData } = useAuth(); // Obtén el estado de autenticación del contexto
  const [materias, setMaterias] = useState<Materia[]>([]);  // Aquí Materia es la interfaz de tus datos
  const [actividades, setActividades] = useState([]);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [serverResponse, setServerResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  interface Materia {
    NombreCuatrimestre: string;
    NombrePeriodo: string;
    intClvCuatrimestre: number;
    intIdActividadCurso: number;
    intPeriodo: number;
    vchClvMateria: string;
    vchNomMateria: string;
  }




  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
      });

    } catch (error) {
      console.error("Error al cargar archivo", error);
    }
  };

  const extractGradoYGrupo = (gradoYgrupo: any) => {
    const match = gradoYgrupo.match(/(\d+)\s*°\s*"([A-Za-z])"/);
    if (match) {
      let grado = match[1];
      let grupo = match[2];
      return [grado, grupo];
    }
    return ['', ''];
  };

  const determinePeriod = (monthYear: any) => {
    const [month, year] = monthYear.split('/').map(Number);
    let period;
    let partial; 
    if (month >= 9 && month <= 12) period = `${year}${3}`;
    else if (month >= 1 && month <= 4) period = `${year}${1}`;
    else if (month >= 5 && month <= 8) period = `${year}${2}`;

    if (month >= 1 && month <= 4) partial = `${month}`;
    else if (month >= 5 && month <= 8) partial = `${month - 4}`;
    else if (month >= 9 && month <= 12) partial = `${month - 8}`;
    return { period, partial };
  }};

  const extractActivityData = (parsedData: any) => {
    const activityData = [];
    for (let i = 14; i < parsedData.length; i++) {
      if (parsedData[i][0]) {
        activityData.push({
          actividad: parsedData[i][0],
          descripcion: parsedData[i][1],
          puntuacion: parsedData[i][3],
          tiempoEstimado: parsedData[i][4],
          modalidad: parsedData[i][5],
          fechaSolicitud: formatDate(parsedData[i][6]),
          fechaEntrega: formatDate(parsedData[i][7]),
        });
      }
    }
    return activityData;
  };

  const formatDate = (excelDate: any) => {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const onloadMaterias = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://robe.host8b.me/WebServices/cargarMaterias.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matriculaDocent: "20210643",
        }),
      });
      const result = await response.json();
      console.log(result)
      if (result.done) {
        console.log('Este es el resultado de las materias',result.message)
        setMaterias(result.message);
      }
    } catch (error) {
      console.error('Error 500', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onloadMaterias();
  }, []);

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      

      {/* Upload button */}
      <View style={tw`mb-4`}>
        <Button
          icon={() => <Ionicons name="add-circle" size={24} color="white" />}
          mode="contained"
          onPress={handleFileUpload}
          loading={isLoading}
        >
          Añadir Materias con Actividades
        </Button>
      </View>

      {/* List of Materias */}
      {materias.length > 0 ? (
        <FlatList
          data={materias}
          keyExtractor={(item) => item.vchClvMateria} // Clave única
          renderItem={({ item }) => (
            <Card style={tw`mb-4`}>
            <Card.Content>
              <Text style={tw`text-lg font-bold`} >Hola {item.vchClvMateria}</Text>
              <Text>{item.vchNomMateria}</Text>
              <Text>Periodo: {item.NombrePeriodo}</Text>
            </Card.Content>
          </Card>
          
          )}


        />
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <FontAwesome name="frown-o" size={50} color="gray" />
          <Text style={tw`text-gray-500 mt-4`}>No hay clases agregadas. Añade una clase para empezar.</Text>
        </View>
      )}

    </View>
  );
};

export default MateriasDocente; 
