import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native';

const CButton = (props) => {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
    borderWidth: 5,

  },
  text: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    bottom: 2
  },
});

export default CButton;