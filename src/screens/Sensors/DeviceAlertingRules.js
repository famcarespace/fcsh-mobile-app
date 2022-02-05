import React,{useState} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, 
  Button, Pressable} from "react-native"

import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const DeviceAlertingRulesScreen = ({ navigation, route }) => {
    const {alertRules, deviceId, label, statusOpts} = route.params
    const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa','Su']
    const width = Dimensions.get('window').width
    const renderItem = ({item}) => (
      <Pressable
        style={[styles.card, {width:width}]}
        onPress={()=> navigation.navigate({
          name: 'New Alert',
          params: { rule: item, 
            deviceId: deviceId,
            label: label,
            opts: statusOpts,
            newAlert: false,
            screenTitle:'Edit Alert' },
        })}>
            <Text><Text style={styles.textMuted}>From: </Text>{item.from} hrs</Text>
            <Text><Text style={styles.textMuted}>To: </Text> {item.to} hrs</Text>
            <Text><Text style={styles.textMuted}>{label}: </Text> {item.status}</Text> 
            <Text>
                <Text style={styles.textMuted}>Days: </Text>
                {item.days.includes(0)?
                weekdays.map((day,key)=>(
                    <Text key={key}> 
                        {item.days[key]===1?day+"  ":null}
                    </Text>
                )):
                <Text>Everyday</Text>}
            </Text>
            {item.timer &&
            <Text>
              <Text style={styles.textMuted}>Duration: </Text> 
              {item.duration.hrs} hrs {item.duration.mins} mins
            </Text>
            }
        </Pressable>
    )
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.marginBottom}>
          Configure alerts to receive notification on phone/email
        </Text>
        {alertRules.length>0?
          <FlatList data={alertRules}
            renderItem={renderItem}
            keyExtractor={rule => rule.id}/>
          :
          <Text>No alerts</Text>
        }
        <Button style={styles.button}
        title='Set New Alert'
        onPress={()=> navigation.navigate({
          name: 'New Alert',
          params: {deviceId: deviceId,
                    label: label,
                    opts: statusOpts,
                    newAlert:true,
                  rule:null}
          })
        }/>
      </View>
      <Subscribe navigation={navigation}/>
      </SafeAreaView>
    );
}

export default DeviceAlertingRulesScreen
