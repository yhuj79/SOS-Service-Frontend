/* eslint-disable no-unused-vars */
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import tailwind from 'twrnc';

// 보호 대상자 등록 컴포넌트
export const Enroll = ({enrollHandleClose}) => {
  const [childEmail, setChildEmail] = useState('');
  const [authKey, setAuthKey] = useState('');

  async function handleEnroll() {
    try {
      const userEmail = await AsyncStorage.getItem('email');
      console.log(userEmail, childEmail);
      const {data} = await axios.post(
        `${BASE_URL}/api/v1/child/register`,
        {
          userEmail: String(userEmail),
          childEmail: String(childEmail),
        },
        {
          withCredentials: true,
        },
      );
      console.log(data);
      enrollHandleClose();
    } catch (error) {
      // console.log(error);
      Alert.alert('대상자 정보를 잘못 입력하셨습니다.');
    }
  }

  return (
    <View style={tailwind`h-full items-center justify-center bg-slate-100`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-4xl font-bold mb-6 text-slate-900`}>
          보호 대상자 등록
        </Text>
        {/* childEmail, authKey 상태값 저장 */}
        <Text style={tailwind`text-4 mb-1 text-slate-900`}>이메일</Text>
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="E-MAIL"
          onChangeText={e => setChildEmail(e)}
        />
        <Text style={tailwind`text-4 mb-1 text-slate-900`}>인증번호</Text>
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="AUTH KEY"
          onChangeText={e => setAuthKey(e)}
        />
        <View style={tailwind`flex flex-row justify-between items-center my-5`}>
          <Pressable>
            <Text style={tailwind`text-blue-600 font-bold`}>
              보호 대상자 기기 앱의 마이페이지에서
            </Text>
            <Text style={tailwind`text-blue-600 font-bold`}>
              인증번호를 확인 후 입력해 주세요.
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => handleEnroll()}
          style={tailwind`h-12 bg-lime-400 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-bold`}>등록</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => enrollHandleClose()}
          style={tailwind`mt-3 h-12 bg-transparent border-2 border-gray-500 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-gray-500 text-base font-bold`}>
              뒤로가기
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
