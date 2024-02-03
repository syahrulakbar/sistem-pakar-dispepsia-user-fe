import Axios from 'axios';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

export default function Signup({navigation}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async values => {
    try {
      await Axios.post('http://10.0.2.2:5000/api/register', values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      formik.resetForm();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password must be match')
        .required('Confrim Password is required'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View className="w-full h-screen flex flex-col justify-evenly items-center p-2">
      <View className="w-full flex flex-col justify-around">
        <Text className="font-bold text-black text-3xl">
          Buat Akun Si ParDi
        </Text>
        <View className="w-full flex flex-col justify-around">
          <View className="my-2">
            <Text className="text-black">Name*</Text>
            <TextInput
              id="name"
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              placeholder="Your Username"
              className="border py-4 px-3 rounded-md mt-2 text-lg"
            />
            {formik.touched.name && formik.errors.name && (
              <Text className="text-sm text-red-500 mt-1">
                {formik.errors.name}
              </Text>
            )}
          </View>
          <View className="my-2">
            <Text className="text-black">Email Address*</Text>
            <TextInput
              id="email"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              keyboardType="email-address"
              placeholder="Your Address"
              className="border py-4 px-3 rounded-md mt-2 text-lg"
            />
            {formik.touched.email && formik.errors.email && (
              <Text className="text-sm text-red-500 mt-1">
                {formik.errors.email}
              </Text>
            )}
          </View>
          <View className="relative my-2">
            <Text className="text-black">Password*</Text>
            <TextInput
              id="password"
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              secureTextEntry={showPassword ? false : true}
              placeholder="Password"
              className="border py-4 px-3 rounded-md mt-2 text-lg"
            />
            <Pressable
              className="absolute inset-y-0 right-0 top-11 flex items-center pr-3 text-gray-400"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye" size={24} />
              ) : (
                <Icon name="eye-off" size={24} />
              )}
            </Pressable>
            {formik.touched.password && formik.errors.password && (
              <Text className="text-sm text-red-500 mt-1">
                {formik.errors.password}
              </Text>
            )}
          </View>
          <View className="relative my-2">
            <Text className="text-black">Confrim Password*</Text>
            <TextInput
              id="confirmPassword"
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              value={formik.values.confirmPassword}
              secureTextEntry={showPassword ? false : true}
              placeholder="Confrim Password"
              className="border py-4 px-3 rounded-md mt-2 text-lg"
            />
            <Pressable
              className="absolute inset-y-0 right-0 top-11 flex items-center pr-3 text-gray-400"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye" size={24} />
              ) : (
                <Icon name="eye-off" size={24} />
              )}
            </Pressable>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <Text className="text-sm text-red-500 mt-1">
                  {formik.errors.confirmPassword}
                </Text>
              )}
          </View>
        </View>
        <View>
          <Pressable onPress={formik.handleSubmit}>
            <Text className="text-center bg-blue-400 py-4 m-2 rounded-lg text-white text-lg font-semibold">
              Buat Akun
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text className="text-md">
          Sudah memiliki akun?{' '}
          <Text className="font-bold underline text-black">Masuk</Text>
        </Text>
      </Pressable>
    </View>
  );
}
