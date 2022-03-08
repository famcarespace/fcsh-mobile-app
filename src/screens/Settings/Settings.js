import React,{useState, useEffect} from "react"
import { SafeAreaView, View, Text, Image,
TouchableOpacity, 
ActivityIndicator} from "react-native"
import gateway from '../../../assets/images/gateway.png'
import styles from "../../../assets/styles"
import {MaterialIcons} from '@expo/vector-icons'
import Tooltip from "../../components/Tooltip"
import * as WebBrowser from 'expo-web-browser'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Subscribe from "../../components/Subscribe"
import { guestUser } from "../../utils/device-data"

const SettingsScreen = ({ navigation, route }) => {
    const [timezone, setTimezone] = useState('US/Eastern (GMT-4)')
    const [sms, setSms] = useState('yes')
    const zoneOpts = ['US/Eastern',
    'US/Central',
    'US/Mountain',
    'US/Alaska',
    'US/Hawaii',
    'GMT']
    const [result, setResult] = React.useState(null)
    const {authenticated} = useSelector(state=>state)
    const [errors,setErrors] = useState('')
    const [loading, setLoading] = useState(true)
    const [currUser, setCurrUser] = useState({})

    useEffect(()=>{
      if(route.params?.selected){
        if(authenticated){
          setLoading(true)
          var newSettings={
            timezone: timezone,
            smsAlert: sms,
          }
          if(route.params.setting==='timezone')
            newSettings.timezone = route.params.selected
          else { 
            newSettings.smsAlert = route.params.selected==='yes'?true:false
          }
          axios.put('/update-timezone',newSettings)
          .then(res=>{
            setTimezone(res.data.timezone)
            setSms(res.data.smsAlert)
            setLoading(false)
            setErrors('')
          })
          .catch(err=>{
            console.log(err)
            setLoading(false)
            setErrors('Unable to update. Try again.')
          })
        }
        else {
          if(route.params.setting==='timezone')
            setTimezone(route.params.selected)
          else setSms(route.params.selected)
        }
      }
    },[route.params?.selected])

    useEffect(()=>{
      if(authenticated){
        setLoading(true)
        axios
        .get('/user')
        .then(res=>{ 
            setCurrUser(res.data)
            setTimezone(res.data.Timezone)
            setSms(res.data.SmsAlert)
            setLoading(false)
            setErrors('')
        })
        .catch(err=>{
          console.log(err)
          setErrors('Unable to get data. Try again')
          setLoading(false)
        })
      }
      else {
        setCurrUser(guestUser)
        setLoading(false)
      }
    },[])

    const handlePressureButtonAsync = async()=> {
      let result = await WebBrowser.openBrowserAsync(
        `http://${currUser.EthernetIP}`
      )
      setResult(result)
    }

    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        { errors!=='' && 
          <Text style={{color:'tomato'}}>
          {errors}</Text>
        }
        {/***** Gateway Info ****/}
        <View style={[styles.card, styles.row]}>
          <Image style={styles.imgIcon}
          source={gateway}/>
          <View>
            <Text style={styles.cardHeader}>
              Gateway
              <Tooltip msg={`Gateway is a communication bridge between the app and physical devices.`}/>
            </Text>
            <View style={{zIndex:-1}}>
              <Text style={styles.textMuted}>
                30:ae:7b:f1:e3:65
              </Text>
              <View>
                <Text style={styles.textMuted}>IP: </Text>
                <TouchableOpacity onPress={handlePressureButtonAsync}>
                  <Text style={{color:'dodgerblue'}}>http://{currUser.EthernetIP}</Text>
                </TouchableOpacity>
              </View> 
            </View>
          </View>
        </View>
        {/***** Timezone ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Timezone
            <Tooltip msg='select timezone of the location where sensors are placed.'/>
          </Text>
          <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
            <Text>{timezone}</Text>
            <TouchableOpacity
              disabled={loading}
              onPress={()=> navigation.navigate({
                name: 'Zone Selector',
                params: { value: timezone,
                  options:zoneOpts,
                  prevScreen:'Settings Landing',
                  setting:'timezone'},
              })}>
              <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** SMS ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Text Notifications
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <Text>{sms?'yes':'no'}</Text>
            <TouchableOpacity
              disabled={loading}
              onPress={()=> navigation.navigate({
                name: 'Zone Selector',
                params: { value: sms?'yes':'no',
                  options:['yes', 'no'],
                  prevScreen:'Settings Landing',
                  setting:'sms'},
              })}>
              <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** User Info ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Other Details
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              disabled={loading}
              onPress={()=> navigation.navigate({
                name: 'Userinfo',
                params: {user: currUser}
              })}>
              <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** Password ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Password
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              disabled={loading}
              onPress={()=> navigation.navigate({
                name: 'Update Password',
              })}>
              <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** New Users ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Add Members
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              disabled={loading}
              onPress={()=> navigation.navigate({
                name: 'Add Members',
              })}>
              <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && <ActivityIndicator/>}
      {!authenticated && <Subscribe navigation={navigation}/>}
      </SafeAreaView>
    );
}

export default SettingsScreen
