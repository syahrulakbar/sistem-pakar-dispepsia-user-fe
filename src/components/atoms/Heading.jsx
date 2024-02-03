import {Text} from 'react-native';

export default function Heading({...rest}) {
  const {text} = rest;
  return <Text className="font-bold text-black text-3xl">{text}</Text>;
}
