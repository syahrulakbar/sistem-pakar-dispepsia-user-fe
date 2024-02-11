import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
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
    <View className="w-full h-full flex flex-col">
      <View className="w-full px-2 py-4">
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
          className="w-full flex flex-row h-1/5 px-2 my-5">
          <Image
            source={{uri: API_IMAGE + blog.image}}
            className="flex  w-full h-full basis-1/3  bg-cover"
          />
          <View className="flex flex-col basis-2/3 w-full justify-evenly pl-2">
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
    </View>
  );
}
