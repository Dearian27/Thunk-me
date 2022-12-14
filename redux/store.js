import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import scoreSlice from './slices/scoreSlice';
import thunk from 'redux-thunk';
import intervalSlice from './slices/intervalSlice';


const rootReducer = combineReducers({
  score: scoreSlice,
  interval: intervalSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})


export const persistor = persistStore(store)