import {Pressable, Text} from 'react-native';

export default function Button({...rest}) {
  const {text, handleSubmit, disabled = false, type, outline} = rest;

  return (
    <Pressable onPress={handleSubmit} disabled={disabled}>
      <Text
        className={`text-center
        ${
          type === 'blue'
            ? 'bg-blue-400 text-white'
            : outline
            ? 'bg-white text-black border'
            : 'bg-red-500 text-white'
        }
        py-3 my-2 rounded-lg  text-lg font-semibold`}>
        {disabled ? <Text>Loading....</Text> : text}
      </Text>
    </Pressable>
  );
}
