import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button} from '../components';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AxiosJWTConfig from '../utils/axiosJWT';
import {Toast} from 'react-native-toast-notifications';

export default function Konsultasi({navigation}) {
  const [gejalas, setGejalas] = useState({});
  const [gejala, setGejala] = useState([]);
  const handlePressYes = async id => {
    try {
      setGejala(prevState => [...prevState, id]);
      const updatedGejala = [...gejala, id];
      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.post(
        `/expert-system`,
        {
          gejala_ids: updatedGejala,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const matched = response?.data.data.matched;
      console.log(response?.data.data);
      if (matched) {
        setGejalas({
          pertanyaan: 'Anda menderita penyakit dispepsia ulkus',
        });
      } else {
        const responseQuest = await AxiosJWT.get(`/gejala/${id}`);
        setGejalas(responseQuest?.data.data);
      }
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };
  const handlePressNo = async id => {
    try {
      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.get(`/gejala/${id}`);
      setGejalas(response?.data.data);
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };
  const getQuestion = async () => {
    try {
      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.get(`/dispepsia`);
      setGejalas(response?.data.data);
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <View className="w-full h-screen items-center justify-start gap-2 relative">
      <View className="w-full flex flex-row gap-2 items-center mb-2 ">
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons name="arrow-back" size={30} style={{color: 'black'}} />
        </Pressable>
        <Text className="font-bold text-2xl text-black">Konsultasi</Text>
      </View>
      <View className="flex h-full justify-center">
        <Text className="text-black text-2xl text-center">
          {gejalas?.pertanyaan || 'Loading'}
        </Text>

        <View className="w-full flex flex-row p-1 gap-1">
          <View className="w-1/2">
            <Button
              text="Ya"
              type="blue"
              handleSubmit={() => handlePressYes(gejalas?.ya_tanya)}
            />
          </View>
          <View className="w-1/2 ">
            <Button
              text="Tidak"
              handleSubmit={() => handlePressNo(gejalas?.tidak_tanya)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
