import React, {useEffect, useState} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, ActivityIndicator,
  Pressable, Modal, TouchableOpacity, Alert} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {activeAlertsDemo} from "../../utils/device-data"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { convertToMins } from "../../utils/functions"
import { REMOVE_ALERT, SET_ACTIVE_ALERTS, UPDATE_ALERT } from "../../redux/types"

const ActiveAlertsScreen = ({ navigation, route }) => {
    const {authenticated, currUser, activeAlerts} = useSelector(state=>state)
    const dispatch = useDispatch()
    const {width, height} = Dimensions.get('window')
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')

    useEffect(()=>{
      fetchData()
      const unsubscribe = navigation.addListener('focus', () => {
        fetchData()
      })
      return unsubscribe
    },[])

    const fetchData = () =>{
      setErrors('')
      if(authenticated){
        setLoading(true)
        axios.get('/active-alerts')
        .then(res=>{
          dispatch({
            type:SET_ACTIVE_ALERTS,
            payload: res.data})
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
          setErrors('Unable to get data. Try again.')
          setLoading(false)
        })
      }    
      else{
        dispatch({
          type:SET_ACTIVE_ALERTS,
          payload:activeAlertsDemo
        })
        setLoading(false)
      }
    }

    const handlePick = (id) =>{
      setErrors('')
      if(authenticated){
        setLoading(true)
        axios.put(`/pick-alert?alertId=${id}`)
        .then(()=>{
          setLoading(false)
          Alert.alert('','Alert assigned to you. Thanks!')
        })
        .catch(err=>{
          console.log(err)
          setErrors('Action failed. Try again.')
          setLoading(false)
        })
      }
      else
        Alert.alert('','Alert assigned to you. Thanks!')
    }

    const handleUnpick = (id) =>{
      setErrors('')
      if(authenticated){
        setLoading(true)
        axios.put(`/unpick-alert?alertId=${id}`)
        .then(()=>{
          setLoading(false)
          Alert.alert('','Alert unassigned')
        })
        .catch(err=>{
          console.log(err)
          setErrors('Action failed. Try again.')
          setLoading(false)
        })
      } 
      else
        Alert.alert('','Alert unassigned')
    }

    const handleResolve = (id) =>{
      setErrors('')
      if(authenticated){
        setLoading(true)
        axios.put(`/resolve-alert?alertId=${id}`)
        .then(()=>{
          setLoading(false)
          Alert.alert('','Alert resolved. Thanks!')
        })
        .catch(err=>{
          console.log(err)
          setErrors('Action failed. Try again.')
          setLoading(false)
        })
      } 
      else
        Alert.alert('','Alert resolved. Thanks!')
    }

    const handlePress = (item)=> {
        if(item.HandledByUserId!==null){
            if (item.HandledByUserId === currUser.UserId)
            {
              Alert.alert('Take Action','',[
                {
                    text: 'Resolve',
                    onPress: () => handleResolve(item.Id),
                },
                {
                    text: 'Unpick',
                    onPress: () => handleUnpick(item.Id),
                },
                {
                    text: 'Cancel',
                },
              ])
            } else {
              Alert.alert('','Alert already assigned')
            }
        } else {
            Alert.alert('Take Action','',[
                {
                    text: 'Pick',
                    onPress: () => handlePick(item.Id),
                },
                {
                    text: 'Cancel',
                },
            ]) 
        }
    }

    const renderItem = ({item}) => {
      return(
        <Pressable onPress={()=>handlePress(item)}>
      <View style={[styles.card, {width:width}]}>
          <Text style={styles.h4}>{item.Name}</Text>
          <Text style={[styles.textMuted, styles.marginBottom]}>{item.Location}</Text>
          <Text><Text style={styles.textMuted}>Status: </Text> {item.Conversion+' '}{convertToMins(new Date(item.CreatedOn).getTime())}</Text>       
          <Text><Text style={styles.textMuted}>Alert State: </Text>
            {(item.Assigned===1)?
                `Picked by ${item.Handler.FirstName+' '}${item.Handler.LastName} ${convertToMins(new Date(item.FirstResponse).getTime())}`:
                <Text style={{color:'tomato'}}>Unassigned</Text>}
        </Text> 
      </View>
      </Pressable>
      )
    }  
    
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
      <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> How to respond to alerts?</Text>
        </TouchableOpacity>
        {errors!=='' && <Text style={{color:'tomato'}}>{errors}</Text>}
        { loading? <ActivityIndicator/>:
            <FlatList 
              //style={{height:height-40}}
              data={activeAlerts}
              renderItem={renderItem}
              keyExtractor={rule => rule.Id}
              ListEmptyComponent={<Text>All well here</Text>}
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
           <Text style={styles.marginBottom}>Following actions can be taken by a subscriber in response to an alert: </Text>
           <Text style={styles.marginBottom}>
               <Text style={styles.textMuted}>PICK: </Text> By picking an alert, you let others know that you're on the way to help.</Text>
            <Text style={styles.marginBottom}>
                <Text style={styles.textMuted}>RESOLVE: </Text> Once an alert is picked up by a subscriber, they can mark it as resolved to let the others know their loved one is safe.</Text> 
            <Text>
                <Text style={styles.textMuted}>UNASSIGN: </Text> This is the default state. It means, the alert was sent to subscribers but is not being handled by any user as of now.</Text>
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

export default ActiveAlertsScreen
