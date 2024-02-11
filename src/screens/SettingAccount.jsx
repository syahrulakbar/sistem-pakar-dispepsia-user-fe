import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {Button, Form, Heading, Input} from '../components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateUser} from '../config/Redux/Action';
import {API_IMAGE} from '@env';
import {useSelector} from 'react-redux';

export default function SettingAccount({navigation}) {
  const {user} = useSelector(state => state.globalReducer);
  const [photo, setPhoto] = useState(API_IMAGE + user?.profilePicture || null);

  const handleSubmit = values => {
    updateUser(values, navigation, user);
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
    if (image.didCancel) return;
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
            <View className="w-full h-48 mb-7">
              <Text className="text-black">Profile Picture</Text>
              <Pressable
                onPress={handleChoosePhoto}
                className="flex justify-center items-center mt-2">
                {user?.profilePicture ? (
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
