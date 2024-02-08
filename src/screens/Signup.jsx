import Axios from 'axios';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import {useToast} from 'react-native-toast-notifications';
import {Button, Heading, Input} from '../components';

export default function Signup({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSubmit = async values => {
    try {
      await Axios.post('http://10.0.2.2:5000/api/register', values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      formik.resetForm();
      toast.show('Register Successfully, Please Login', {
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error) {
      toast.show(error.response.data.message || 'Failed to Register Account', {
        type: 'danger',
      });
      throw error;
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
    <KeyboardAvoidingView className="flex flex-1" behavior="height">
      <View className="w-full h-screen flex  flex-1 flex-col  justify-evenly items-center p-2">
        <View className="w-full flex flex-col justify-around">
          <Heading text="Buat Akun Si ParDi" />
          <View className="w-full flex flex-col justify-around">
            <Input
              id="name"
              formik={formik}
              label="Name"
              placeholder="John Doe"
            />
            <Input
              id="email"
              formik={formik}
              label="Email Address"
              keyboardType="email-address"
              placeholder="johndoe@johndoe.com"
            />
            <Input
              id="password"
              formik={formik}
              label="Password"
              placeholder="***********"
              formatPassword
            />
            <Input
              id="confirmPassword"
              formik={formik}
              label="Confirmation Password"
              placeholder="***********"
              formatPassword
            />
          </View>
          <Button
            text="Buat Akun"
            type="blue"
            handleSubmit={formik.handleSubmit}
          />
        </View>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text className="text-md">
            Sudah memiliki akun?{' '}
            <Text className="font-bold underline text-black">Masuk</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
