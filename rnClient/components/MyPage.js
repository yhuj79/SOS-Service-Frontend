import {BASE_URL} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {View, Text, Pressable, Alert} from 'react-native';
import tailwind from 'twrnc';

// 내정보 컴포넌트
export const MyPage = ({myPageHandleClose}) => {
  const [info, setInfo] = useState({});
  const [child, setChild] = useState({});

  useEffect(() => {
    async function getMyInfo() {
      try {
        const data = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
          withCredentials: true,
        });
        setInfo(data.data.response);
      } catch (err) {
        console.log(err);
      }
    }
    getMyInfo();
  }, []);

  useEffect(() => {
    async function getMyChild() {
      try {
        const data = await axios.get(`${BASE_URL}/api/v1/child`, {
          withCredentials: true,
        });
        setChild(data, null, 3);
      } catch (err) {
        console.log(err);
      }
    }
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
    <View style={tailwind`h-full items-center justify-center bg-slate-100`}>
      <View style={tailwind`p-4 w-full max-w-sm`}>
        <Text style={tailwind`text-4xl font-bold mb-6 text-slate-900`}>
          마이페이지
        </Text>
        {info && (
          <>
            <Text style={tailwind`text-2xl font-bold mb-3 text-slate-900`}>
              메일&emsp;:&emsp;{info.email}
            </Text>
            <Text style={tailwind`text-2xl font-bold mb-3 text-slate-900`}>
              이름&emsp;:&emsp;{info.name}
            </Text>
            <Text style={tailwind`text-2xl font-bold mb-3 text-slate-900`}>
              생년월일&emsp;:&emsp;{info.birth}
            </Text>
            <Text style={tailwind`text-2xl font-bold mb-3 text-slate-900`}>
              연락처&emsp;:&emsp;{info.phoneNumber}
            </Text>
            <Text style={tailwind`text-2xl font-bold mb-3 text-slate-900`}>
              프로필&emsp;:&emsp;{info.profileImage}
            </Text>
          </>
        )}
        <Pressable
          onPress={() => myPageHandleClose()}
          style={tailwind`mt-2.5 h-12 bg-transparent border-2 border-gray-500 rounded-md flex flex-row justify-center items-center px-6`}>
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
            <Text style={tailwind`text-white text-base font-bold`}>
              로그아웃
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => console.log(child)}
          style={tailwind`mt-3 h-12 bg-slate-950 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-bold`}>
              console.log(child)
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
