import React from 'react';

import {View, Text, Image} from 'react-native';
import tailwind from 'twrnc';

// 보호대상자 표시 카드 컴포넌트
export const ChildCard = ({child}) => {
  return (
    <View
      style={tailwind`mt-2.5 bg-blue-500 rounded-xl p-4 justify-center shadow-lg`}>
      <Text style={tailwind`text-white text-xl font-bold mb-4`}>
        보호 대상자
      </Text>
      <View style={tailwind`flex-row items-center`}>
        <View style={tailwind`w-22 h-22 mr-2 rounded-full bg-indigo-50`}>
          <Image
            style={tailwind`w-22 h-22 rounded-full`}
            source={require('../assets/profileDefault.jpg')}
          />
        </View>
        <View>
          <View
            style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500`}>
            <Text style={tailwind`text-base text-blue-500 font-bold`}>
              {child.name}
            </Text>
          </View>
          <View>
            <Text style={tailwind`text-white text-lg font-bold my-3`}>
              {child.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
