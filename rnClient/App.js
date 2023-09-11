import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './Tab';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;
