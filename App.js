import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobalProvider} from './src/context/Provider';
import AppContainer from './src/routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppContainer />
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

export default App;
