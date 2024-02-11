import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Welcome,
  Login,
  Signup,
  DetailBlog,
  SettingAccount,
} from '../../screens';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import {checkUser} from '../Redux/Action';

export default function Router() {
  const Stack = createNativeStackNavigator();
  const {isLogin, isLoading} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (isLoading)
    return (
      <View className="flex w-full h-full justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLogin ? (
        <>
          <Stack.Screen name="Protected" component={ProtectedRoute} />
          <Stack.Screen name="DetailBlog" component={DetailBlog} />
          <Stack.Screen name="SettingAccount" component={SettingAccount} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
