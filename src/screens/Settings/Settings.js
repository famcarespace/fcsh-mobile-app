import React,{useState, useEffect} from "react"
import { SafeAreaView, View, Text, Image,
TouchableOpacity } from "react-native"
import gateway from '../../../assets/images/gateway.png'
import styles from "../../../assets/styles"
import {MaterialIcons} from '@expo/vector-icons'
import Tooltip from "../../components/Tooltip"

const SettingsScreen = ({ navigation, route }) => {
    const [timezone, setTimezone] = useState('US/Eastern (GMT-4)')
    const [sms, setSms] = useState('yes')
    const zoneOpts = ['US/Eastern (GMT-4)',
    'US/Central(GMT-5)',
    'US/Mountain(GMT-7)',
    'US/Alaska(GMT-8)',
    'US/Hawaii(GMT-10)',
    'GMT+0']

    useEffect(()=>{
      if(route.params?.selected){
        if(route.params.setting==='timezone')
          setTimezone(route.params.selected)
        else setSms(route.params.selected)
      }

    },[route.params?.selected])

    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        {/***** Gateway Info ****/}
        <View style={[styles.card, styles.row]}>
          <Image style={styles.imgIcon}
          source={gateway}/>
          <View>
            <Text style={styles.cardHeader}>
              Gateway
              <Tooltip msg={`Gateway is a communication bridge between the app and physical devices.`}/>
            </Text>
            <Text style={styles.textMuted}>
              30:ae:7b:f1:e3:65
            </Text>
            <Text>
              <Text style={styles.textMuted}>IP: </Text>
              http://192.168.0.112
            </Text> 
          </View>
        </View>
        {/***** Timezone ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Timezone
            <Tooltip msg='select timezone of the location where sensors are placed.'/>
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <Text>{timezone}</Text>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'Zone Selector',
                params: { value: timezone,
                  options:zoneOpts,
                  prevScreen:'Settings Landing',
                  setting:'timezone'},
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** SMS ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            SMS Notification
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <Text>{sms}</Text>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'Zone Selector',
                params: { value: sms,
                  options:['yes', 'no'],
                  prevScreen:'Settings Landing',
                  setting:'sms'},
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** User Info ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Other Details
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'Userinfo',
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** Password ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Password
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'Update Password',
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
          </View>
        </View>
        {/***** New Users ****/}
        <View style={[styles.card, styles.row,{alignItems:'center'}]}>
          <Text style={[styles.textMuted,{flex:1}]}>
            Add Members
          </Text>
          <View style={[styles.row, styles.pushRight]}>
            <TouchableOpacity
              onPress={()=> navigation.navigate({
                name: 'Add Members',
              })}>
              <MaterialIcons name='navigate-next' size={30} color='lightgray'/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </SafeAreaView>
    );
}

export default SettingsScreen
