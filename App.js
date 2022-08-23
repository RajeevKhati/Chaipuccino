import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobalProvider} from './src/context/Provider';
import AppContainer from './src/routes';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <AppContainer />
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

export default App;
