import React from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import welcomeImage from '../assets/images/welcome.png';

export default function Welcome({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="w-full h-screen flex flex-col justify-center gap-5">
        <Image source={welcomeImage} className="w-full h-1/2" />
        <View className="w-full flex justify-center">
          <Text className="text-center font-bold text-4xl text-black">
            Si ParDi
          </Text>
          <Text className="text-center text-md ">
            Sistem Pakar Diagnosa Dispepsia
          </Text>
          <Text className="text-center text-md">
            Konsultasikan gejalamu kepada ahlinya
          </Text>
        </View>
        <View className="w-full flex flex-col">
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-center bg-blue-400 py-4 m-2 rounded-lg text-white text-lg font-semibold">
              Masuk
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text className="text-center border border-black py-4 m-2 rounded-lg text-black text-lg font-semibold">
              Buat Akun
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
