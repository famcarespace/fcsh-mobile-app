import React,{useState} from "react"
import { View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native"
import styles from "../../../assets/styles"
import {MaterialIcons} from '@expo/vector-icons'

const SmartSwitchScreen = ({navigation, route }) => {
    const {device} = route.params
    const [ss1, setSS1] = useState(device.ss1==='On'?true:false)
    const [ss2, setSS2] = useState(device.ss2==='On'?true:false)
    const [ss3, setSS3] = useState(device.ss3==='On'?true:false)
    return (
    <SafeAreaView style={styles.mainContentContainer}>
        <View style={[styles.innerContainer,{flex:1}]}>
            <View style={styles.row}>
                <View style={[styles.centered,{flex:1, marginRight:2}]}>
                    <TouchableOpacity
                        style={[styles.powerButton, styles.marginBottom]}
                        onPress={()=>setSS1(!ss1)}>
                        {ss1?
                            <MaterialIcons name='power-settings-new'
                            size={60} color='dodgerblue'/>
                        :
                            <MaterialIcons name='power-settings-new'
                            size={60} color='lightgray'/>
                        }
                    </TouchableOpacity>
                    <Text style={styles.textMuted}>Switch 1</Text>
                    <Text>{ss1? 'On':'Off'}</Text>
                </View>
                <View style={[styles.centered,{flex:1, marginRight:2}]}>
                    <TouchableOpacity
                        style={[styles.powerButton, styles.marginBottom]}
                        onPress={()=>setSS2(!ss2)}>
                        {ss2?
                            <MaterialIcons name='power-settings-new'
                            size={60} color='dodgerblue'/>
                        :
                            <MaterialIcons name='power-settings-new'
                            size={60} color='lightgray'/>
                        }
                    </TouchableOpacity>
                    <Text style={styles.textMuted}>Switch 2</Text>
                    <Text>{ss2? 'On':'Off'}</Text>
                </View>
                <View style={[styles.centered,{flex:1, marginRight:2}]}>
                    <TouchableOpacity
                        style={[styles.powerButton, styles.marginBottom]}
                        onPress={()=>setSS3(!ss3)}>
                        {ss3?
                            <MaterialIcons name='power-settings-new'
                            size={60} color='dodgerblue'/>
                        :
                            <MaterialIcons name='power-settings-new'
                            size={60} color='lightgray'/>
                        }
                    </TouchableOpacity>
                    <Text style={styles.textMuted}>Switch 3</Text>
                    <Text>{ss3? 'On':'Off'}</Text>
                </View>
            </View>
        </View>
        <View style={styles.card}>
                <Button
                    title='Settings'
                    onPress={()=> navigation.navigate({
                        name: 'Device Settings',
                        params: { device: device },
                    })
                    }/>
            </View>
    </SafeAreaView>
    )
}

export default SmartSwitchScreen
