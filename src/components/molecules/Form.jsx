import {Text} from 'react-native';

export default function Form({...rest}) {
  const {bodyContent, footer, title} = rest;
  return (
    <>
      {title && (
        <Text className="font-semibold text-2xl text-center">{title}</Text>
      )}
      {bodyContent}
    </>
  );
}
