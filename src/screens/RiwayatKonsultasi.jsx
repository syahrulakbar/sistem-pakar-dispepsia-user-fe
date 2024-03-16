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

  const historyKonsultasi = [
    {
      id: 1,
      tanggal: '1 Desember 2024',
      hasil: 'Dispepsia Ulkus',
      gejala: ['Mual', 'Muntah', 'Nyeri Perut'],
      solusi: [
        'Membatasi konsumsi makanan yang bisa menyebabkan terjadinya dispepsia',
        'Makan dalam porsi kecil, tetapi sering dan dianjurkan untuk makan 5–6 kali sehari',
        'Membatasi konsumsi kafein dan alkohol',
        'Menghindari penggunaan atau konsumsi antinyeri, seperti aspirin dan ibuprofen. Gunakan antinyeri lain yang lebih aman bagi lambung seperti parasetamol.',
      ],
    },
    {
      id: 2,
      tanggal: '5 Desember 2024',
      hasil: 'Dispepsia Ulkus',
      gejala: ['Mual', 'Muntah', 'Nyeri Perut'],
      solusi: [
        'Membatasi konsumsi makanan yang bisa menyebabkan terjadinya dispepsia',
        'Makan dalam porsi kecil, tetapi sering dan dianjurkan untuk makan 5–6 kali sehari',
        'Membatasi konsumsi kafein dan alkohol',
        'Menghindari penggunaan atau konsumsi antinyeri, seperti aspirin dan ibu profen. Gunakan antinyeri lain yang lebih aman bagi lambung seperti parasetamol.',
      ],
    },
  ];
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
      {historyKonsultasi.length === 0 ? (
        <View className="w-full h-full flex justify-center items-center">
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
                  {item?.rule?.penyakit.nama_penyakit}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
