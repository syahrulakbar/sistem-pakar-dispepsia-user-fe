import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Modal} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import CookieManager from '@react-native-cookies/cookies';
import {useToast} from 'react-native-toast-notifications';
import Axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

export default function SettingAccount({navigation}) {
  const {showModal} = useSelector(state => state.globalReducer);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  const getCurrentUser = async userId => {
    try {
      const response = await Axios.get(
        `http://10.0.2.2:5000/api/users/${userId}`,
        {
          withCredentials: true,
        },
      );
      setUser(response?.data.data);
    } catch (error) {
      toast.show(
        error.response?.data.message || 'Failed to Get Current Account',
        {
          type: 'danger',
        },
      );
      throw error;
    }
  };

  useFocusEffect(
    useCallback(() => {
      CookieManager.get('http://10.0.2.2:8081/')
        .then(cookies => {
          getCurrentUser(cookies.userId.value);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }, []),
  );

  return (
    <>
      {showModal && <Modal showModal={showModal} />}
      <View
        className={`w-full h-full flex flex-col ${showModal && 'opacity-25'}`}>
        <View className="w-full px-2 py-4">
          <Text className="font-extrabold text-blue-400 text-2xl">Account</Text>
        </View>
        <View className="w-full flex items-center my-2">
          <Image
            source={{
              uri: `http://10.0.2.2:5000/assets/${user?.profilePicture}`,
            }}
            className="w-32 h-32 rounded-full "
          />
        </View>
        <View className="w-full flex flex-col items-center my-2">
          <Text className="text-4xl font-bold text-black">{user?.name}</Text>
          <Text className="text-lg text-black">{user?.email}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('SettingAccount')}
          className="w-full flex flex-row justify-between py-2 px-5 items-center my-2">
          <View className="flex flex-row items-center">
            <Icon name="pencil" size={20} />
            <Text className="text-xl text-black ml-2">Setting Account</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} />
        </Pressable>
        <Pressable
          onPress={() => dispatch({type: 'SET_SHOW_MODAL', payload: true})}
          className="w-full flex flex-row justify-between py-2 px-5 items-center my-2">
          <View className="flex flex-row items-center">
            <Icon name="logout" size={20} />
            <Text className="text-xl text-black ml-2">Keluar</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} />
        </Pressable>
      </View>
    </>
  );
}
