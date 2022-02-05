import React from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, 
  Pressable} from "react-native"

import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {allAlerts} from "../../utils/device-data"

const AllAlertingRulesScreen = ({ navigation, route }) => {
    const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa','Su']
    const width = Dimensions.get('window').width

    const renderItem = ({item}) => {
      return(
      <Pressable
        key={item.id}
        style={[styles.card, {width:width}]}
        onPress={()=> navigation.navigate({
          name: 'New Alert',
          params: { rule: item, 
            deviceId: item.deviceId,
            label: item.label,
            opts: item.statusOpts,
            newAlert: false,
            screenTitle:'Edit Alert' },
        })}>
          <Text style={styles.h4}>{item.type}</Text>
            <Text style={[styles.textMuted, styles.marginBottom]}>{item.loc}</Text>
            <Text><Text style={styles.textMuted}>From: </Text>{item.from} hrs</Text>
            <Text><Text style={styles.textMuted}>To: </Text> {item.to} hrs</Text>
            <Text><Text style={styles.textMuted}>{item.label}: </Text> {item.status}</Text> 
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
    }
    
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        {allAlerts.length>0?
          <FlatList data={allAlerts}
            renderItem={renderItem}
            keyExtractor={rule => rule.id}/>
          :
          <Text>No alerts</Text>
        }
      </View>
      <Subscribe navigation={navigation}/>
      </SafeAreaView>
    )
}

export default AllAlertingRulesScreen
