import React from 'react';
import {useState} from 'react';
import {Backdrop} from 'react-native-backdrop';
import {StyleSheet, Pressable, View, Text} from 'react-native';

export const Access = () => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>로그인이 필요한 서비스입니다.</Text>
        <View style={styles.div_button}>
          <Pressable
            onPress={() => setVisible(true)}
            style={styles.button_login}>
            <Text style={styles.text_login}>로그인</Text>
          </Pressable>
          <Pressable
            onPress={() => setVisible(true)}
            style={styles.button_register}>
            <Text style={styles.text_register}>회원가입</Text>
          </Pressable>
        </View>
      </View>
      <Backdrop
        visible={visible}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onClose={() => {}}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="#FFF">
        <View>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
          <Text>Backdrop Content</Text>
        </View>
      </Backdrop>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div_button: {
    flexDirection: 'row',
  },
  button_login: {
    width: 80,
    backgroundColor: '#87D325',
    borderRadius: 12,
    padding: 10,
    margin: 10,
  },
  button_register: {
    width: 80,
    backgroundColor: '#25D3B4',
    borderRadius: 12,
    padding: 10,
    margin: 10,
  },
  text_login: {
    textAlign: 'center',
    color: '#FFF',
  },
  text_register: {
    textAlign: 'center',
    color: '#FFF',
  },
});
