import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './navigation/Tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Access} from './pages/Access';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Async Storage 조회하여 이메일이 없으면 Access 창 출력
    async function getAuth() {
      try {
        const value = await AsyncStorage.getItem('email');
        if (value) {
          setAuth(true);
          console.log('Get Login Data Success');
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      {auth ? <TabNavigation /> : <Access />}
    </NavigationContainer>
  );
};

export default App;
