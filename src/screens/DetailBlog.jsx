import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

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
      <View className="w-full">
        <Image
          source={{uri: `http://10.0.2.2:5000/assets/${blog.image}`}}
          className="w-full h-full flex basis-1/3 bg-cover"
        />
        <View className="p-2">
          <Text className="w-full font-bold text-2xl text-black ">
            {blog.title}
          </Text>
          <Text className="text-black text-lg">{blog.description}</Text>
        </View>
      </View>
    </View>
  );
}
