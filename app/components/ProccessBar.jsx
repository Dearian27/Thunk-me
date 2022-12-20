import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

const ProccessBar = (props) => {


  const { progress, max, number } = props;
  let progressPercent = Math.ceil(progress * 100 / max);

  // const [numberState, setNumberState] = useState(4);

  // useEffect(() => {
  //   if (numberState !== 0) {

  //     const timer = setInterval(() => {
  //       setNumberState(numberState - 1);

  //       if (numberState == 0) {
  //         clearInterval(timer);
  //       }

  //     }, 1000)
  //   }
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);


  return (
    <Pressable onPress={() => { setModalVisible(!ModalVisible) }}
      style={{
        position: 'relative', overflow: 'hidden',
        backgroundColor: 'lightgrey', borderRadius: 50,
        justifyContent: 'center', alignItems: 'center',
        width: 120, height: 50
      }}
    >
      <View style={{
        position: 'absolute', backgroundColor: 'lightgreen', left: 0,
        width: `${progressPercent}%`, height: '100%'
      }} />
      <Text style={{ color: 'white', fontSize: 25 }}>
        {number}
      </Text>
    </Pressable>
  )
}

export default ProccessBar