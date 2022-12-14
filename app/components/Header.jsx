import { useState } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native'
const Header = () => {
  const score = useSelector(state => state.score.score)
  console.log('rewrite header.jsx')

  return (
    <View style={{
      height: 50,
      width: '100%',
      paddingLeft: 25,
      paddingRight: 25,
      borderBottomWidth: 3,
      borderBottomColor: 'lightgrey',

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Thunk</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#888888' }}>
          {score}
        </Text>
        <Image source={require('../assets/brain.png')} style={{ height: 24, width: 24, top: 1 }} />
      </View>
    </View>
  )
}

export default Header