import React from 'react';
import {StyleSheet, View, Pressable, Text, Alert} from 'react-native';

// 응급 구조 요청 페이지
export const SOS = () => {
  return (
    <View>
      <Pressable
        onPress={() => Alert.alert('신고가 접수되었습니다!')}
        style={styles.button}>
        <Text style={styles.text}>SOS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    backgroundColor: '#EF3636',
    borderRadius: 50,
    padding: 10,
    marginTop: 5,
  },
  text: {
    textAlign: 'center',
    margin: -6,
    color: '#FFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
