import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { FontAwesome } from '@expo/vector-icons';

import { TitlePage, TitleSection, ContentTitle, Paragraphs } from '../components/Text';
//

export default function Home() {
    return (
        <View>
            
            <ScrollView style={tw`bg-white p-4 bg-gray-100`}>
                <View style={tw`rounded-lg bg-white shadow`}>
                    {/* Carousel */}
                    <View style={tw`h-56   mb-8`}>
                        <Image
                        source={require('../assets/images/portada2.jpg')}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                        />
                    </View>

                    {/* Section for Students */}
                    <View style={tw`py-16 px-6 flex flex-col  items-center`}>
                        <View style={tw`relative items-center mb-12`}>
                        <View style={[tw`bg-blue-100 p-6 rounded-full z-10`]}>
                            <FontAwesome name="graduation-cap" size={48} style={tw`text-blue-600`} />
                        </View>
                        {/* Pulsating circles */}
                        <View style={[tw`absolute rounded-full bg-blue-200 opacity-50`, { width: 160, height: 160, top: 16, left: 32 }]} />
                        <View style={[tw`absolute rounded-full bg-blue-300 opacity-40`, { width: 112, height: 112, top: 48, left: 48 }]} />
                        </View>
                        <View style={tw`text-center`}>
                        <TitlePage label="Para los Alumnos" />
                        <Text style={tw`mt-4 text-gray-600 text-lg  font-light`}>
                            En esta plataforma, podrás consultar las calificaciones de las prácticas que te asignan tus docentes. Revisa tus avances,
                            mantente al tanto de tus resultados en tiempo real y trabaja para mejorar en cada actividad.
                        </Text>
                        </View>
                    </View>

                    {/* Section for Teachers */}
                    <View style={tw`py-16 px-6 flex flex-col  items-center`}>
                        <View style={tw`relative items-center mb-12`}>
                        <View style={[tw`bg-green-100 p-6 rounded-full z-10`]}>
                            <FontAwesome name="sort" size={48} style={tw`text-green-600`} />
                        </View>
                        {/* Pulsating circles */}
                        <View style={[tw`absolute rounded-full bg-green-200 opacity-50`, { width: 160, height: 160, top: 16, right: 32 }]} />
                        <View style={[tw`absolute rounded-full bg-green-300 opacity-40`, { width: 112, height: 112, top: 48, right: 48 }]} />
                        </View>
                        <View style={tw`text-center `}>
                        <TitlePage label="Para los Docentes" />
                        <Text style={tw`mt-4 text-gray-600 text-lg font-light `}>
                            Como docente, tendrás la posibilidad de crear actividades y prácticas personalizadas para tus alumnos, y evaluarlas en tiempo real. 
                            Facilita el seguimiento del desempeño de tus estudiantes y brinda retroalimentación inmediata para potenciar su aprendizaje.
                        </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
