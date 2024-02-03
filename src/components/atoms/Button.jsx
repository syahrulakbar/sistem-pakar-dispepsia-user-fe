import {Pressable, Text} from 'react-native';

export default function Button({...rest}) {
  const {text, handleSubmit, disabled = false} = rest;
  return (
    <Pressable onPress={handleSubmit} disabled={disabled}>
      <Text className=" text-center bg-blue-400 py-4 m-2 rounded-lg text-white text-lg font-semibold">
        {disabled ? <Text>Loading....</Text> : text}
      </Text>
    </Pressable>
  );
}
