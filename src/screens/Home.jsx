import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '../components';
import {useToast} from 'react-native-toast-notifications';

export default function Home() {
  const toast = useToast();

  return (
    <View className="w-full h-full flex flex-col">
      <View className="w-full px-2 py-4">
        <Text className="font-extrabold text-blue-400 text-2xl">
          Menu Konsultasi
        </Text>
      </View>
      <View className="w-full h-full flex justify-center items-center">
        <Text className="text-black text-2xl font-bold">
          Sistem Pakar Dispepsia
        </Text>
        <Text className="text-gray-500 text-lg px-2 text-center">
          Beritahu kami apa yang selama ini kamu rasakan
        </Text>
        <View className="w-full px-2">
          <Button
            text="Mulai Konsultasi"
            type="blue"
            handleSubmit={() =>
              toast.show('Fitur ini belum tersedia', {type: 'success'})
            }
          />
        </View>
      </View>
    </View>
  );
}
