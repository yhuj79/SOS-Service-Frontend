import {BASE_URL} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {View, Text, Image, Pressable, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tailwind from 'twrnc';
import {ChildCard} from './ChildCard';

// eslint-disable-next-line react-native/no-inline-styles
const B = props => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

// 내정보 컴포넌트
export const MyPage = ({myPageHandleClose}) => {
  const [info, setInfo] = useState({});
  const [child, setChild] = useState({});

  useEffect(() => {
    async function getMyInfo() {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await axios.post(
          `${BASE_URL}/api/v1/auth/me`,
          {email: email},
          {
            withCredentials: true,
          },
        );
        setInfo(data.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    async function getMyChild() {
      try {
        const email = await AsyncStorage.getItem('email');
        const data = await axios.post(
          `${BASE_URL}/api/v1/child`,
          {email: email},
          {
            withCredentials: true,
          },
        );
        setChild(data.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getMyInfo();
    getMyChild();
  }, []);

  function handleLogout() {
    Alert.alert(
      '로그아웃 하시겠습니까?',
      '',
      [
        {
          text: '취소',
          onPress: () => {},
        },
        {text: '확인', onPress: () => removeAuth()},
      ],
      {cancelable: false},
    );
  }

  async function removeAuth() {
    try {
      await AsyncStorage.removeItem('email');
      console.log('Removed Success');
      RNRestart.restart();
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <View style={tailwind`p-8 h-full bg-slate-50`}>
      {info && (
        <>
          <View style={tailwind`flex-1 items-center justify-center gap-4`}>
            <Image
              source={{uri: 'https://source.unsplash.com/random'}}
              style={tailwind`w-24 h-24 mb-2 rounded-full`}
              resizeMode="cover"
            />
            <View style={tailwind`gap-2 items-center`}>
              <Text style={tailwind`text-slate-900 text-3xl font-bold`}>
                {info.name}
              </Text>
              <Text style={tailwind`text-slate-900 text-lg`}>{info.email}</Text>
            </View>
          </View>
          <View style={tailwind`flex-1 justify-center gap-8`}>
            <Pressable style={tailwind`flex-row items-center mb-2 gap-2 px-4`}>
              <FontAwesome5
                name="birthday-cake"
                size={20}
                style={tailwind`text-slate-900 mr-2`}
              />
              <Text style={tailwind`text-slate-900 text-lg`}>
                생년월일 :&emsp;
                <B>{info.birth}</B>
              </Text>
            </Pressable>
            <Pressable style={tailwind`flex-row items-center mb-2 gap-2 px-4`}>
              <FontAwesome5
                name="phone-square"
                size={20}
                style={tailwind`text-slate-900 mr-2`}
              />
              <Text style={tailwind`text-slate-900 text-lg`}>
                연락처 :&emsp;<B>{info.phoneNumber}</B>
              </Text>
            </Pressable>
            {child.email ? (
              <ChildCard child={child} />
            ) : (
              <View
                style={tailwind`p-8 mt-2.5 bg-blue-500 rounded-xl p-4 items-center shadow-lg`}>
                <Text style={tailwind`text-white text-xl font-bold`}>
                  등록된 보호 대상자가 없습니다.
                </Text>
              </View>
            )}
          </View>
        </>
      )}
      <Pressable
        onPress={() => myPageHandleClose()}
        style={tailwind`mt-1 h-12 bg-transparent border-2 border-gray-500 rounded-md flex flex-row justify-center items-center px-6`}>
        <View style={tailwind`flex-1 flex items-center`}>
          <Text style={tailwind`text-gray-500 text-base font-bold`}>
            뒤로가기
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => handleLogout()}
        style={tailwind`mt-3 h-12 bg-slate-950 rounded-md flex flex-row justify-center items-center px-6`}>
        <View style={tailwind`flex-1 flex items-center`}>
          <Text style={tailwind`text-white text-base font-bold`}>로그아웃</Text>
        </View>
      </Pressable>
    </View>
  );
};
