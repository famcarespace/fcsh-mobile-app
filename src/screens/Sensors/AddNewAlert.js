import React, {useState, useEffect} from "react"
import { View, Text,
SafeAreaView, Platform, Switch,
TouchableOpacity,
TextInput} from "react-native"
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {MaterialIcons} from '@expo/vector-icons'

import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const convertToDate = (value) => {
  var d = new Date()
  d.setHours(value.slice(0,2))
  d.setMinutes(value.slice(3))
  return d
}

const convertToString = (value) => {
  
  let res = value.toTimeString().replace(':','').slice(0,4)
  console.log(res)
  return res
}

const AddNewAlertScreen = ({ navigation, route }) => {
  const {deviceId, rule, label, opts, newAlert} = route.params
  const [from, setFrom] = useState(newAlert? new Date():convertToDate(String(rule.from)))
  const [to, setTo] = useState(newAlert? new Date():convertToDate(String(rule.to)))
  const [status, setStatus] = useState(newAlert?opts[0]:rule.status)
  const [days, setDays] = useState(newAlert?[0,0,0,0,0,0,0]:rule.days)
  const [timer, setTimer] = useState(newAlert?false:rule.timer)
  const [hrs, setHrs] = useState(newAlert?'00':rule.duration.hrs)
  const [mins, setMins] = useState(newAlert?'00':rule.duration.mins)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat','Sun']

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

  const handleSubmit = () => {
    const newRule = {
      from: convertToString(from),
      to: convertToString(to),
      status: status,
      days:days,
      timer:timer,
      duration:{
        hrs:hrs,
        mins:mins
      }
    }
    if(newRule)
      alert('Alert Added')
    else alert('Alert Updated')
  }
  return(
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <View style={[styles.card]}>
          <View style={[styles.marginBottom]}>
            {/****** START TIME ******/}
            <Text style={styles.textMuted}>Start Time</Text>
            <RNDateTimePicker
              testID='startTimePicker'
              value={from}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={(event, newTime)=> {
                setFrom(new Date(newTime))
              }}/>
            </View>

             {/****** END TIME ******/}
            <View style={[styles.marginBottom]}>
              <Text style={styles.textMuted}>End Time</Text>
              <RNDateTimePicker
                  testID='endTimePicker'
                  value={to}
                  mode='time'
                  is24Hour={true}
                  display='default'
                  onChange={(event, newTime)=> {
                    setTo(new Date(newTime))
                  }}/>
            </View>
             {/****** STATUS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>{label}</Text>
              <View style={[styles.row, styles.pushRight]}>
                <Text>{status}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Selector',
                    params: { value: status,
                      options:opts},
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
              <Text style={[styles.textMuted,{flex:1}]}>Timer</Text>
              <View style={[styles.row, styles.pushRight]}>
                <Switch
                  onValueChange={()=>setTimer(!timer)}
                  trackColor={{false:'lightgray', true:'dodgerblue'}}
                  value={timer}
                />
              </View>
            </View>
            {/****** DURATION ******/}
            {timer &&
            <View style={[styles.marginBottom]}>
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
      <TouchableOpacity style={[styles.button,{marginTop:-20}]} 
            onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
  )
} 

export default AddNewAlertScreen
