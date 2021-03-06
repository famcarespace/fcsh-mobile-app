import React,{useState} from "react"
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ActivityIndicator } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import Tooltip from "../../components/Tooltip"
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { UPDATE_DEVICE_SETTINGS } from "../../redux/types"

const DeviceSettingsScreen = ({navigation, route }) => {
    const {device} = route.params
    const [location, setLocation]=useState(device.Location)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        if(authenticated){
            var settings = {
                location: location, 
                deviceId:device.DeviceId
            }
            if(location.length>0){
                setLoading(true)
                setErrors('')
                axios.put('/device-settings/', settings)
                .then(res=>{
                    dispatch({
                        type:UPDATE_DEVICE_SETTINGS,
                        payload: settings
                    })
                    setLocation(res.data)
                    setLoading(false)
                })
                .catch((err)=>{
                    console.log(err)
                    setErrors('Unable to update. Try again.')
                    setLoading(false)
                })
            }
        }
        else Alert.alert('','Location Updated')
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button
            disabled={loading}
            onPress={handleSubmit} title="Save" />
          ),
        });
      }, [navigation, handleSubmit, loading])
    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
        <Text style={styles.marginBottom}>Give your device a relevant location</Text>
        <View style={styles.card}>
            <Text style={styles.cardHeader}>{device.Name}</Text>
            {device.Battery!==null &&
                <Text style={styles.marginBottom}>
                    Battery: {device.Battery}%
                </Text>
            }
            <Text>Location
                <Tooltip msg='Where is this device placed?'/>
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setLocation}
                value={location}
                placeholder="Device Location"
            />
            {errors!==''&& <Text style={{color:'tomato'}}>{errors}</Text>}
            {loading && <ActivityIndicator/>}
        </View>
        <View>
            {device.customAlerts? 
            <TouchableOpacity
                onPress={()=> navigation.navigate({
                    name: 'Device Alerts',
                    params: { device: device }
                  })}>
                <Text style={[styles.link,{marginVertical:20}]}>Alerts</Text>
            </TouchableOpacity>:
            <TouchableOpacity
                onPress={()=> navigation.navigate({
                    name: 'Subscribers',
                    params: { device: device }
                })}>
                <Text style={[styles.link,{marginVertical:20}]}>Subscribers</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity
                onPress={()=> navigation.navigate({
                    name: 'Device History',
                    params: { device: device },
                  })
                }>
                <Text style={styles.link}>History</Text>
            </TouchableOpacity>
        </View>
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
    )
}

export default DeviceSettingsScreen
