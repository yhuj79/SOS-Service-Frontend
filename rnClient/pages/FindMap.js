/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import tailwind from 'twrnc';
import {Map} from '../components/Map';

export const FindMap = ({mapPageHandleClose}) => {
  const currentLocation = {latitude: 37.575843, longitude: 126.97738};

  return (
    <View style={{flex: 1}}>
      <Map currentLocation={currentLocation} />
      <Pressable
        onPress={() => mapPageHandleClose()}
        style={tailwind`mt-3 h-12 bg-transparent border-2 border-gray-500 rounded-md flex flex-row justify-center items-center px-6`}>
        <View style={tailwind`flex-1 flex items-center`}>
          <Text style={tailwind`text-gray-500 text-base font-bold`}>
            뒤로가기
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
