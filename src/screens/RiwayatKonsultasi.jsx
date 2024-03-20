import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import imgKonsultasi from '../assets/images/Illustration.png';
import {Button} from '../components';
import AxiosJWTConfig from '../utils/axiosJWT';
import {Toast} from 'react-native-toast-notifications';
import moment from 'moment';
import {useSelector} from 'react-redux';

export default function RiwayatKonsultasi({navigation}) {
  const [konsultasi, setKonsultasi] = useState([]);
  const {isUpdate} = useSelector(state => state.globalReducer);

  const getKonsultasi = async () => {
    try {
      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.get(`/konsultasi`);
      setKonsultasi(response?.data.data);
    } catch (error) {
      Toast.show(
        error.response?.data.message || 'Failed to Get Data Konsultasi',
        {
          type: 'danger',
        },
      );
      throw error;
    }
  };
  useLayoutEffect(() => {
    getKonsultasi();
  }, [isUpdate]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="w-full h-full flex flex-col">
      <View className="w-full px-2 py-4">
        <Text className="font-extrabold text-blue-400 text-2xl">
          Riwayat Konsultasi
        </Text>
      </View>
      {konsultasi.length === 0 ? (
        <View className="w-full h-screen flex justify-center items-center">
          <Image source={imgKonsultasi} aria-label="img-no-history" />
          <Text className="text-black text-lg">
            Tidak ada riwayat konsultasi
          </Text>
          <View className="w-full px-2">
            <Button
              text="Konsultasi Sekarang"
              type="blue"
              handleSubmit={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      ) : (
        <View className="w-full h-full flex flex-col px-2">
          {konsultasi?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate('DetailKonsultasi', {item})}
              className="w-full bg-white  rounded-md shadow-xl my-2">
              <View className="w-full flex flex-col items-start my-2 rounded-md shadow-lg px-5 ">
                <Text className="text-black text-xl font-bold">
                  {moment(item.createdAt).format('MMMM Do YYYY')}
                </Text>
                <Text className="text-gray-500 text-lg">
                  {item?.rules?.penyakits.nama_penyakit}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
