/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

// 지도 컴포넌트
export const Map = ({currentLocation}) => {
  // currentLocation에 값이 존재하면 react-native-maps에 위도, 경도를 전달하여 지도 출력
  return (
    <View style={{flex: 1}}>
      {currentLocation ? (
        <MapView
          style={{flex: 1}}
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
    </View>
  );
};
