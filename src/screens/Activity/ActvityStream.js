import React from "react"
import { FlatList, View, Image, Text, Pressable } from "react-native"
import styles from "../../../assets/styles"
import {posts} from '../../utils/activity-stream.js'
import MediaSlider from "../../components/Activity/MediaSlider"
import CommentFeed from "../../components/Activity/Comment"
import {MaterialIcons} from '@expo/vector-icons'


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
      <CommentFeed 
        comments={item.Comments.slice(0,3)}/>
      <Pressable
        onPress={()=> navigation.navigate({
          name:'Comments',
          params:{item:item}
        })}>
          <View style={[styles.row,styles.centered, {marginTop:10}]}>
          <MaterialIcons name='comment' size={30} color='lightgray'
          style={{marginRight:10}}/>
          <Text style={styles.textMuted}>
            {item.Comments.length<3?
            'Comment':
            `View all ${item.Comments.length} comments`}
        </Text>
        </View>
        </Pressable>

    </View>
  )

  return (
    <View style={styles.mainContentContainer}>
      <View style={[styles.innerContainer, styles.marginBottom]}>
        <Text>See Photo/Video updates from care agency</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item=> item.StatusID}
        extraData={navigation}
      />

    </View>
  );
}

export default ActivityStreamScreen
