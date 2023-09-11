import {BASE_URL} from '@env';
import axios from 'axios';
import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

export const SOS = () => {
  async function handleUserList() {
    try {
      const data = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
        withCredentials: true,
      });
      console.log(JSON.stringify(data, null, 3));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View>
      <Pressable onPress={() => handleUserList()} style={styles.button}>
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
