/* eslint-disable react-native/no-inline-styles */
import {BASE_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import tailwind from 'twrnc';
import {Map} from '../components/Map';
import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const FindMap = ({child, mapPageHandleClose}) => {
  const currentLocation = {latitude: 37.575843, longitude: 126.97738};
  const client = Stomp.over(new SockJS(`${BASE_URL}/ws`));
  const [roomId, setRoomId] = useState(null);

  async function getRoomId() {
    try {
      const data = await axios.post(
        `${BASE_URL}/api/v1/rooms`,
        {email: String(child.email)},
        {
          withCredentials: true,
        },
      );
      console.log(data.data.response);
      setRoomId(data.data.response);
      client.connect({}, () => {
        client.subscribe('/sub/monitoring/room/' + roomId, payload => {
          let {latitude, longitude} = JSON.parse(payload.body).position;
          // console 테스트
          console.log(`${latitude} ${longitude}`);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRoomId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <Map currentLocation={currentLocation} />
      <Pressable
        onPress={() => getRoomId()}
        style={tailwind`mt-3 h-12 bg-transparent border-2 border-gray-500 rounded-md flex flex-row justify-center items-center px-6`}>
        <View style={tailwind`flex-1 flex items-center`}>
          <Text style={tailwind`text-gray-500 text-base font-bold`}>
            getRoomId Test
          </Text>
        </View>
      </Pressable>
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
