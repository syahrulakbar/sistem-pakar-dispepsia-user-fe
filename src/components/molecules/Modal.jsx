import {Text, View} from 'react-native';
import {Button} from '../atoms';
import {useDispatch} from 'react-redux';
import {signOut} from '../../config/Redux/Action';

export default function Modal() {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(signOut());
  };

  return (
    <View className="w-full h-screen absolute flex items-center justify-center top-0 right-0 left-0  z-30">
      <View className="w-[90%] bg-white p-5 rounded-md">
        <View className="mb-2">
          <Text className="text-black text-2xl font-semibold">Keluar Akun</Text>
          <Text className="text-lg">Apakah kamu yakin ingin keluar ?</Text>
        </View>
        <View>
          <Button text="Iya" type="red" handleSubmit={handleSubmit} />
          <Button
            text="Tidak"
            outline
            handleSubmit={() =>
              dispatch({type: 'SET_SHOW_MODAL', payload: false})
            }
          />
        </View>
      </View>
    </View>
  );
}
