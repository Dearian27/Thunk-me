import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Dial = ({ number }) => {
  return (
    <View style={styles.dial}>
      <Text style={styles.number}>{number ? number : '00'}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  dial: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  number: {
    fontSize: 60,
    fontFamily: "Roboto",
    color: 'white'
  },
})

export default Dial