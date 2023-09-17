import React, {useEffect, useState} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {View} from 'react-native';
import {Map} from '../components/Map';
import Geolocation from 'react-native-geolocation-service';

// 내위치 페이지
export const MyLocation = () => {
  useEffect(() => {
    // iOS, Android에 대한 권한 요청 처리
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }, []);

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // 위치 업데이트 설정
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // currentLocation에 위도, 경도 저장
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true, // 배터리를 더 소모하여 보다 정확한 위치 추적
        timeout: 20000,
        maximumAge: 0, // 한 번 찾은 위치 정보를 해당 초만큼 캐싱
        distanceFilter: 1,
      },
    );

    // 컴포넌트 언마운트 시 위치 업데이트 중지
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button_one}>
        <Text style={styles.text}>경로 녹화 시작</Text>
      </Pressable>
      <Pressable style={styles.button_two}>
        <Text style={styles.text}>경로 조회</Text>
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
  button_one: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#FFA114',
    borderRadius: 30,
    padding: 10,
    margin: 15,
  },
  button_two: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    backgroundColor: '#27C50E',
    borderRadius: 30,
    padding: 10,
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
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});
