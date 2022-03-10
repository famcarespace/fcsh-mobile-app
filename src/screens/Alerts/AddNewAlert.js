import React, {useState, useEffect, useLayoutEffect} from "react"
import { ScrollView, Text, View,
SafeAreaView, Alert,
TouchableOpacity, Button, ActivityIndicator} from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import Tooltip from "../../components/Tooltip"
import axios from 'axios'
import { useSelector } from "react-redux"
import { convert24to12hr } from "../../utils/functions"

const getCurrTime = () => {
 return (new Date().getHours()+':'+new Date().getMinutes())
}

const AddNewAlertScreen = ({ navigation, route }) => {
  const {rule, statusOpts } = route.params
  var { newAlert } = route.params
  const [from, setFrom] = useState(newAlert? getCurrTime:rule.StartTime)
  const [to, setTo] = useState(newAlert? getCurrTime:rule.EndTime)
  const [status, setStatus] = useState(newAlert?statusOpts[0].Conversion:rule.Conversion)
  const [days, setDays] = useState(newAlert?['0','0','0','0','0','0','0']:rule.Days)
  const [subscribers, setSubscribers] = useState(newAlert?[]:rule.Subscribers)
  //  const [timer, setTimer] = useState(newAlert?false:rule.timer)
//  const [hrs, setHrs] = useState(newAlert?'00':rule.duration.hrs)
//  const [mins, setMins] = useState(newAlert?'00':rule.duration.mins)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat','Sun']
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const {authenticated} = useSelector(state=> state)
  useEffect(()=>{
    if(route.params?.selected){
      setStatus(route.params.selected)
    }
  },[route.params?.selected])

  useEffect(()=>{
    if(route.params?.checked){
      if(route.params.setting==='days')
        setDays(route.params.checked)
      else {
        var temp = subscribers
        var i=0
        while(i<temp.length){
          temp[i].Subscribed = parseInt(route.params.checked[i])
          i++
        }
        setSubscribers(temp)
      }
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

  useEffect(()=>{
    if(newAlert && authenticated){
      setLoading(true)
      axios.get(`/device-subscribers?deviceId=${rule.DeviceId}`)
      .then(res=>{
        setSubscribers(res.data)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setErrors('Unable to get data. Try again.')
        setLoading(false)        
      })
    }
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
        disabled ={loading}
        onPress={handleSubmit} title="Save" />
      ),
    });
  }, [navigation, handleSubmit,from,to,status,days,subscribers, loading/*timer,hrs,mins*/])

  const handleSubmit = () => {
    let complete = true
    if(!days.includes('1')) complete = false
   // if(timer && (hrs==='00' && mins==='00')) complete = false
    if(complete){
      let newRule = {
        StartTime: from,
        EndTime: to,
        Threshold: statusOpts.find(item=> item.Conversion === status).Status,
        Conversion: status,
        Days:days,
        action: newAlert?1:2,
        DeviceId: rule.DeviceId,
        RuleId: rule.RuleId,
        Subscribers: subscribers,
      /*  timer:timer,
        duration:{
          hrs:hrs,
          mins:mins
        }*/
      }
      if (authenticated){
        setLoading(true)
        if(newAlert){
          axios
          .post(`/device-rule`,
          {rule:newRule})
          .then(res=>{
              setFrom(res.data.StartTime)
              setTo(res.data.EndTime)
              setStatus(res.data.Conversion)
              setDays(res.data.Days)
              setErrors('')
              newAlert = false
              setLoading(false)
              Alert.alert('Alert Set')
              navigation.goBack()
          })
          .catch(err=>{
              console.log(err)
              setErrors('Unable to update. Try again')
              setLoading(false)
          })
        }
        else {
          axios.put(`/device-rule`,{rule:newRule})
          .then(res=>{
              setFrom(res.data.StartTime)
              setTo(res.data.EndTime)
              setStatus(res.data.Conversion)
              setDays(res.data.Days)
              setSubscribers(res.data.Subscribers)
              setErrors('')
              setLoading(false)
              Alert.alert('Alert Set')
          })
          .catch(err=>{
              console.log(err)
              setErrors('Unable to update. Try again')
              setLoading(false)
          })
        }
      }
      else{
        setLoading(false)
        Alert.alert('Alert Set')
        if(newAlert) navigation.goBack()
      }
    }
    else Alert.alert('','Complete all fields')
  }

  const confirmDelete = () => { 
    Alert.alert('Delete Alert', '', [
      {
        text: 'Yes',
        onPress: handleDelete,
        style: 'cancel',
      },
      { text: 'No' },
    ]);
  }

  const handleDelete = () => {
    if(authenticated){
    setLoading(true)
      axios.delete(`/device-rule?ruleId=${rule.RuleId}&deviceId=${rule.DeviceId}`)
      .then(()=>{
          setLoading(false)
          setErrors('')
          navigation.goBack()
      })
      .catch(err=>{
          console.log(err)
          setErrors('Unable to delete. Try again.')
          setLoading(false)
      })
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
                <Text>{convert24to12hr(from)}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'TimeSelector',
                    params: { value: from,
                      prevScreen:'New Alert',
                      setting:'startTime'}
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View>

            {/****** END TIME ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
            <Text style={[styles.textMuted,{flex:1}]}>End Time</Text>
              <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
                <Text>{convert24to12hr(to)}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'TimeSelector',
                    params: { value: to,
                      prevScreen:'New Alert',
                      setting:'endTime'}
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View>
             {/****** STATUS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>
                Status
                <Tooltip msg='Sensor activity that triggers the alert.'/>
              </Text>
              <View style={[styles.row, styles.pushRight]}>
                <Text>{status}</Text>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Selector',
                    params: { value: status,
                      options:statusOpts.map(item=> item.Conversion),
                      prevScreen:'New Alert',
                      setting:'status'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View>

            {/****** DAYS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>Days</Text>
              <View style={[styles.row, styles.pushRight,{flex:2}]}>
                {days.includes('0')?
                  weekdays.map((day,idx)=>(
                    <Text key={idx}> 
                        {days[idx]==='1'?day+"  ":null}
                    </Text>
                  )): 
                  <Text>EveryDay</Text>
                }
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Checkbox',
                    params: { value: days,
                    options:weekdays,
                    setting:'days'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View>
            {/****** SUBSCRIBERS ******/}
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>Subscribers</Text>
              <View style={[styles.row, styles.pushRight,{flex:2}]}>
                <TouchableOpacity
                  onPress={()=> navigation.navigate({
                    name: 'Checkbox',
                    params: { value: subscribers.map(item=> item.Subscribed.toString()),
                    options:subscribers.map(item=> item.UserName),
                    setting:'subscribers'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View>
            {/****** TIMER ******/}
            {/*
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
            {/*
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
          */}
      </View>
      </View>
      {!newAlert && <TouchableOpacity
                disabled={loading}
                onPress={confirmDelete}>
        <Text style={[styles.link,{marginVertical:20, textAlign:'center', color:'tomato'}]}>Delete</Text>
      </TouchableOpacity>}
      {errors!=='' && <Text style={{color:'tomato', textAlign:'center'}}>{errors}</Text>}
      {loading && <ActivityIndicator/>}
    </ScrollView>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
  )
} 

export default AddNewAlertScreen
