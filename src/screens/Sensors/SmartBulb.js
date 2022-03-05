import React,{useState, useLayoutEffect} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Platform, ActivityIndicator } from "react-native"
import styles from "../../../assets/styles"
import {MaterialIcons} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import Subscribe from "../../components/Subscribe"
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { UPDATE_DEVICE_STATUS, UPDATE_HSV_SETTINGS } from "../../redux/types"

const SmartBulbScreen = ({navigation, route }) => {
    const {device} = route.params
    const [power, setPower] = useState(device.lastMessage==='1'?true:false)
    const [hue, setHue] = useState(device.Hue)
    const [sat,setSat] = useState(device.Sat)
    const [bright, setBright] = useState(device.Bright)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {authenticated} = useSelector(state=>state)
    const dispatch = useDispatch()

    const handlePowerChange = () => {
        if(authenticated){
            setLoading(true)
            setError('')
            axios.post('/toggle-single',{
                deviceId:device.DeviceId,
                status:!power
            })
            .then(res=>{
                setPower(res.data.status)
                dispatch({
                    type:UPDATE_DEVICE_STATUS,
                    payload:{
                    deviceMac: device.MacAddr,
                    status: res.data.status,
                    battery:null,
                    lastMessageTime:res.data.time,
                    conversion:res.data.status?'On':'Off',
                    lastMessage:res.data.status?'1':'0'
                    }
                })
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setError('Unable to update. Try again.')
                setLoading(false)
            })
        }
        else setPower(!power)
    }

    const handlehsvChange = () => {
        if(authenticated){
            setLoading(true)
            setError('')
            axios.post('/hsv-settings',{
                deviceId:device.DeviceId,
                hue:hue, sat:sat, bright:bright
            })
            .then(res=>{
                dispatch({
                    type:UPDATE_HSV_SETTINGS,
                    payload:{
                    deviceMac: device.MacAddr,
                    hue:hue,
                    sat:sat,
                    bright:bright
                    }
                })
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setError('Unable to update. Try again.')
                setLoading(false)
            })
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
            disabled={loading}
            onPress={()=> navigation.navigate({
                name: 'Device Settings',
                params: { device: device },
            })}>
                <MaterialIcons name='settings' size={25} color='dodgerblue'/>
            </TouchableOpacity>
          ),
        });
      }, [navigation])


    return (
    <SafeAreaView style={styles.mainContentContainer}>
        <View style={[styles.innerContainer,{alignSelf:"center" ,width:"80%"}]}>
            <TouchableOpacity
                style={[styles.powerButton, styles.marginBottom]}
                diabled={loading}
                onPress={handlePowerChange}>
                {power?
                    <MaterialIcons name='power-settings-new'
                    size={150} color='dodgerblue'/>
                :
                    <MaterialIcons name='power-settings-new'
                    size={150} color='lightgray'/>
                }
            </TouchableOpacity>
            <Text style={styles.marginBottom}>
                {power? 'Power On':'Power Off'}
            </Text>
            {(device.Type===7 && Platform.OS==='ios') &&
            <View style={{width:"100%"}}>
                <Text style={styles.textLeft}>Hue</Text>
                <Slider
                    style={{width:"100%", height: 60}}
                    minimumValue={0}
                    maximumValue={255}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="lightgray"
                    onValueChange={setHue}
                    value={hue}
                    disabled={loading}
                />
                <Text style={styles.textLeft}>Saturation</Text>
                <Slider
                    style={{width:"100%", height: 60}}
                    minimumValue={0}
                    maximumValue={255}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="lightgray"
                    onValueChange={setSat}
                    value={sat}
                    disabled={loading}
                />
                <Text style={styles.textLeft}>Brightness</Text>
                <Slider
                    style={{width:"100%", height: 60}}
                    minimumValue={0}
                    maximumValue={255}
                    minimumTrackTintColor="dodgerblue"
                    maximumTrackTintColor="lightgray"
                    onValueChange={setBright}
                    value={bright}
                    disabled={loading}
                />
                <TouchableOpacity
                    style={{marginVertical:30}}
                    disabled={loading}
                    onPress={handlehsvChange}>
                    <Text style={[styles.link,{textAlign:'center'}]}>Save Color</Text>
                </TouchableOpacity>
            </View>
            }

            {loading && <ActivityIndicator/>}
            {error!=='' && <Text style={{color:'tomato'}}>{error}</Text>}
        </View>

        {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
    )
}

export default SmartBulbScreen
