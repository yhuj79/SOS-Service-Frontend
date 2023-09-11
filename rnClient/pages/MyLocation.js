/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

export const MyLocation: () => Node = () => {
  useEffect(() => {
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
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
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
