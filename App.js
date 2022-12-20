import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';

import Home from './app/screens/Home'
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {

  // backgroundColor: '#ff12'
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flex: 1,
//     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
// });
