import React, {useEffect, useState} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, ActivityIndicator,
  Pressable, Modal, TouchableOpacity} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {allAlerts} from "../../utils/device-data"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector } from "react-redux"
import { convert24to12hr } from "../../utils/functions"

const AllAlertingRulesScreen = ({ navigation, route }) => {
    const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa','Su']
    const {width, height} = Dimensions.get('window')
    const [modalOpen, setModalOpen] = useState(false)
    const [allActiveAlerts, setAllActiveAlerts] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)

    useEffect(()=>{
      fetchData()
      const unsubscribe = navigation.addListener('focus', () => {
        fetchData()
      })
      return unsubscribe      
    },[])

    const fetchData = () =>{
      setLoading(true)
      setErrors('')
      if(authenticated){
        axios.get('/all-rules')
        .then(res=>{
          setAllActiveAlerts(res.data)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
          setErrors('Unable to get data. Try again.')
          setLoading(false)
        })
      }
      else {
        setAllActiveAlerts(allAlerts)
        setLoading(false)
      }
    }

    const renderItem = ({item}) => {
      return(
      <View style={[styles.card, {width:width}]}>
          <Text style={styles.h4}>{item.Name}</Text>
          <Text style={[styles.textMuted, styles.marginBottom]}>{item.Location}</Text>
          <Text><Text style={styles.textMuted}>From: </Text>{convert24to12hr(item.StartTime)}</Text>
          <Text><Text style={styles.textMuted}>To: </Text> {convert24to12hr(item.EndTime)}</Text>
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
      </View>
      )
    }
    
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
      <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> What are alerts?</Text>
        </TouchableOpacity>
        {errors!=='' && <Text>{errors}</Text>}
        { loading? <ActivityIndicator/>:
            <FlatList 
              style={{height:height-30}}
              data={allActiveAlerts}
              renderItem={renderItem}
              keyExtractor={rule => rule.RuleId}
              ListEmptyComponent={<Text>No alerts set</Text>}
              onRefresh={()=>fetchData()}
              refreshing={loading}/>
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
            <Text style={styles.marginBottom}>For example, you'd like to receive a notification if front door remains open at night</Text>
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
    )
}

export default AllAlertingRulesScreen
