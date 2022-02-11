import React,{useState} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native"
import styles from "../../../assets/styles"
import {MaterialIcons} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import Subscribe from "../../components/Subscribe"

const SmartBulbScreen = ({navigation, route }) => {
    const {device} = route.params
    const [power, setPower] = useState(device.status==='On'?true:false)
    const [hue, setHue] = useState(device.hue)
    const [sat,setSat] = useState(device.sat)
    const [bright, setBright] = useState(device.bright)

    return (
    <SafeAreaView style={styles.mainContentContainer}>
        <View style={[styles.innerContainer,{alignSelf:"center" ,width:"80%"}]}>
            <TouchableOpacity
                style={[styles.powerButton, styles.marginBottom]}
                onPress={()=>setPower(!power)}>
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
            {(device.cat==='bulb'&&Platform.OS==='ios') &&
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
                />
            </View>}
            <TouchableOpacity
                style={{marginVertical:30}}
                onPress={()=> navigation.navigate({
                    name: 'Device Settings',
                    params: { device: device },
                })
                }>
                <Text style={styles.link}>Settings</Text>
            </TouchableOpacity>
        </View>

        <Subscribe navigation={navigation}/>
    </SafeAreaView>
    )
}

export default SmartBulbScreen
