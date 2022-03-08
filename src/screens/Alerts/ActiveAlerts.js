import React, {useEffect, useState} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, ActivityIndicator,
  Pressable, Modal, TouchableOpacity, Alert} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {activeAlerts} from "../../utils/device-data"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector } from "react-redux"

const ActiveAlertsScreen = ({ navigation, route }) => {
    const width = Dimensions.get('window').width
    const [modalOpen, setModalOpen] = useState(false)
    const [allActiveAlerts, setAllActiveAlerts] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)

    useEffect(()=>{
      fetchData()
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
        setAllActiveAlerts(activeAlerts)
        setLoading(false)
      }
    }

    const handlePress = (item)=> {
        if(item.AlertAssigned==='true'){
            //if handledByUserId === currentUserId
            Alert.alert('Take Action','',[
                {
                    text: 'Resolve',
                    //onPress: () => handleDelete,
                },
                {
                    text: 'Unassign',
                    //onPress: () => handleDelete,
                },
                {
                    text: 'Cancel',
                },
            ])
        } else {
            Alert.alert('Take Action','',[
                {
                    text: 'Pick',
                    //onPress: () => handleDelete,
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
          <Text><Text style={styles.textMuted}>Status: </Text> {item.Conversion}</Text> 
          <Text><Text style={styles.textMuted}>At: </Text>{item.Time} hrs</Text>        
          <Text><Text style={styles.textMuted}>Alert State: </Text> 
            {item.AlertAssigned==='true'?
                `Assigned to ${item.HandledByUserName} at ${item.AssignTime}`:
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
        {errors!=='' && <Text>{errors}</Text>}
        { loading? <ActivityIndicator/>:
            <FlatList data={allActiveAlerts}
              renderItem={renderItem}
              keyExtractor={rule => rule.AlertId}
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
