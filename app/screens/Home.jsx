import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, StatusBar, Platform, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { addToScore } from '../../redux/slices/scoreSlice';
import CButton from '../components/CButton';

const Home = () => {
  console.log('rewrite home.jsx')
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToScore(1))
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      {/* <Text>Text</Text> */}
      {/* <Button title='Plus' onPress={() => handleClick()} /> */}
      <View style={styles.container}>
        <CButton title='Start' onPress={() => handleClick()} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'springgreen',
  }
});


export default Home;