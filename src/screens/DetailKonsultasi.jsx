import moment from 'moment';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';

export default function DetailKonsultasi({route, navigation}) {
  const {item} = route.params;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="w-full h-full flex flex-col">
      <View className="w-full px-2 py-4">
        <Text className="font-extrabold text-blue-400 text-2xl">
          Riwayat Konsultasi
        </Text>
      </View>
      <View className="w-full h-full rounded-md flex p-4 pt-0">
        <View className="w-full flex flex-row gap-2 items-center mb-2">
          <Pressable onPress={() => navigation.goBack()}>
            <IonIcons name="arrow-back" size={30} style={{color: 'black'}} />
          </Pressable>
          <Text className="font-bold text-2xl text-black">
            {moment(item.createdAt).format('MMMM Do YYYY')}
          </Text>
        </View>
        <View className="my-2">
          <Text className="font-bold text-xl text-black">Hasil Diagnosa</Text>
          <Text className="text-black text-lg">
            {item.rule.penyakit.nama_penyakit}
          </Text>
        </View>
        <View className="my-2">
          <Text className="font-bold text-xl text-black">
            Gejala Yang Dialami
          </Text>
          {item.rule.gejalas.map((gejala, index) => (
            <Text className="text-black text-lg" key={index}>
              {'\u2022 ' + gejala.nama_gejala}
            </Text>
          ))}
        </View>
        <View className="my-2">
          <Text className="font-bold text-xl text-black">Solusi</Text>

          <HTMLView
            value={'<div>' + item.rule.penyakit.solusi + '</div>'}
            stylesheet={styles}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  div: {
    fontSize: 20,
    color: '#000000',
  },
});
