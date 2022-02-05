import React,{useState} from "react"
import { View, Text, 
  SafeAreaView, Modal,
  Dimensions,
  Pressable} from "react-native"
import {MaterialIcons} from '@expo/vector-icons'

import styles from "../../assets/styles"
import EditAlertRule from "./EditAlertRule"

const width = Dimensions.get('window').width-60

const AlertRule = ({ rule, deviceId }) => {
    const [visible, setVisible] = useState(false)
    const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa','Su']
    return (
        <SafeAreaView style={styles.mainContentContainer}>
        <Pressable
        style={[styles.card, {width:width}]}
        onPress={()=> (setVisible(true))}>
            <Text><Text style={styles.textMuted}>From: </Text>{rule.from}</Text>
            <Text><Text style={styles.textMuted}>To: </Text> {rule.to}</Text>
            <Text><Text style={styles.textMuted}>Status: </Text> {rule.status}</Text> 
            <Text>
                <Text style={styles.textMuted}>Days: </Text>
                {weekdays.map((day,idx)=>(
                    <Text key={idx}> 
                        {rule.days[idx]===1?day+"  ":null}
                    </Text>
                ))}
            </Text>
        </Pressable>

      </SafeAreaView>
    )
}

export default AlertRule
