import React,{useEffect, useState} from "react"
import { View, Text, Pressable } from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import { useSelector, useDispatch } from "react-redux"
import { SET_ACTIVE_ALERTS } from "../redux/types"
import axios from 'axios'
import { activeAlertsDemo } from "../utils/device-data"

const NotificationsIcon = ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const {authenticated, activeAlerts} = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
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

    },[])

    return (
        <Pressable onPress={()=>navigation.navigate('Alerts Active')}>
            <MaterialIcons name='notifications' size={30} color='gainsboro'
            style={{
                padding:5,
                marginRight:7
            }}/>
            {
                (!loading && activeAlerts.length!==0) &&
                <View style={{
                    position:'absolute',
                    bottom:1,
                    right:5,
                    backgroundColor:'crimson',
                    borderRadius:12,
                    paddingHorizontal:6,
                    paddingVertical:2,
                }}>
                    <Text style={{color:'#fff'}}>{activeAlerts.length}</Text>
                </View>
            }
        </Pressable>
    )
}

export default NotificationsIcon
