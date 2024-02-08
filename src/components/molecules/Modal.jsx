import {Text, View} from 'react-native';
import {Button} from '../atoms';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

export default function Modal() {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = async values => {
    try {
      await Axios.delete('http://10.0.2.2:5000/api/logout', {
        withCredentials: true,
      });
      toast.show('Logout Successfully', {
        type: 'success',
      });
      dispatch({type: 'SET_SHOW_MODAL', payload: false});
      dispatch({type: 'SET_IS_LOGIN', payload: false});
    } catch (error) {
      toast.show(error.response.data.message || 'Failed Logout', {
        type: 'danger',
      });
      throw error;
    }
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
