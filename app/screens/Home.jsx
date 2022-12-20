import { useState, useEffect } from 'react';
import { Modal, SafeAreaView, TextInput, Text, View, StyleSheet, StatusBar, Platform, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { addToScore, addToStreak, resetStreak, s } from '../../redux/slices/scoreSlice';
import CButton from '../components/CButton';
import Dial from '../components/Dial';
import { useSelector } from 'react-redux';
import { setStatus, setTimeEnd, setNumber } from '../../redux/slices/intervalSlice';
import ProccessBar from '../components/ProccessBar';

const Home = () => {
  const [ModalShowNumber, setModalShowNumber] = useState(false);
  const [ModalResult, setModalResult] = useState(false);
  const [result, setResult] = useState(null);
  const [brains, setBrains] = useState(null);

  const [inputNumber, useInputNumber] = useState(null);

  const dispatch = useDispatch();

  const { timeEnd, status, number } = useSelector(state => state.interval);
  const { score, streak } = useSelector(state => state.score);

  const [time, setTime] = useState({
    hr: '00',
    min: '00',
    sec: '00',
  });


  const setDateEnd = () => {
    let dateEnd = new Date(new Date().getTime() + (1000 * 10)); //  * 8  hours   <<(1000 * 60 * 60) == 1 hour>>
    dispatch(setTimeEnd(dateEnd));

  }

  const handleClick = () => {
    // console.log(new Date().getHours(), ":", new Date().getMinutes(), "now")
    // console.log(dateEnd.getHours(), ":", dateEnd.getMinutes(), "end")

    setTime({ hr: '00', min: '00', sec: '00' })
    // setDateEnd();
    let dateEnd = new Date(new Date().getTime() + (1000 * 30)); //  * 8  hours   <<(1000 * 60 * 60) == 1 hour>>
    dispatch(setTimeEnd(dateEnd));

    dispatch(setStatus('active'));
  }


  const checkNumber = () => {
    useInputNumber('');
    if (inputNumber == number) {
      setResult(true)
      setBrains(number.length + Math.floor(streak / 2))
      dispatch(addToScore(2))
      dispatch(addToStreak());
    }
    else {
      setResult(false)
      dispatch(resetStreak());
    }
    setModalResult(true)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (status == 'active') {
        const date = new Date();
        const diff = timeEnd - date;
        setTime({
          hr: String(Math.floor(diff / (60 * 60 * 1000))).length == 1 ? '0' + String(Math.floor(diff / (60 * 60 * 1000))) : String(Math.floor(diff / (60 * 60 * 1000))),
          min: String(Math.floor(diff / (60 * 1000))).length == 1 ? '0' + String(Math.floor(diff / (60 * 1000))) : String(Math.floor(diff / (60 * 1000))),
          sec: String(Math.floor(diff / 1000)).length == 1 ? '0' + String(Math.floor(diff / 1000)) : String(Math.floor(diff / 1000)),
        })

        if (diff < 1000 || diff === 0) {
          dispatch(setStatus('approving'))
          clearInterval(timer);
        }
      }
      else {
        clearTimeout(timer)
      }
    }, 1000)

    return () => {
      clearInterval(timer);
    };
  }, [status]);

  const generateNumber = (count) => {
    let n = '';
    for (let i = 0; i < count; i++) {
      n += String(Math.floor(Math.random() * 10)); // 0-9 random
    }
    return n
  }


  console.log('score', score)
  console.log('streak', streak)

  return (
    <SafeAreaView style={styles.wrapper}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalShowNumber}
        onRequestClose={() => {
          setModalShowNumber(!ModalShowNumber);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: 'black', fontSize: 36 }}>Daily number is...</Text>
            <Text style={{
              color: 'black', fontSize: 50, marginVertical: 40, color: 'gold',
              fontWeight: 'bold'
            }}
            >
              {number}
            </Text>
            <Pressable onPress={() => { handleClick(); setModalShowNumber(!ModalShowNumber); }}
              style={{ borderColor: 'lightgreen', borderWidth: 2, borderRadius: 10 }}
            >
              <Text style={{ marginHorizontal: 34, marginVertical: 12, color: 'lightgreen', fontSize: 25 }}>
                Close
              </Text>
            </Pressable>
            {/* <ProccessBar progress={3} max={4} number={2} /> */}
          </View>
        </View>
      </Modal>
      {/***** RESULT *****/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalResult}
        onRequestClose={() => {
          setModalResult(!ModalResult);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {result ?
              <>
                <Text style={{ color: 'lightgreen', fontSize: 36 }}>You are right!</Text>
                <Text style={{ color: 'grey', fontSize: 20 }}>Good job!</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{
                    color: 'black', fontSize: 40, marginVertical: 40,
                  }}
                  >
                    +{brains}
                  </Text>
                  <Image style={{ height: 40, width: 40, marginVertical: 40, }} source={require('../assets/brain.png')} />
                </View>
              </>
              :
              <>
                <Text style={{ color: 'red', fontSize: 36 }}>You Failed</Text>
                <Text style={{ color: 'black', fontSize: 20, marginTop: 20, marginBottom: 30 }}>don't worry, try again</Text>
              </>
            }


            {streak > 1 &&
              <Text>
                streak: {streak}
              </Text>
            }
            <Pressable onPress={() => { setModalResult(!ModalResult); dispatch(setStatus('passive')) }}
              style={{ borderColor: 'black', borderWidth: 2, borderRadius: 10 }}
            >
              <Text style={{ marginHorizontal: 34, marginVertical: 12, color: 'black', fontSize: 25 }}>
                Ok
              </Text>
            </Pressable>
            {/* <ProccessBar progress={3} max={4} number={2} /> */}
          </View>
        </View>
      </Modal>
      <Header />
      {/* <Text>Text</Text> */}
      {/* <Button title='Plus' onPress={() => handleClick()} /> */}
      <View style={styles.container}>
        <View style={styles.dialContainer}>
          {status == "active" ?  //! ACTIVE
            <>
              {timeEnd &&
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>
                    {/* {String(time.getHours()).length == 1 ? '0' + String(time.getHours()) */}
                    {/* : time.getHours()} */}
                    {time.hr}
                    {":"}
                    {/* {String(time.getMinutes()).length == 1 ? '0' + String(time.getMinutes()) */}
                    {/* : time.getMinutes()} */}
                    {time.min}
                    {":"}
                    {time.sec}
                  </Text>
                </View>
              }
            </>
            : status === "approving" ?
              <>
                <Text style={{ fontSize: 24 }}>Input memorized number</Text>
                <TextInput
                  style={{
                    textAlign: 'center', borderRadius: 5, backgroundColor: '#D9D9D9', height: 90, minWidth: 90, fontSize: 40, margin: 12, padding: 10,
                  }}
                  maxLength={number.length} onChangeText={input => useInputNumber(input)}
                  value={inputNumber} keyboardType='numeric' placeholder='00'
                />
              </>
              : status === "passive" &&
              < Image style={{ height: 120, width: 120 }} source={require('../assets/brain.png')} />
          }
          {/* <Dial number={number} /> */}
        </View>
        <View style={styles.panel}>
          {/* <Text>{status}</Text> */}
          {status === "passive" ?
            <CButton title='Start' onPress={() => { setModalShowNumber(!ModalShowNumber); dispatch(setNumber(generateNumber(2))) }} />
            : status === 'approving' &&
            < CButton title='Check' onPress={() => checkNumber()} />
          }
          {/* <CButton title='passive' onPress={() => setModalShowNumber(!ModalShowNumber)} /> */}
          {/* <CButton title='passive' onPress={() => dispatch(setStatus('approving'))} /> */}
        </View>
      </View>
    </SafeAreaView >
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
    // backgroundColor: 'springgreen',
  },
  dialContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    height: 180,
  },
  timerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#E2E2E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.9,
    shadowRadius: 200,
    elevation: 100,
  },
});


export default Home;