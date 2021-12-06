import React from 'react';
import {View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {NativeBaseProvider, Box} from 'native-base';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
