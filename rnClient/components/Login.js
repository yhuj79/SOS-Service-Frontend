import {BASE_URL} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import tailwind from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

// 로그인 컴포넌트
export const Login = ({registerHandleOpen, loginHandleClose}) => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  // 로그인 처리 함수
  async function handleLogin() {
    try {
      const data = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          email: String(email),
          password: String(passwd),
        },
        {
          withCredentials: true,
        },
      );
      const parseValue = JSON.parse(data.config.data);
      AsyncStorage.setItem('email', parseValue.email);
      console.log('AsyncStorage Success');
      RNRestart.restart();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={tailwind`h-full items-center justify-center bg-slate-100`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-4xl font-bold mb-6 text-slate-900`}>
          로그인
        </Text>
        {/* email, passwd 상태값 저장 */}
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="E-MAIL"
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="PASSWORD"
          secureTextEntry={true}
          onChangeText={e => setPasswd(e)}
        />
        {/* 아이디 찾기는 UI만 구현되어 있음 */}
        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <Pressable>
            <Text style={tailwind`text-blue-400 font-bold`}>
              아이디/비밀번호 찾기
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => handleLogin()}
          style={tailwind`h-12 bg-lime-400 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-bold`}>로그인</Text>
          </View>
        </Pressable>
        {/* Props로 받은 함수 통해 Register 컴포넌트로 이동 */}
        <Pressable
          onPress={() => registerHandleOpen()}
          style={tailwind`mt-2.5 h-12 bg-emerald-400 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-bold`}>
              회원가입
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
