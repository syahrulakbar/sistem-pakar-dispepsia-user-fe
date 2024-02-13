import React, {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {getBlogs} from '../config/Redux/Action';
import {API_IMAGE} from '@env';
import moment from 'moment';

export default function Blogs({navigation}) {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <View className="w-full h-full flex flex-col  ">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full  px-2 py-4">
          <Text className="font-extrabold text-blue-400 text-2xl">
            Berita Kesehatan
          </Text>
        </View>
        {blogs?.map(blog => (
          <Pressable
            onPress={() =>
              navigation.navigate('DetailBlog', {
                blog,
              })
            }
            key={blog.id}
            className="w-full bg-white rounded-md shadow-md flex flex-row h-40 px-2 my-2">
            <Image
              source={{uri: API_IMAGE + blog.image}}
              className="flex w-1/3 h-full  bg-cover rounded-md"
            />
            <View className="flex flex-col  w-2/3 justify-evenly pl-2">
              <Text className="font-bold text-xl text-black " numberOfLines={3}>
                {blog.title}
              </Text>
              <Text className="text-base">By Admin Si ParDi</Text>
              <Text className="text-base">
                {moment(blog?.createdAt).fromNow()}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
