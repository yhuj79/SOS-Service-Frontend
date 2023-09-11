import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {Access} from './Access';
import {Backdrop} from 'react-native-backdrop';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Enroll} from '../components/Enroll';

export const Find = () => {
  const auth = 0;

  const [enrollBackdrop, setenrollBackdrop] = useState(false);

  const enrollHandleOpen = () => {
    setenrollBackdrop(true);
  };

  const enrollHandleClose = () => {
    setenrollBackdrop(false);
  };

  if (!auth) {
    return (
      <>
        <View style={styles.container}>
          <Pressable
            onPress={() => enrollHandleOpen()}
            style={styles.button_enroll}>
            <Text style={styles.text_enroll}>
              <FontAwesome5 color={'#FFF'} name={'plus'} size={17} />
            </Text>
            <Text style={styles.text_enroll}>보호 대상자 추가</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log('refer button')}
            style={styles.button_refer}>
            <Text style={styles.text_refer}>
              <FontAwesome5 color={'#FFF'} name={'search'} size={17} />
            </Text>
            <Text style={styles.text_refer}>위치 조회</Text>
          </Pressable>
        </View>
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
          <Enroll />
        </Backdrop>
      </>
    );
  } else {
    return <Access />;
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
    width: 300,
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
    width: 300,
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
  },
  text_refer: {
    paddingLeft: 10,
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
