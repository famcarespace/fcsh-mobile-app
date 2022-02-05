import React from "react"
import { FlatList, View, Image, Text, TouchableOpacity } from "react-native"
import styles from "../../../assets/styles"
import {approvePost} from '../../utils/activity-stream.js'
import MediaSlider from "../../components/Activity/MediaSlider"
import {MaterialIcons} from '@expo/vector-icons'
import Subscribe from '../../components/Subscribe'


const ActivityStreamScreen = ({ navigation, route }) => {

  const renderItem = ({item}) => (
    <View style={[styles.card]}>
      <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
        <Image source={item.UserPic}
          style={styles.userAvatar}/>
        <View>
          <Text>{item.UserName}</Text>
          <Text style={styles.textMuted}>
            {item.RoleName}
          </Text>
        </View>
      </View>
      <View style={{marginLeft:-20}}>
        <MediaSlider mediaArray={item.media}/>
      </View>
      <Text style={{marginVertical:15}}>{item.StatusText}</Text>
      <View style={styles.hr}/>
      <View style={[styles.row,{justifyContent:'space-around', marginTop:20}]}>
        <TouchableOpacity onPress={()=> alert('Post will be added to activity stream')}>
          <View style={styles.row}>
            <MaterialIcons name='check-circle' size={30} color='green'/>
            <Text>Approve</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> alert('Post will be rejected')}>
          <View style={styles.row}>
              <MaterialIcons name='cancel' size={30} color='red'/>
              <Text>Reject</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.mainContentContainer}>
      <View style={[styles.innerContainer, styles.marginBottom]}>
        <Text>All posts are approved by Family Admin</Text>
      </View>
      <FlatList
        data={approvePost}
        renderItem={renderItem}
        keyExtractor={item=> item.StatusID}
        extraData={navigation}
      />
      <Subscribe navigation={navigation}/>
    </View>
  );
}

export default ActivityStreamScreen
