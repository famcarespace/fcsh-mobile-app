import React, {useState, useEffect, useLayoutEffect} from "react"
import { ScrollView, Text, View,
SafeAreaView, Switch,
TouchableOpacity, Button,
TextInput} from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import Tooltip from "../../components/Tooltip"
//import axios from 'axios'


const getCurrTime = () => {
 return (new Date().getHours()+':'+new Date().getMinutes())
}

const AddNewAlertScreen = ({ navigation, route }) => {
  const {deviceId, rule, label, opts, newAlert} = route.params
  const [from, setFrom] = useState(newAlert? getCurrTime:rule.from)
  const [to, setTo] = useState(newAlert? getCurrTime:rule.to)
  const [status, setStatus] = useState(newAlert?opts[0]:rule.status)
  const [days, setDays] = useState(newAlert?[0,0,0,0,0,0,0]:rule.days)
  const [timer, setTimer] = useState(newAlert?false:rule.timer)
  const [hrs, setHrs] = useState(newAlert?'00':rule.duration.hrs)
  const [mins, setMins] = useState(newAlert?'00':rule.duration.mins)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat','Sun']

  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(route.params?.selected){
      setStatus(route.params.selected)
    }
  },[route.params?.selected])

  useEffect(()=>{
    if(route.params?.checked){
      setDays(route.params.checked)
    }
  },[route.params?.checked])

  useEffect(()=>{
    if(route.params?.selectedTime){
      if(route.params.setting==='startTime'){
        setFrom(route.params.selectedTime.slice(0,5))
      }
      else
      setTo(route.params.selectedTime.slice(0,5))
    }
  },[route.params?.selectedTime])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSubmit} title="Save" />
      ),
    });
  }, [navigation, handleSubmit,from,to,status,days,timer,hrs,mins])

  const handleSubmit = () => {
    setLoading(true)
    let complete = true
    if(!days.includes('1')) complete = false
    if(timer && (hrs==='00' && mins==='00')) complete = false
    if(complete){
      let newRule = {
        from: from,
        to: to,
        status: status,
        days:days,
        timer:timer,
        duration:{
          hrs:hrs,
          mins:mins
        }
      }
      alert('Alert Set')
      /*
      axios
      .post(`/new-rule`,
      {deviceId: deviceId, rule:newRule})
      .then(res=>{
          setErrors('')
          setLoading(false)
      })
      .catch(err=>{
          console.log(err)
          setErrors(err)
          setLoading(false)
      })
      */
    }
  }
  return(
      <SafeAreaView style={styles.mainContentContainer}>
      <ScrollView>
        <View style={styles.innerContainer}>
        <Text style={[styles.marginBottom,{paddingHorizontal:20}]}>
          Example: Alert me if a motion sensor in garage detects movement late at night
        </Text>
        <View style={[styles.card]}>
          {/****** START TIME ******/}
          <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
            <Text style={[styles.textMuted,{flex:1}]}>
              Start Time
              <Tooltip msg='Set a timeframe to check for alerts'/>
            </Text>
            <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
                <Text>{from} hrs</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'TimeSelector',
                    params: { value: from,
                      prevScreen:'New Alert',
                      setting:'startTime'}
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
                </TouchableOpacity>
              </View>
            </View>

            {/****** END TIME ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
            <Text style={[styles.textMuted,{flex:1}]}>End Time</Text>
              <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
                <Text>{to} hrs</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'TimeSelector',
                    params: { value: to,
                      prevScreen:'New Alert',
                      setting:'endTime'}
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
                </TouchableOpacity>
              </View>
            </View>
             {/****** STATUS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>
                {label}
                <Tooltip msg='Sensor activity that triggers the alert.'/>
              </Text>
              <View style={[styles.row, styles.pushRight]}>
                <Text>{status}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Selector',
                    params: { value: status,
                      options:opts,
                      prevScreen:'New Alert',
                      setting:'status'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
                </TouchableOpacity>
              </View>
            </View>

            {/****** DAYS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>Days</Text>
              <View style={[styles.row, styles.pushRight,{flex:2}]}>
                {days.includes(0)?
                  weekdays.map((day,idx)=>(
                    <Text key={idx}> 
                        {days[idx]===1?day+"  ":null}
                    </Text>
                  )): 
                  <Text>EveryDay</Text>
                }
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Checkbox',
                    params: { value: days,
                    options:weekdays},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
                </TouchableOpacity>
              </View>
            </View>
            {/****** TIMER ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>
                Timer
                <Tooltip msg={`Ex without timer: alert triggered as soon as front door is opened.

Ex with timer: Alert triggered when front door remains open for more than 10 mins.`}/>
              </Text>
              <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
                <Switch
                  onValueChange={()=>setTimer(!timer)}
                  trackColor={{false:'lightgray', true:'dodgerblue'}}
                  value={timer}
                />
              </View>
            </View>
            {/****** DURATION ******/}
            {timer &&
            <View style={[styles.marginBottom,{zIndex:-1}]}>
              <Text style={styles.textMuted}>Hours</Text>
              <TextInput value={hrs}
              placeholder='Set Hours'
              onChangeText={setHrs}
              style={styles.input}/>
              <Text style={styles.textMuted}>Mins</Text>
              <TextInput value={mins}
              style={styles.input}
              onChangeText={setMins}
              placeholder='Set Minutes'/>
            </View>
            }
      </View>
      </View>
    </ScrollView>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
  )
} 

export default AddNewAlertScreen
