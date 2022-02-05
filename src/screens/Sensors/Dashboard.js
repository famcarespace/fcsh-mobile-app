import React from "react"
import {Text, Image, Dimensions,
TouchableOpacity,
SafeAreaView,
FlatList, 
View} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {overview} from '../../utils/device-data'

const DashboardScreen = ({ navigation, route }) =>{

  const width = Dimensions.get('window').width-60
  const renderItem = ({item}) => (
    <TouchableOpacity
        style={[styles.card, styles.row,{width:width}]}
        onPress={()=> navigation.navigate({
          name: 'Grouped Status',
          params: { type: item.cat },
        })}
      >
       {<Image style={styles.imgIcon}
       source={item.icon}/>}
       <View>
        <Text style={[styles.h2]}>
          {item.count}
        </Text>
        <Text>{item.label}</Text> 
       </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <FlatList data={overview}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={navigation}
        />
      </View>
      <Subscribe navigation={navigation}/>
    </SafeAreaView>
  )
}

export default DashboardScreen

