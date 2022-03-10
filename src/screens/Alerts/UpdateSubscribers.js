import React,{useState, useLayoutEffect, useEffect} from "react"
import { View, Text, Pressable,
  SafeAreaView, Button, ActivityIndicator, Alert, TouchableOpacity} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector } from "react-redux"
import {demoSubscribers} from "../../utils/device-data"

const UpdateSubscribersScreen = ({navigation, route }) => {
    const {device} = route.params
    const [subscribers, setSubscribers] = useState([])
    const [checked, setChecked] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)

    const fetchData = () => {
        setLoading(true) 
        setErrors('')
        if(authenticated){
          axios.get(`/alert-subscribers?deviceId=${device.DeviceId}`)
          .then(res=>{
           // console.log(res.data)
            setSubscribers(res.data)
            setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            setErrors('Unable to get data. Try again.')
            setLoading(false)
          })
        }
        else {
          setSubscribers(demoSubscribers)
          setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
      },[navigation])
    
    useEffect(()=>{
        setChecked(subscribers.map(item=> item.Subscribed))
    },[subscribers])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
            disabled={loading}
            onPress={handleSubmit} title="Save" />
          ),
        });
      }, [navigation, handleSubmit, loading, checked, subscribers])

    const handleSubmit = () => {
        if(authenticated){
            setLoading(true)
            setErrors('')
            var newList = subscribers
            newList.forEach((item, key)=> item.Subscribed = checked[key])
            axios.put('/alert-subscribers',{
                deviceId:device.DeviceId,
                subscribers:newList
            })
            .then(res=>{
                setSubscribers(res.data)
                setLoading(false)
                Alert.alert('','Subscribers updated')
                
            })
            .catch(err=>{
                console.log(err)
                setErrors('Unable to get data. Try again.')
                setLoading(false)
            })
        } else {
            setSubscribers(demoSubscribers)
            setLoading(false)
        }
    }  
    
    const handleChange = (key) => {
        var temp = checked
        temp[key] = temp[key]===1?0:1
        setChecked([...temp])

    }

    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
        <Text style={styles.marginBottom}>Selected people who should receive this alert</Text>
        <View style={styles.card}>
            {loading?<ActivityIndicator/>:
                subscribers.map((user, key)=>(
                    <View key={key} style={[styles.row, styles.marginBottom]}>
                    <Text style={{flex:1}}>{user.UserName}</Text>
                        <View style={[styles.row, styles.pushRight]}>
                            <TouchableOpacity
                                disabled={loading || user.Role===2}
                                key={key}
                                onPress={()=>handleChange(key)}>
                                {checked[key]===1?
                                    <MaterialIcons name='check-box' size={24} color='dodgerblue'/>
                                    :   
                                    <MaterialIcons name='check-box-outline-blank'
                                    size={24} color='lightgrey'/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            } 
        </View>
        {errors!==''&& <Text style={{color:'tomato'}}>{errors}</Text>}
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
    )
}

export default UpdateSubscribersScreen
