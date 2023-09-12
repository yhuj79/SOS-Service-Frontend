import React, {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

// 내위치 페이지
export const MyLocation: () => Node = () => {
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
    <SafeAreaView style={styles.container}>
      {/* 위도, 경도 수치 임시 표기 */}
      {currentLocation ? (
        <View style={styles.div_location}>
          <Text style={styles.text}>rnClient</Text>
          <Text style={styles.text}>{currentLocation.latitude}</Text>
          <Text style={styles.text}>{currentLocation.longitude}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Location Error</Text>
        </View>
      )}
      {/* currentLocation에 값이 존재하면 react-native-maps에 위도, 경도를 전달 */}
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00021,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="My Location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  div_location: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  text: {
    color: '#000',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  map: {
    flex: 1,
  },
});
