import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Nav from './nav';
//

export default function Home() {
    return (
        <View>
            
            <ScrollView>

                {/* Cuerpo */}
                <View style={tw`bg-white py-8 px-6 mt-1`}>
                    <View style={tw`flex flex-row items-center mb-6`}>
                        <View style={tw`relative p-6 rounded-full bg-blue-100 `}>
                            <FontAwesome6 name="user-graduate" size={60} style={tw`text-blue-600 `} />
                        </View>

                        <View style={tw`absolute w-40 h-40 rounded-full bg-blue-200 opacity-50 `} />
                        <View style={tw`absolute w-28 h-28 rounded-full bg-blue-300 opacity-40 `} />
                    </View>
                    <Text style={tw`text-xl font-bold text-center`}>Para los Alumnos</Text>
                    <Text style={tw`mt-4 text-gray-500  text-center`}>
                        En esta plataforma, podrás consultar las calificaciones de las prácticas que te asignan tus docentes. Revisa tus avances y mantente al tanto de tus resultados en tiempo real.
                    </Text>
                </View>

                {/* Sección para los Docentes */}
                <View style={tw`bg-white py-8 px-6`}>
                    <View style={tw`flex items-end mb-6`}>
                        <View style={tw`relative p-6 rounded-full bg-green-100 `}>
                            <FontAwesome5 name="chalkboard-teacher" size={60} style={tw`text-green-600 `} />
                        </View>

                        {/* Animaciones de pulsación */}
                        <View style={tw`absolute w-40 h-40 rounded-full bg-green-200 opacity-50 `} />
                        <View style={tw`absolute w-28 h-28 rounded-full bg-green-300 opacity-40 `} />
                    </View>
                    <Text style={tw`text-xl font-bold text-center`}>Para los Docentes</Text>
                    <Text style={tw`mt-4 text-gray-600  text-center`}>
                        Como docente, tendrás la posibilidad de crear actividades y prácticas personalizadas para tus alumnos, y evaluarlas en tiempo real.
                    </Text>


                </View>
            </ScrollView >

        </View>
    )
}
