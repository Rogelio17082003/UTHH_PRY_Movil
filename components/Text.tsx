import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

type TitleProps = {
  label: string;
  className?: string;
};

// Componente TitlePage
export const TitlePage: React.FC<TitleProps> = ({ label }) => (
  <Text style={tw`mb-3 text-xl font-semibold text-gray-900`}>
    {label}
  </Text>
);

// Componente TitleSection
export const TitleSection: React.FC<TitleProps> = ({ label, className = '' }) => (
  <Text style={[tw`mb-2 text-base font-bold text-gray-900`, tw`${className}`]}>
    {label}
  </Text>
);

// Componente ContentTitle
export const ContentTitle: React.FC<TitleProps> = ({ label }) => (
  <Text style={tw`mb-2 text-sm font-medium text-gray-900`}>
    {label}
  </Text>
);

// Componente Paragraphs
export const Paragraphs: React.FC<TitleProps> = ({ label, className = '' }) => (
  <Text style={[tw`mb-3 text-gray-500`, tw`${className}`]}>
    {label}
  </Text>

);

interface DescriptionActivityProps {
  label?: string;
}

export const DescriptionActivity: React.FC<DescriptionActivityProps> = ({ label = "" }) => {
  const lines = label.split('\n');

  return (
    <View style={{ marginBottom: 12 }}>
      {lines.map((line, index) => {
        const marginLeft = line.startsWith('•') ? 20 : line.startsWith('-') ? 40 : 0;
        return (
          <Text key={index} style={{ color: '#6B7280', marginLeft, marginTop: line.startsWith('•') ? 4 : 0 }}>
            {line}
          </Text>
        );
      })}
    </View>
  );
};
