import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import {API_IMAGE} from '@env';

export default function DetailBlog({route, navigation}) {
  const {width} = useWindowDimensions();

  const {blog} = route.params;
  const baseStyle = {color: 'black', fontSize: 18};
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
          source={{uri: API_IMAGE + blog.image}}
          className="w-full h-full flex basis-1/3 bg-cover"
        />
        <View className="p-2">
          <Text className="w-full font-bold text-2xl text-black ">
            {blog.title}
          </Text>
          <HTML
            contentWidth={width}
            baseStyle={baseStyle}
            source={{html: blog.description}}
          />
        </View>
      </View>
    </View>
  );
}
