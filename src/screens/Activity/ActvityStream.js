import React,{useState, useEffect} from "react"
import { FlatList, View, Image, Text, Pressable, ActivityIndicator } from "react-native"
import styles from "../../../assets/styles"
import {posts} from '../../utils/activity-stream.js'
import MediaSlider from "../../components/Activity/MediaSlider"
import CommentFeed from "../../components/Activity/Comment"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector } from "react-redux"
import placeholder from '../../../assets/images/Placeholder.jpg'
import { MEDIA_URL } from "../../redux/types"


const ActivityStreamScreen = ({ navigation, route }) => {
  const [errors,setErrors] = useState('')
  const [loading, setLoading] = useState(true)
  const {authenticated} = useSelector(state=> state)
  const [feed, setFeed] = useState({
    posts:[],
    totalPosts:0
  })
  const [currentPage, setCurrentPage] = useState(1)
  var totalPages= Math.ceil(feed.totalPosts/10)
  var to = currentPage*10

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = () => {
    setErrors('')
    if(authenticated){
      setLoading(true)
      axios.get(`/posts-of-all-residents?page=${currentPage}`)
      .then(res=>{
        setFeed(res.data.posts)
        setErrors('')
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setErrors('Unable to get data. Try again')
        setLoading(false)
      })
    }
    else {
      setFeed(posts)
      setLoading(false)
    }
  }

  const renderPost = ({item}) => {
    return(
    <View style={[styles.card]}>
      <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
        <Image source={{
            uri: `${MEDIA_URL}/${item.StatusUserByID}-profile/Profile.jpeg`
          }}
          style={styles.userAvatar}/>
        <View>
          <Text>{item.UserName}</Text>
          <Text style={styles.textMuted}>
            {item.RoleName}
          </Text>
        </View>
      </View>
      {parseInt(item.Media)>0 &&
        <View style={{marginLeft:-20}}>
          <MediaSlider mediaArray={item.blobNames} StatusID={item.StatusID}
          authenticated={authenticated}/>
        </View>
      }
      <Text style={{marginVertical:15}}>{item.StatusText}</Text>
      <View style={styles.hr}/>
      <CommentFeed 
        StatusID={item.StatusID} dummyComments={item.Comments}/>
      <Pressable
        onPress={()=> navigation.navigate({
          name:'Comments',
          params:{item:item}
        })}>
        <View style={[styles.row,styles.centered, {marginTop:10}]}>
          <MaterialIcons name='comment' size={30} color='lightgray'
          style={{marginRight:10}}/>
          <Text style={styles.textMuted}>
            View all comments
          </Text>
        </View>
        </Pressable>
    </View>
    )
  }

  return (
    <View style={styles.mainContentContainer}>
      <View style={[styles.innerContainer, styles.marginBottom]}>
        <Text>See Photo/Video updates from care agency</Text>
        {errors !== '' && <Text style={{color:'tomato'}}>{errors}</Text>}
      </View>
      {loading? <ActivityIndicator/>:
          <FlatList
          data={feed}
          renderItem={renderPost}
          keyExtractor={item=> item.StatusID}
          extraData={navigation}
          ListEmptyComponent={<Text>No posts yet</Text>}
          onRefresh={()=>fetchData()}
          refreshing={loading}
          />
      }
    </View>
  );
}

export default ActivityStreamScreen
