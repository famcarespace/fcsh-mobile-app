import React from "react"
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const DeviceSettingsScreen = ({navigation, route }) => {
    const {device} = route.params
    const [location, setLocation]=React.useState(device.loc)

    const submitLocation = () => {
        if(location.length>0)
            alert(`Location updated to ${location}`)
    }
    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
        <Text style={styles.marginBottom}>Give your device a relevant location</Text>
        <View style={styles.card}>
            <Text style={styles.cardHeader}>{device.type}</Text>
            {device.battery &&
                <Text style={styles.marginBottom}>
                    Battery: {device.battery}%
                </Text>
            }
            <Text>Location</Text>
            <TextInput
                style={styles.input}
                onChangeText={setLocation}
                value={location}
                placeholder="Device Location"
            />
        </View>
        <TouchableOpacity style={[styles.button,styles.marginBottom, {marginTop:-20}]} 
            onPress={submitLocation}>
                <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <View>
            {device.customAlerts && <TouchableOpacity
                onPress={()=> navigation.navigate({
                    name: 'Device Alerts',
                    params: { deviceId: device.id,
                        label: device.label,
                        statusOpts:device.statusOpts,
                        alertRules: device.alertRules }
                  })}>
                <Text style={[styles.link,{marginVertical:20}]}>Alerts</Text>
            </TouchableOpacity>}
            <TouchableOpacity
                onPress={()=> navigation.navigate({
                    name: 'Device History',
                    params: { history: device.history },
                  })
                }>
                <Text style={styles.link}>History</Text>
            </TouchableOpacity>
        </View>
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
    )
}

export default DeviceSettingsScreen
