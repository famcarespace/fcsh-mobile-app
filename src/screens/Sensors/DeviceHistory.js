import React from "react"
import { View, Text, SafeAreaView, FlatList } from "react-native"

import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const renderItem = ({item})=> (
  <View style={styles.marginBottom}>
    <Text style={styles.textMuted}>{item.timestamp}</Text>
    <Text>{item.status}</Text>
  </View>
)
const DeviceHistoryScreen = ({ navigation, route }) => {
  const {history} = route.params  
  return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
      {history.length>0?
        <View style={styles.card}>
          <FlatList data={history}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        :
        <Text>No history to show</Text>
      }
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
  );
}

export default DeviceHistoryScreen
