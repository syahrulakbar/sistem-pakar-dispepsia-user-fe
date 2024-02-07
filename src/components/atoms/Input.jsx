import {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Input({...rest}) {
  const {
    id,
    label,
    placeholder,
    formik,
    formatPassword,
    keyboardType = 'default',
  } = rest;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="relative my-2">
      <Text className="text-black">{label}</Text>
      <TextInput
        id={id}
        onChangeText={formik.handleChange(id)}
        onBlur={formik.handleBlur(id)}
        value={formik.values[id]}
        secureTextEntry={formatPassword && showPassword ? true : false}
        placeholder={placeholder}
        keyboardType={keyboardType}
        className="border py-4 px-3 rounded-md mt-2 text-lg"
      />
      {formatPassword && (
        <Pressable
          className="absolute inset-y-0 right-0 top-11 flex items-center pr-3 text-gray-400"
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Icon name="eye" size={24} />
          ) : (
            <Icon name="eye-off" size={24} />
          )}
        </Pressable>
      )}

      {formik.touched[id] && formik.errors[id] && (
        <Text className="text-sm text-red-500 mt-1">{formik.errors[id]}</Text>
      )}
    </View>
  );
}
