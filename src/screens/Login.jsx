import {useState} from 'react';
import {KeyboardAvoidingView, Pressable, Text, View} from 'react-native';
import {Button, Form, Heading, Input} from '../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

export default function Login({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async values => {
    try {
      await Axios.post('http://10.0.2.2:5000/api/login', values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      formik.resetForm();
      toast.show('Login Successfully', {
        type: 'success',
      });
      dispatch({type: 'SET_IS_LOGIN', payload: true});
      navigation.navigate('Protected');
    } catch (error) {
      toast.show(error.response.data.message || 'Failed to Login', {
        type: 'danger',
      });
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <View className="w-full h-screen flex flex-1 flex-col justify-evenly items-center p-2">
      <View className="w-full flex flex-col justify-around">
        <Heading text={`Hallo,\nSelamat Datang`} />
        <View className="w-full flex flex-col justify-around">
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
        </View>
        <View>
          <View className="flex flex-row justify-start mb-2 items-center">
            <BouncyCheckbox
              fillColor="#38bdf8"
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text className="text-base">Ingat Saya</Text>
          </View>
          <Button
            text="Masuk"
            handleSubmit={formik.handleSubmit}
            disabled={formik.isSubmitting}
            type="blue"
          />
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text className="text-md">
          Belum memiliki akun?{' '}
          <Text className="font-bold underline text-black">Buat Akun</Text>
        </Text>
      </Pressable>
    </View>
  );
  return (
    <KeyboardAvoidingView behavior="height" className="flex flex-1">
      <Form bodyContent={bodyContent} />
    </KeyboardAvoidingView>
  );
}
