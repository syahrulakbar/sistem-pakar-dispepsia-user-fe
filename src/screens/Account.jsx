import React, {useCallback} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Modal} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getCurrentUser} from '../config/Redux/Action';
import Avatar from '../assets/images/avatar.png';

export default function SettingAccount({navigation}) {
  const {showModal, user} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getCurrentUser());
    }, []),
  );

  return (
    <>
      {showModal && <Modal showModal={showModal} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`w-full h-full flex flex-col ${showModal && 'opacity-25'}`}>
        <View className="w-full px-2 py-4">
          <Text className="font-extrabold text-blue-400 text-2xl">Account</Text>
        </View>
        <View className="w-full flex items-center my-2">
          {user?.profilePicture ? (
            <Image
              source={{
                uri: user?.profilePicture,
              }}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <Image source={Avatar} className="w-32 h-32 rounded-full" />
          )}
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
      </ScrollView>
    </>
  );
}
