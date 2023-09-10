import {BASE_URL} from '@env';
import axios from 'axios';
import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import tailwind from 'twrnc';

export const Register = () => {
  async function handleRegister() {
    try {
      const {data} = await axios.post(
        `${BASE_URL}/api/v1/auth/signup`,
        {
          email: 'abc123@gmail.com',
          password: '22224444',
          name: '가나다',
          birth: '1996-06-26',
          phoneNumber: '010-1111-2222',
          profileImage: 'www.test.com/profile.jpg',
        },
        {
          withCredentials: true,
        },
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={tailwind`h-full items-center justify-center bg-slate-100`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-4xl font-bold mb-6 text-slate-900`}>
          회원가입
        </Text>
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="E-MAIL"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="PASSWORD"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="NAME"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="BIRTH"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="PHONE"
        />
        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="IMAGE"
        />
        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}>
              <View style={tailwind`bg-green-400 w-4 h-4 rounded-sm`} />
            </Pressable>
            <Text style={tailwind`text-slate-900`}>약관에 동의합니다.</Text>
          </View>
        </View>

        <Pressable
          onPress={() => handleRegister()}
          style={tailwind`h-12 bg-lime-400 rounded-md flex flex-row justify-center items-center px-6`}>
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
