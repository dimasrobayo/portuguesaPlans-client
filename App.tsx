import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { MainStackNavigator } from './src/Presentation/Navigator/MainStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;