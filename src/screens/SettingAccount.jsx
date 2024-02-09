import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {Button, Form, Heading, Input} from '../components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {useEffect, useState} from 'react';
import CookieManager from '@react-native-cookies/cookies';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';

export default function SettingAccount({navigation}) {
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const toast = useToast();
  const handleSubmit = async values => {
    try {
      const formData = new FormData();
      if (values.password) formData.append('password', values.password);
      formData.append('profilePicture', values.profilePicture);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('confirmPassword', values.confirmPassword);

      await Axios.patch(`http://10.0.2.2:5000/api/users/${user.id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.show('Update Account Success', {
        type: 'success',
      });
      navigation.navigate('Account');
    } catch (error) {
      toast.show(error.response?.data.message || 'Failed to Update Account', {
        type: 'danger',
      });
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
      setUser(response?.data.data);
      setPhoto(
        `http://10.0.2.2:5000/assets/${response?.data.data.profilePicture}`,
      );
    } catch (error) {
      toast.show(
        error.response?.data.message || 'Failed to Get Current Account',
        {
          type: 'danger',
        },
      );
      throw error;
    }
  };

  const options = {
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const handleChoosePhoto = async () => {
    const image = await launchImageLibrary(options);
    const file = image.assets[0];
    const profilePicture = {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
      fileSize: file.fileSize,
      originalPath: file.originalPath,
      height: file.height,
      width: file.width,
    };
    formik.setFieldValue('profilePicture', profilePicture);
    setPhoto(profilePicture);
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
      profilePicture: user?.profilePicture || null,
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
      profilePicture: Yup.mixed()
        .test('fileSize', 'Image size maks 3 MB', value => {
          if (value.size) {
            const maxSize = 3 * 1024 * 1024;
            return value.size <= maxSize;
          }
          return true;
        })
        .test('imageType', 'Only image files are allowed', value => {
          if (value.type) {
            const allowedTypes = [
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/gif',
            ];
            return allowedTypes.includes(value.type);
          }
          return true;
        }),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="w-full h-full flex flex-col  justify-evenly items-center p-2">
        <View className="w-full flex flex-col justify-around">
          <Heading text={`Setting Account`} />
          <View className="w-full flex flex-col justify-around">
            <View className="w-full h-48 mb-5">
              <Text className="text-black">Profile Picture</Text>
              <Pressable
                onPress={handleChoosePhoto}
                className="flex justify-center items-center mt-2">
                {photo ? (
                  <Image
                    source={{uri: photo.uri ? photo.uri : photo}}
                    className="w-full h-full rounded-md"
                  />
                ) : (
                  <View className="w-full h-full flex items-center rounded-md justify-center border">
                    <Text>Choose Photo</Text>
                  </View>
                )}
              </Pressable>
              {formik.errors.profilePicture && (
                <Text className="text-red-500 text-sm">
                  {formik.errors.profilePicture}
                </Text>
              )}
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
    </ScrollView>
  );
  return <Form bodyContent={bodyContent} />;
}
