import {BASE_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Map} from '../components/Map';
import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const ChildLocation = ({child, mapPageHandleClose}) => {
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
    <View style={styles.container}>
      <Pressable style={styles.location_title}>
        <Text style={styles.text_title}>{child.name} 님 위치</Text>
      </Pressable>
      <Pressable style={styles.button_two} onPress={() => mapPageHandleClose()}>
        <Text style={styles.text}>뒤로가기</Text>
      </Pressable>
      <Pressable style={styles.button_three}>
        <Text style={styles.text}>CCTV 표시</Text>
      </Pressable>
      <Map currentLocation={currentLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  location_title: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#3B82F6',
    padding: 10,
  },
  button_two: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    backgroundColor: '#27C50E',
    borderRadius: 30,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 15,
  },
  button_three: {
    position: 'absolute',
    zIndex: 10,
    bottom: '1%',
    right: '2%',
    backgroundColor: '#60C29F',
    borderRadius: 30,
    padding: 10,
    margin: 15,
  },
  text_title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});
