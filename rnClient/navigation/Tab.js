import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyLocation} from '../pages/MyLocation';
import {SOS} from '../pages/SOS';
import {Find} from '../pages/Find';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Backdrop} from 'react-native-backdrop';
import {MyPage} from '../components/MyPage';

// 탭 네비게이터

const Tab = createBottomTabNavigator();

const ScreenComponent = () => {
  return null;
};

const TabNavigation = () => {
  const [myPageBackdrop, setMyPageBackdrop] = useState(false);

  const myPageHandleOpen = () => {
    setMyPageBackdrop(true);
  };

  const myPageHandleClose = () => {
    setMyPageBackdrop(false);
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#ABABAB',
          headerTitle: ({children}) => (
            <View>
              <Text style={styles.header_title}>{children}</Text>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={() => myPageHandleOpen()}>
              <View style={styles.header_button}>
                <Text style={styles.header_text}>
                  <MaterialIcons color={'#000'} name={'person-pin'} size={20} />
                </Text>
                <Text style={styles.header_text}>MY</Text>
              </View>
            </Pressable>
          ),
        }}>
        <Tab.Screen
          name="내 위치"
          component={MyLocation}
          options={{
            tabBarIcon: ({color, focused}) => (
              <MaterialIcons
                color={focused ? '#000' : '#ABABAB'}
                name={'location-on'}
                size={27}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SOS"
          component={ScreenComponent}
          options={{
            tabBarButton: () => <SOS />,
          }}
        />
        <Tab.Screen
          name="찾기"
          component={Find}
          options={{
            tabBarIcon: ({color, focused}) => (
              <MaterialIcons
                color={focused ? '#000' : '#ABABAB'}
                name={'person-search'}
                size={27}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <Backdrop
        visible={myPageBackdrop}
        handleOpen={myPageHandleOpen}
        handleClose={myPageHandleClose}
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
        <MyPage myPageHandleClose={myPageHandleClose} />
      </Backdrop>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  header_title: {
    fontSize: 22,
    color: '#000',
  },
  header_button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#E9E9E9',
    borderRadius: 30,
    padding: 5,
    marginRight: 12,
  },
  header_text: {
    fontSize: 16,
    color: '#000',
  },
});
