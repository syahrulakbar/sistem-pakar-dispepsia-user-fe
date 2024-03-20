import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from '../components';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AxiosJWTConfig from '../utils/axiosJWT';
import {Toast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import HTMLView from 'react-native-htmlview';

export default function Konsultasi({navigation}) {
  const [gejalas, setGejalas] = useState({});
  const [rule, setRule] = useState({});
  const [gejala, setGejala] = useState([]);
  const {isUpdate} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  const handlePressYes = async (id, nextId) => {
    try {
      setGejala(prevState => [...prevState, id]);
      const updatedGejala = [...gejala, id];

      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.post(
        `/expert-system`,
        {
          gejala_ids: updatedGejala,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const matched = response.data.data.matched;
      if (matched) {
        dispatch({type: 'SET_IS_UPDATE', payload: !isUpdate});
        setRule(response?.data.data.rule.penyakits);
      } else {
        if (nextId === null) {
          setRule({matched: false});
        } else {
          const responseQuest = await AxiosJWT.get(`/gejala/${nextId}`);
          setGejalas(responseQuest?.data.data);
        }
      }
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };

  const handlePressNo = async id => {
    try {
      if (id === null) {
        setRule({matched: false});
      } else {
        const AxiosJWT = await AxiosJWTConfig();
        const response = await AxiosJWT.get(`/gejala/${id}`);
        setGejalas(response?.data.data);
      }
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };

  const getQuestion = async () => {
    try {
      const AxiosJWT = await AxiosJWTConfig();
      const response = await AxiosJWT.get(`/dispepsia`);
      setGejalas(response?.data.data);
    } catch (error) {
      Toast.show(error.response?.data.message || 'Failed to Get Question', {
        type: 'danger',
      });
      throw error;
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (rule?.nama_penyakit) return;
        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, rule],
  );

  return (
    <View className="w-full h-screen justify-start gap-2 relative">
      <View className="w-full flex flex-row gap-2 items-center mb-2 ">
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons name="arrow-back" size={30} style={{color: 'black'}} />
        </Pressable>
        <Text className="font-bold text-2xl text-black">Menu Konsultasi</Text>
      </View>
      {rule?.nama_penyakit && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full h-full flex flex-col px-4">
          <Text className="font-bold text-black text-2xl">Hasil Diagnosa</Text>
          <Text className="text-xl text-black">{rule?.nama_penyakit}</Text>
          <Text className="font-bold text-black text-2xl">Solusi</Text>
          <HTMLView
            value={'<div>' + rule?.solusi + '</div>'}
            stylesheet={styles}
          />
          <View className="w-full flex flex-row p-1 gap-1">
            <View className="w-1/2">
              <Button
                text="Konsultasi Lagi"
                type="blue"
                handleSubmit={() => navigation.navigate('Home')}
              />
            </View>
            <View className="w-1/2 ">
              <Button
                text="Selesai"
                outline
                handleSubmit={() => navigation.navigate('RiwayatKonsultasi')}
              />
            </View>
          </View>
        </ScrollView>
      )}
      {rule?.matched === false ? (
        <View className=" h-full justify-center items-center flex">
          <Text className="text-black text-2xl text-center">
            Mohon maaf, penyakit anda tidak dapat didiagnosa
          </Text>
          <View className="w-full flex flex-row p-1 gap-1">
            <View className="w-1/2">
              <Button
                text="Konsultasi Ulang"
                type="blue"
                handleSubmit={() => navigation.navigate('Home')}
              />
            </View>
            <View className="w-1/2 ">
              <Button
                text="Selesai"
                outline
                handleSubmit={() => navigation.navigate('RiwayatKonsultasi')}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          className={`${
            rule?.nama_penyakit ? 'hidden' : 'flex'
          } h-full justify-center items-center`}>
          <Text className="text-black text-2xl text-center">
            {gejalas?.pertanyaan || 'Loading'}
          </Text>
          <View className="w-full flex flex-row p-1 gap-1">
            <View className="w-1/2">
              <Button
                text="Ya"
                type="blue"
                handleSubmit={() =>
                  handlePressYes(gejalas?.id, gejalas?.ya_tanya)
                }
              />
            </View>
            <View className="w-1/2 ">
              <Button
                text="Tidak"
                handleSubmit={() => handlePressNo(gejalas?.tidak_tanya)}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  div: {
    fontSize: 20,
    color: '#000000',
  },
});
