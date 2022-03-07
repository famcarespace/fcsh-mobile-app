import React,{useState, useLayoutEffect, useEffect} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList,
  Button, Pressable, TouchableOpacity,
Modal,
ActivityIndicator} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector } from "react-redux"
import {allAlerts, allStatusOpts} from "../../utils/device-data"

const DeviceAlertingRulesScreen = ({ navigation, route }) => {
    const {device} = route.params
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sa','Su']
    const width = Dimensions.get('window').width
    const [modalOpen, setModalOpen] = useState(false)
    const [deviceAlerts, setDeviceAlerts] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)
    const [statusOpts, setStatusOpts] = useState([])

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerRight:()=>
          <Button 
            disabled ={loading}
            onPress={()=> navigation.navigate({
            name: 'New Alert',
            params: { rule: {DeviceId: device.DeviceId}, 
              statusOpts: statusOpts,
              newAlert: true},
          })} title='+'/>
        })
    },[navigation, statusOpts, loading])

    useEffect(()=>{
      setLoading(true) 
      setErrors('')
      if(authenticated){
        axios.get(`/device-rules?deviceId=${device.DeviceId}`)
        .then(res=>{
         // console.log(res.data.statusOpts)
          setDeviceAlerts(res.data.rules)
          setStatusOpts(res.data.statusOpts)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
          setErrors('Unable to get data. Try again.')
          setLoading(false)
        })
      }
      else {
        setDeviceAlerts(allAlerts.filter(item=> item.DeviceId===device.DeviceId))
       // console.log(allStatusOpts.filter(item=> {if(item.Type===device.Type) return item.opts})[0].opts)
        setStatusOpts(allStatusOpts.filter(item=> {if(item.Type===device.Type) return item.opts})[0].opts) 
        setLoading(false)
      }
    },[])

    const renderItem = ({item}) => (
      <Pressable
        style={[styles.card, {width:width}]}
        onPress={()=> navigation.navigate({
          name: 'New Alert',
          params: { rule: item, 
            statusOpts: statusOpts,
            newAlert: false},
        })}>
            <Text><Text style={styles.textMuted}>From: </Text>{item.StartTime} hrs</Text>
            <Text><Text style={styles.textMuted}>To: </Text> {item.EndTime} hrs</Text>
            <Text><Text style={styles.textMuted}>Status: </Text> {item.Conversion}</Text> 
            <Text>
                <Text style={styles.textMuted}>Days: </Text>
                {item.Days.includes('0')?
                weekdays.map((day,key)=>(
                    <Text key={key}> 
                        {item.Days[key]==='1'?day+"  ":null}
                    </Text>
                )):
                <Text>Everyday</Text>}
            </Text>
            {item.timer &&
            <Text>
              <Text style={styles.textMuted}>Duration: </Text> 
              {item.duration.hrs} hrs {item.duration.mins} mins
            </Text>
            }
          <Text
            style={{position:'absolute', right:10, top:10, fontSize:12, color:'dodgerblue'}}>
              Edit
          </Text>
        </Pressable>
    )
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> What are alerts?</Text>
        </TouchableOpacity>
        { loading? <ActivityIndicator/>:
          deviceAlerts.length>0? 
          <FlatList data={deviceAlerts}
            renderItem={renderItem}
            keyExtractor={rule => rule.RuleId}/>
          :
          <Text>No alerts</Text>
        }
      </View>
      {!authenticated && <Subscribe navigation={navigation}/>}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalVisible(!modalOpen);
        }}>
        <View style={styles.centered}>
          <View style={styles.card}>
            <Text style={styles.marginBottom}>Notifications are sent to registered email/phone when an alert is triggered.</Text>
            <Text style={styles.marginBottom}>For example, you'd like to receive a notification if front door remains open for more than 20 mins at night</Text>
            <Text style={styles.marginBottom}>To do this, place a contact sensor on front door and set up an alert as follows: </Text>
            <Text><Text style={styles.textMuted}>Start Time: </Text> 9:00pm</Text>
            <Text><Text style={styles.textMuted}>End Time: </Text> 7:00am</Text>
            <Text><Text style={styles.textMuted}>Status: </Text> open</Text>
            <Text><Text style={styles.textMuted}>Days: </Text> everyday</Text>
            <Text><Text style={styles.textMuted}>Timer: </Text> yes</Text>
            <Text><Text style={styles.textMuted}>Duration: </Text> 20 mins</Text>
          </View>
          <Pressable
              style={[styles.button,{marginTop:-20}]}
              onPress={() => setModalOpen(!modalOpen)}>
              <Text style={styles.buttonText}>Got it! Let's move on.</Text>
          </Pressable>
        </View>
      </Modal>
      </SafeAreaView>
    );
}

export default DeviceAlertingRulesScreen
