import React,{useEffect, useState} from "react"
import { View, Text, SafeAreaView, FlatList, ActivityIndicator,
TouchableOpacity } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import axios from 'axios'
import { useSelector } from "react-redux"
import {MaterialIcons} from '@expo/vector-icons'
import { demoHistory } from "../../utils/device-data"

const DeviceHistoryScreen = ({ navigation, route }) => {
  const {device} = route.params  
  const [errors,setErrors] = useState('')
  const [loading, setLoading] = useState(true)
  const [day, setDay] = useState(new Date())
  const {authenticated} = useSelector(state=> state)
  const [history, setHistory] = useState([])

  const fetchData = () => {
    if(authenticated){
      setLoading(true)
      axios.get(`/device-history?deviceId=${parseInt(device.DeviceId)}&day=${day}&partial=${false}`)
      .then(res=>{
        setHistory(res.data)
        setLoading(false)
        setErrors('')
      })
      .catch(err=>{
        console.log(err)
        setErrors('Unable to get data. Refresh the screen')
        setHistory([])
        setLoading(false)
      })
    } else {
      setHistory(demoHistory)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[day])

  useEffect(()=>{
    if(route.params?.selectedDate){
      setDay(new Date(route.params.selectedDate))
    }
  },[route.params?.selectedDate])

  const renderItem = ({item})=> (
    <View style={styles.marginBottom}>
      <Text style={styles.textMuted}>{new Date(item.time).toLocaleTimeString()}</Text>
      <Text>{item.conversion}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
      <View style={[styles.row, styles.card]}>
        <Text style={[styles.textMuted,{flex:1}]}>
          Date
        </Text>
        <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
            <Text>{day.toDateString()}</Text>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'DateSelector',
                params: { value: day.toDateString(),
                  prevScreen:'Device History',
                  setting:'startDay'}
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
        </View>
      </View>
      { loading? <ActivityIndicator/>:
        <View style={styles.card}>
          <FlatList data={history}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text>No History to show</Text>}
            onRefresh={()=>fetchData()}
            refreshing={loading}
          />
        </View>
      }
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
  );
}

export default DeviceHistoryScreen
