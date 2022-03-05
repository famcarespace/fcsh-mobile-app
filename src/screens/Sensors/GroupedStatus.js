import React,{useState, useEffect} from "react"
import {Text,
TouchableOpacity,
SafeAreaView,
FlatList, ActivityIndicator,
Dimensions,
View} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {sensors} from '../../utils/device-data'
import {useSelector, useDispatch} from 'react-redux'
import { GET_DEVICE_LIST } from "../../redux/types"
import axios from 'axios'
import { convertToMins } from "../../utils/functions"

const GroupedStatus = ({ navigation, route }) =>{
  const { type } = route.params
  const width = Dimensions.get('window').width
  const dispatch = useDispatch()
  const {deviceList, authenticated} = useSelector(state=>state)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState('')
  
  var redirectScreen=''
  var screenTitle=''
  switch (type){
    case 'Sensor':
      redirectScreen='Device Settings'
      screenTitle='Settings'
      break;
    case 'Smart Bulb':
      redirectScreen='Smart Bulb'
      screenTitle='Smart Bulb'
      break;
    case 'Smart Plug':
      redirectScreen='Smart Bulb'
      screenTitle='Smart Plug'
      break;
    case 'Smart Switch':
      redirectScreen='Smart Switch'
      screenTitle='Smart Switch'
  }

  useEffect(() => {
    if(authenticated){
      axios
      .get(`/device-list-by-type?cat=${type}`)
      .then(res=>{
          setErrors('')
          dispatch({
              type:GET_DEVICE_LIST,
              payload:res.data
          })
          setLoading(false)
      })
      .catch(err=>{
          console.log(err)
          setLoading(false)
          setErrors('Unable to get data. Please refresh')
      })
    }
    else{
      let devices = sensors.filter(item=> item.cat===type)
      dispatch({
        type:GET_DEVICE_LIST,
        payload:devices
    })
    }

  }, [type, dispatch])

  const renderItemSensor = ({item}) => {
    return(
    <TouchableOpacity
        style={[styles.card, styles.row, {width:width}]}
        onPress={()=> navigation.navigate({
          name: redirectScreen,
          params: { device: item,
          screenTitle: screenTitle },
        })}
      >   
      <View style={{flex:1}}>
        <Text>{item.Name}</Text>
        <Text style={styles.textMuted}>{item.Location}</Text>
      </View> 
      <View style={{flex:1}}>
        {item.Name ==='SmartSwitch 3'?
        <Text style={styles.textRight}>{item.SS1+' | '+item.SS2+' | '+item.SS3}</Text>
        :
        <Text style={styles.textRight}>{item.Conversion}</Text>
        }
        <Text style={styles.textRight}>
          {convertToMins(item.lastMessageTime)}
        </Text>
      </View>
    </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
      {errors!=='' && <Text style={{color:'tomato'}}>{errors}</Text>}
      {loading? 
        <ActivityIndicator/>:
        deviceList.length===0?
          <Text>No devices yet</Text>:
          <FlatList data={deviceList}
          renderItem={renderItemSensor}
          keyExtractor={item => item.DeviceId}
          extraData={navigation}
          />
      }
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
  )
}

export default GroupedStatus

