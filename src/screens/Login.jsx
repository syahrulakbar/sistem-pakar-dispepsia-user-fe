import {useState} from 'react';
import {KeyboardAvoidingView, Pressable, Text, View} from 'react-native';
import {Button, Form, Heading, Input} from '../components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {signIn} from '../config/Redux/Action';

export default function Login({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    dispatch(signIn(values, formik, navigation));
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
