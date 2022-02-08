import React,{useState} from "react"
import { View, Text, Dimensions, 
  SafeAreaView,FlatList, 
  Button, Pressable, TouchableOpacity,
Modal} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'

const DeviceAlertingRulesScreen = ({ navigation, route }) => {
    const {alertRules, deviceId, label, statusOpts} = route.params
    const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa','Su']
    const width = Dimensions.get('window').width
    const [modalOpen, setModalOpen] = useState(false)

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
          <Text
            style={{position:'absolute', right:10, top:10, fontSize:12, color:'dodgerblue'}}>
              Edit</Text>
        </Pressable>
    )
    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> What are alerts?</Text>
        </TouchableOpacity>
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
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalVisible(!modalOpen);
        }}>
        <View style={styles.centered}>
          <View style={styles.card}>
            <Text style={styles.marginBottom}>Notifications are sent to registered email/phone when an alert is triggered.</Text>
            <Text style={styles.marginBottom}>For example, you'd like to receive a notification if front door remains open for more than 20 mins at night</Text>
            <Text style={styles.marginBottom}>To do this, place a contact sensor on front door and set up an alert as follows: </Text>
            <Text><Text style={styles.textMuted}>Start Time: </Text> 9:00pm</Text>
            <Text><Text style={styles.textMuted}>End Time: </Text> 7:00am</Text>
            <Text><Text style={styles.textMuted}>Status: </Text> open</Text>
            <Text><Text style={styles.textMuted}>Days: </Text> everyday</Text>
            <Text><Text style={styles.textMuted}>Timer: </Text> yes</Text>
            <Text><Text style={styles.textMuted}>Duration: </Text> 20 mins</Text>
          </View>
          <Pressable
              style={[styles.button,{marginTop:-20}]}
              onPress={() => setModalOpen(!modalOpen)}>
              <Text style={styles.buttonText}>Got it! Let's move on.</Text>
          </Pressable>
        </View>
      </Modal>
      </SafeAreaView>
    );
}

export default DeviceAlertingRulesScreen
