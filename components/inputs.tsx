import React, { useState } from 'react';
import { TextInput, Text, Button, ActivityIndicator } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface CustomInputProps {
  label: string;
  name: string;
  control: any;
  rules?: object;
  errors: any;
  trigger: (name: string) => void;
  [key: string]: any; // Esto permite que el componente acepte otras props arbitrarias
}
//este es para los componentes
export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  control,
  rules = {},
  errors,
  trigger,
  ...rest // Captura las props adicionales como placeholder etc. de cada uno
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            label={label}
            mode="outlined"
            value={value}
            onBlur={() => {
              onBlur();
              trigger(name);
            }}
            onChangeText={(text) => {
              onChange(text); // Actualiza el valor del campo
              trigger(name); // Valida el campo en cada cambio de texto
            }}
            style={{
              marginBottom: 14,
              backgroundColor: '#ffffff',
              fontSize: 13,
            }}
            outlineColor={errors[name] ? '#e02424' : '#d1d5db'} // cuando no esta enfocado
            activeOutlineColor={errors[name] ? '#e02424' : '#3b82f6'} //color de cuando esta enfocado
            outlineStyle={{ borderWidth: 0.5, borderRadius: 10 }} // esta linea hace el grosor de la linea y el color de la line, si marca herror se colocoa el color
            error={!!errors[name]}
            {...rest} // Aplicar todas las props adicionales aquí
          />
          {errors[name] && (
            <Text style={{ color: '#e02424', fontSize: 12 }}>
              {errors[name]?.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

interface CustomInputPasswordProps {
  label: string;
  name: string;
  control: any;
  rules?: object;
  errors: any;
  trigger: (name: string) => void;
  [key: string]: any; // Esto permite que el componente acepte otras props arbitrarias
}
///customInputPassword
export const CustomInputPassword: React.FC<CustomInputPasswordProps> = ({
  label,
  name,
  control,
  rules = {},
  errors,
  trigger,
  ...rest // Captura las props adicionales como placeholder etc.
}) => {
  // Estado para alternar la visibilidad de la contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules} // Aquí se aplican las reglas de validación
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            label={label}
            mode="outlined"
            value={value}
            onBlur={() => {
              onBlur();
              trigger(name); // Validar cuando el campo pierde el foco
            }}
            onChangeText={(text) => {
              onChange(text); // Actualizar valor del campo
              trigger(name); // Validar en cada cambio de texto
            }}
            secureTextEntry={!passwordVisible} // Para el campo de contraseña
            style={{
              marginBottom: 14,
              backgroundColor: '#ffffff',
              fontSize: 13,
            }}
            outlineColor={errors[name] ? '#e02424' : '#d1d5db'} // Color del borde cuando no está enfocado
            activeOutlineColor={errors[name] ? '#e02424' : '#3b82f6'} // Color del borde cuando está enfocado
            outlineStyle={{ borderWidth: 0.5, borderRadius: 10 }} // Grosor y radio del borde
            error={!!errors[name]} // Mostrar error si existe
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'} // Alternar íconos
                onPress={() => setPasswordVisible(!passwordVisible)} // Alternar visibilidad de la contraseña
              />
            }
            {...rest} // Pasar las props adicionales
          />
          {errors[name] && (
            <Text style={{ color: '#B00020', fontSize: 12 }}>
              {errors[name]?.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

//boton cargando para login

interface LoadingButtonProps {
  isLoading: boolean;
  normalLabel: string;
  loadingLabel: string;
  onPress: () => void;
  [key: string]: any; // Esto permite que el componente acepte otras props arbitrarias
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  normalLabel,
  loadingLabel,
  onPress,
  ...rest
}) => {
  return (
    <Button
      mode="contained-tonal"
      onPress={onPress}
      style={{
        backgroundColor: isLoading ? '#02233A' : '#00883e',
        width: '100%',
        borderRadius: 15,
        height: '10%',
      }}
      disabled={isLoading}
      contentStyle={{ display: 'flex', height: '100%' }}
      {...rest}
    >
      {isLoading ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator animating={true} color="#FFFFFF" />
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>
            {loadingLabel}
          </Text>
        </View>
      ) : (
        <Text style={{ color: 'white', fontSize: 18 }}>{normalLabel}</Text>
      )}
    </Button>
  );
};
