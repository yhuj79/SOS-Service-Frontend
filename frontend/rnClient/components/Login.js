import {BASE_URL} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import tailwind from 'twrnc';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

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
      console.log(JSON.stringify(data, null, 3));
      console.log('data.config.data : ', data.config.data);
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

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="E-MAIL"
          onChangeText={e => setEmail(e)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="PASSWORD"
          onChangeText={e => setPasswd(e)}
        />

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}>
              <View style={tailwind`bg-green-400 w-4 h-4 rounded-sm`} />
            </Pressable>
            <Text style={tailwind`text-slate-900`}>아이디 저장</Text>
          </View>
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
            <Text style={tailwind`text-white text-base font-medium`}>
              로그인
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => console.log(email, passwd)}
          style={tailwind`mt-2.5 h-12 bg-emerald-400 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>
              회원가입
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
