import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {API_IMAGE} from '@env';
import HTMLView from 'react-native-htmlview';

export default function DetailBlog({route, navigation}) {
  const {blog} = route.params;
  return (
    <View className="w-full h-full flex flex-col">
      <View className="w-full px-2 py-4 flex flex-row items-center">
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons name="arrow-back" size={30} />
        </Pressable>
        <Text className="font-extrabold text-blue-400 text-2xl mx-2">
          Berita Kesehatan
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-full">
          <Image
            source={{uri: API_IMAGE + blog.image}}
            className="w-full h-56  bg-cover"
          />
          <View className="p-2 ">
            <Text className="w-full font-bold text-2xl text-black  mb-5">
              {blog.title}
            </Text>

            <HTMLView
              value={'<div>' + blog.description + '</div>'}
              stylesheet={styles}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  div: {
    fontSize: 20,
    color: '#000000',
  },
});
