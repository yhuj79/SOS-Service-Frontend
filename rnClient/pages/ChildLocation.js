import React, {useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import axios from 'axios';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import {Map} from '../components/Map';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import tailwind from 'twrnc';
import {Backdrop} from 'react-native-backdrop';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// 보호 대상자 위치 조회 컴포넌트
export const ChildLocation = ({child, mapPageHandleClose}) => {
  const [sosBackdrop, setSosBackdrop] = useState(false);
  const sosHandleOpen = () => {
    setSosBackdrop(true);
  };

  const sosHandleClose = () => {
    setSosBackdrop(false);
  };
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.575843,
    longitude: 126.97738,
  });
  const client = Stomp.over(new SockJS(`${BASE_URL}/ws`));
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        ...prev,
        latitude: prev.latitude + 0.000053,
      }));
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    <>
      <View style={styles.container}>
        <Pressable style={styles.location_title}>
          <Text style={styles.text_title}>{child.name} 님 위치</Text>
        </Pressable>
        <Pressable
          style={styles.button_two}
          onPress={() => mapPageHandleClose()}>
          <Text style={styles.text}>뒤로가기</Text>
        </Pressable>
        <Pressable style={styles.button_three}>
          <Text style={styles.text} onPress={() => sosHandleOpen()}>
            CCTV 표시
          </Text>
        </Pressable>
        <Map currentLocation={currentLocation} />
      </View>
      <Backdrop
        visible={sosBackdrop}
        handleOpen={sosHandleOpen}
        handleClose={sosHandleClose}
        onClose={() => {}}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="#F2F2F2">
        <View style={styles.container_e}>
          <View style={tailwind`flex-1 items-center justify-center gap-4`}>
            <Image
              source={require('../assets/profileDefault.jpg')}
              style={tailwind`w-24 h-24 mb-2 rounded-full`}
              resizeMode="cover"
            />
            <View style={tailwind`gap-2 items-center`}>
              <Text style={styles.text_e}>SOS 알림이 전송됨</Text>
              {child ? (
                <Text style={styles.text_d}>
                  {child.name}님이 SOS알림을 보냈습니다.
                </Text>
              ) : (
                <Text style={styles.text_d}>ooo님이 SOS알림을 보냈습니다.</Text>
              )}
            </View>
            <Pressable
              onPress={() => sosHandleClose()}
              style={styles.button_enroll}>
              <Text style={styles.text_refer}>
                <FontAwesome5Icon color={'#FFF'} name={'phone-alt'} size={17} />
              </Text>
              <Text style={styles.text_enroll}>SOS 알림 받기</Text>
            </Pressable>
          </View>
        </View>
      </Backdrop>
    </>
  );
};

const styles = StyleSheet.create({
  container_e: {
    // flex: 1,
    // position: 'relative',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_enroll: {
    flexDirection: 'row',
    width: 230,
    height: 50,
    backgroundColor: '#EF4F2B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    marginTop: 40,
  },
  text_e: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    margin: 5,
  },
  text_d: {
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  text_enroll: {
    paddingLeft: 10,
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  text_refer: {
    paddingLeft: 10,
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
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
