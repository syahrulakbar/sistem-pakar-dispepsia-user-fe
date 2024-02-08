import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

export default function Blogs({navigation}) {
  const [blogs, setBlogs] = useState([]);
  const toast = useToast();
  const getBlogs = async () => {
    try {
      const response = await Axios.get('http://10.0.2.2:5000/api/blog', {
        withCredentials: true,
      });
      setBlogs(response.data.data);
    } catch (error) {
      toast.show(error.response.data.message || 'Failed to Get Blogs', {
        type: 'danger',
      });
      throw error;
    }
  };
  useEffect(() => {
    getBlogs();
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
            source={{uri: `http://10.0.2.2:5000/assets/${blog.image}`}}
            className="flex  w-full h-full basis-1/3  bg-cover"
          />
          <View className="flex flex-col basis-2/3 w-full justify-evenly pl-2">
            <Text className="font-bold text-xl text-black " numberOfLines={3}>
              {blog.title}
            </Text>
            <Text className="text-base">By Admin Si ParDi</Text>
            <View className="w-full flex flex-row">
              <Text className="text-base text-blue-400 font-medium">
                Dispepsia
              </Text>
              <Text className="text-base mx-2">1m ago</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
