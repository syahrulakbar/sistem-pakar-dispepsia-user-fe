import Axios from 'axios';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import * as Yup from 'yup';
import {useToast} from 'react-native-toast-notifications';
import {Button, Heading, Input} from '../components';
import {signUp} from '../config/Redux/Action';

export default function Signup({navigation}) {
  const toast = useToast();

  const handleSubmit = async values => {
    signUp(values, formik, navigation);
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="w-full h-screen flex flex-col  justify-evenly items-center p-2">
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
    </ScrollView>
  );
}
