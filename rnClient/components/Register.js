import {BASE_URL} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import tailwind from 'twrnc';

// 회원가입 컴포넌트
export const Register = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');

  // 회원가입 처리 함수
  async function handleRegister() {
    try {
      const {data} = await axios.post(
        `${BASE_URL}/api/v1/auth/signup`,
        {
          email: String(email),
          password: String(passwd),
          name: String(name),
          birth: String(birth),
          phoneNumber: String(phoneNumber),
          profileImage: String(profileImage),
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
        {/* 회원가입 항목들 상태값 저장 */}
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="E-MAIL"
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="PASSWORD"
          secureTextEntry={true}
          onChangeText={e => setPasswd(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="NAME"
          onChangeText={e => setName(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="BIRTH"
          onChangeText={e => setBirth(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4 mb-3`}
          placeholderTextColor="#BDBDBD"
          placeholder="PHONE"
          onChangeText={e => setPhoneNumber(e)}
        />
        <TextInput
          style={tailwind`w-full bg-white text-black border border-slate-200 rounded-md h-12 px-4`}
          placeholderTextColor="#BDBDBD"
          placeholder="IMAGE"
          onChangeText={e => setProfileImage(e)}
        />
        {/* 약관 동의는 UI만 구현되어 있음 */}
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
            <Text style={tailwind`text-white text-base font-bold`}>
              회원가입
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
