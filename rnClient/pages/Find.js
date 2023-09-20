/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {Enroll} from '../components/Enroll';
import {ChildCard} from '../components/ChildCard';
import {ChildLocation} from './ChildLocation';

import {StyleSheet, View, Pressable, Text} from 'react-native';
import {Backdrop} from 'react-native-backdrop';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// 찾기 페이지
export const Find = () => {
  const [enrollBackdrop, setEnrollBackdrop] = useState(false);
  const [mapPage, setMapPage] = useState(false);
  const [child, setChild] = useState({});

  useEffect(() => {
    // 보호 대상자 조회 함수
    async function getMyChild() {
      try {
        // Async Storage의 본인 이메일 검증하여 조회
        const email = await AsyncStorage.getItem('email');
        const data = await axios.post(
          `${BASE_URL}/api/v1/child`,
          {email: email},
          {
            withCredentials: true,
          },
        );
        setChild(data.data.response);
      } catch (err) {
        console.log(err);
      }
    }

    getMyChild();
  }, []);

  const enrollHandleOpen = () => {
    setEnrollBackdrop(true);
  };

  const enrollHandleClose = () => {
    setEnrollBackdrop(false);
  };

  const mapPageHandleOpen = () => {
    setMapPage(true);
  };

  const mapPageHandleClose = () => {
    setMapPage(false);
  };

  // 조건부로 맵 ON/OFF
  if (!mapPage) {
    return (
      <View style={{flex: 1}}>
        {child.email ? (
          <View style={styles.container}>
            <ChildCard child={child} />
            <Pressable
              onPress={() => enrollHandleOpen()}
              style={styles.button_enroll}>
              <Text style={styles.text_enroll}>
                <FontAwesome5 color={'#FFF'} name={'edit'} size={17} />
              </Text>
              <Text style={styles.text_enroll}>보호 대상자 수정</Text>
            </Pressable>
            <Pressable
              onPress={() => mapPageHandleOpen()}
              style={styles.button_refer}>
              <Text style={styles.text_refer}>
                <FontAwesome5 color={'#FFF'} name={'search'} size={17} />
              </Text>
              <Text style={styles.text_refer}>위치 조회</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.container}>
            <Pressable
              onPress={() => enrollHandleOpen()}
              style={styles.button_enroll}>
              <Text style={styles.text_enroll}>
                <FontAwesome5 color={'#FFF'} name={'plus'} size={17} />
              </Text>
              <Text style={styles.text_enroll}>보호 대상자 등록</Text>
            </Pressable>
          </View>
        )}
        {/* 백드롭으로 Enroll 컴포넌트 열기/닫기 */}
        <Backdrop
          visible={enrollBackdrop}
          handleOpen={enrollHandleOpen}
          handleClose={enrollHandleClose}
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
          <Enroll enrollHandleClose={enrollHandleClose} />
        </Backdrop>
      </View>
    );
  } else {
    return (
      <ChildLocation child={child} mapPageHandleClose={mapPageHandleClose} />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_enroll: {
    flexDirection: 'row',
    width: 275,
    height: 50,
    backgroundColor: '#87D325',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    paddingLeft: -10,
    margin: 20,
  },
  button_refer: {
    flexDirection: 'row',
    width: 275,
    height: 50,
    backgroundColor: '#25D3B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    paddingLeft: -10,
    margin: 20,
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
});
