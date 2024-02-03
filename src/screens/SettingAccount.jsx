import React from 'react';
import {Text, View} from 'react-native';

export default function SettingAccount() {
  return (
    <View className="w-full h-full flex flex-col justify-between">
      <View className="w-full px-2 py-4">
        <Text className="font-extrabold text-blue-400 text-2xl">
          Setting Account
        </Text>
      </View>
    </View>
  );
}
