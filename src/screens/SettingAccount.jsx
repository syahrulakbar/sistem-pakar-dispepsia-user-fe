import {Image, Pressable, Text, View} from 'react-native';
import {Button, Form, Heading, Input} from '../components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import CookieManager from '@react-native-cookies/cookies';
import {launchImageLibrary} from 'react-native-image-picker';

export default function SettingAccount({navigation}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async values => {
    try {
      if (values.password === '') delete values.password;

      await Axios.patch(`http://10.0.2.2:5000/api/users/${user.id}`, values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getCurrentUser = async userId => {
    try {
      const response = await Axios.get(
        `http://10.0.2.2:5000/api/users/${userId}`,
        {
          withCredentials: true,
        },
      );
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response?.assets) {
        setPhoto(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    CookieManager.get('http://10.0.2.2:8081/')
      .then(cookies => {
        getCurrentUser(cookies.userId.value);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password must be match')
        .when('password', (password, schema) => {
          if (password[0] !== undefined) {
            return schema.required('Confirm Password is required');
          }
          return schema;
        }),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <View className="w-full h-full flex  flex-col p-2">
      <View className="w-full h-full flex flex-col justify-around">
        <Heading text={`Setting Account`} />
        <View className="w-full h-max flex flex-col justify-around">
          <View className="w-full h-1/5">
            <Text>Profile Picture</Text>
            <Pressable
              onPress={handleChoosePhoto}
              className="flex justify-center items-center">
              {photo && (
                <Image source={{uri: photo.uri}} className="w-full h-full" />
              )}
            </Pressable>
          </View>
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
            placeholder="johndoe@mail.com"
          />
          <Input
            id="password"
            formik={formik}
            label="Password Baru"
            placeholder="Masukan Password Baru"
            formatPassword
          />
          <Input
            id="confirmPassword"
            formik={formik}
            label="Konfirmasi Password Baru"
            placeholder="Ulangi Password Baru"
            formatPassword
          />
        </View>
        <Button
          text="Update Account"
          handleSubmit={formik.handleSubmit}
          disabled={formik.isSubmitting}
          type="blue"
        />
      </View>
    </View>
  );
  return <Form bodyContent={bodyContent} />;
}
