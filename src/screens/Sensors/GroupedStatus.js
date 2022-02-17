import React from "react"
import {Text,
TouchableOpacity,
SafeAreaView,
FlatList, 
Dimensions,
View} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {sensors} from '../../utils/device-data'

const GroupedStatus = ({ navigation, route }) =>{

  const { type } = route.params
  const width = Dimensions.get('window').width
  
  const devices = sensors.filter(item=> item.cat===type)
  var redirectScreen=''
  var screenTitle=''
  switch (type){
    case 'sensor':
      redirectScreen='Device Settings'
      screenTitle='Settings'
      break;
    case 'bulb':
      redirectScreen='Smart Bulb'
      screenTitle='Smart Bulb'
      break;
    case 'plug':
      redirectScreen='Smart Bulb'
      screenTitle='Smart Plug'
      break;
    case 'switch':
      redirectScreen='Smart Switch'
      screenTitle='Smart Switch'
  }

  const renderItemSensor = ({item}) => {
    let lastMessage = parseInt(Math.random()*10)
    return(
    <TouchableOpacity
        style={[styles.card, styles.row, {width:width}]}
        onPress={()=> navigation.navigate({
          name: redirectScreen,
          params: { device: item,
          screenTitle: screenTitle },
        })}
      >   
      <View style={{flex:1}}>
        <Text>{item.type}</Text>
        <Text style={styles.textMuted}>{item.loc}</Text>
      </View> 
      <View style={{flex:1}}>
        {item.cat ==='switch'?
        <Text style={styles.textRight}>{item.ss1+' | '+item.ss2+' | '+item.ss3}</Text>
        :
        <Text style={styles.textRight}>{item.status}</Text>
        }
        <Text style={styles.textRight}>
          {lastMessage===0?'now':`${lastMessage} mins ago`}
        </Text>
      </View>
    </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
      <FlatList data={devices}
      renderItem={renderItemSensor}
      keyExtractor={item => item.id}
      extraData={navigation}
      />
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
  )
}

export default GroupedStatus

