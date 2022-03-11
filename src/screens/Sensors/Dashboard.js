import React,{useEffect, useState} from "react"
import {Text, Image, Dimensions,
TouchableOpacity,
SafeAreaView, ActivityIndicator,
FlatList, View} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {overview} from '../../utils/device-data'
import axios from 'axios'
import { useSelector } from "react-redux"
import { getIcon } from "../../utils/functions"


const DashboardScreen = ({ navigation, route }) =>{
  const width = Dimensions.get('window').width-60 
  const {height} = Dimensions.get('window')
  const [errors,setErrors] = useState('')
  const [loading, setLoading] = useState(true)
  const {authenticated} = useSelector(state=> state)
  const [homeOverview, setHomeOverview] = useState([])
  
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = () =>{
    if(authenticated){
      setLoading(true)
      axios
      .get('/device-list')
      .then(res=>{
          setErrors('')
          setHomeOverview(res.data)
          setLoading(false)
      })
      .catch(err=>{
          console.log(err)
          setErrors('Unable to get data. Refresh the screen')
          setHomeOverview([])
          setLoading(false)
      })
    }
    else {
      setHomeOverview(overview)
      setLoading(false)
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
        style={[styles.card, styles.row,{width:width}]}
        onPress={()=> navigation.navigate({
          name: 'Grouped Status',
          params: { type: item.Category },
        })}
      >
       {<Image style={styles.imgIcon}
       source={getIcon(item.Category)}/>}
       <View>
        <Text style={[styles.h2]}>
          {item.DeviceCount}
        </Text>
        <Text>{item.Category}{item.DeviceCount===1?'':'s'}</Text> 
       </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        {!authenticated && 
          <Text style={styles.marginBottom}>List of sensors for the demonstration home.</Text>
        } 
        {errors!=='' && <Text style={styles.marginBottom}>{errors}</Text>} 
        {loading?<ActivityIndicator/>:
          <FlatList data={homeOverview}
          style={{height:height}}
          renderItem={renderItem}
          keyExtractor={item => homeOverview.indexOf(item)}
          extraData={navigation}
          ListEmptyComponent={<Text>No devices yet</Text>}
          onRefresh={()=>fetchData()}
          refreshing={loading}
          />
        }
      </View>
      {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
  )
}

export default DashboardScreen

