import React, {useEffect, useState, useLayoutEffect} from "react"
import { View, Text, TouchableOpacity, Modal, Button,
  TextInput, Dimensions, Image, ScrollView} from "react-native"
import {AntDesign} from '@expo/vector-icons'
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectorScreen from "../Common/Selector"

const NewPostScreen = ({ navigation, route }) => {
    const [errors,setErrors] = useState('')
    const [loading, setLoading] = useState(true)
    const {authenticated, currUser} = useSelector(state=> state)
    const [statusText, setStatusText] = useState('')
    const [selectedMedia, setSelectedMedia] = useState([])
    const {width} = Dimensions.get('window');
    const [modalOpen, setModalOpen] = useState(false)
    const [resident, setResident]=useState('')
    const [residentList, setResidentList]=useState([])

    const handleSubmit = () => {
      setErrors('')
      if(statusText || selectedMedia.length>0){
        if(authenticated){
          setLoading(true)
          var formData = new FormData()
          if(selectedMedia.length>0) {
            selectedMedia.map((item,key)=>
              formData.append(`Media${key}`,item)
          )}
          formData.append('StatusText', statusText)
          formData.append('AssociatedPatientID', resident.UserId)
          axios.post('/new-post', formData)
          .then(res=>{
            setLoading(false)
            alert(res.data)
          })
          .catch(err=>{
            console.log(err)
            setErrors('Unable to post. Try again')
            setLoading(false)
          })
        }
        else alert('Post sent for approval to Family Admin')
      }   
      setSelectedMedia([])
      setStatusText('')
    }

    const removeSelected = (id) => {
      var temp = selectedMedia.filter(item => (item.id !== id))
      setSelectedMedia(temp)
    }

    useEffect(()=>{
      if(route.params?.selected){
        if(route.params.setting==='resident')
          setResident(route.params.selected)
        else setSelectedMedia(route.params.selected)
      }
    },[route.params?.selected])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button 
          disabled ={loading}
          onPress={handleSubmit} title="Post" />
        ),
      });
    }, [navigation, handleSubmit, statusText,selectedMedia, loading])

    useEffect(()=>{
      setLoading(true)
      setSelectedMedia([])
      setStatusText('')
      setResident('')
      axios.get('/resident-list')
      .then(res=>{
        setResidentList(res.data)
        setResident(res.data[0].FirstName+' '+res.data[0].LastName)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setErrors('Unable to get data. Try again')
        setLoading(false)       
      })
    },[])

    return (
      <View style={styles.mainContentContainer}>
        <ScrollView>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={[styles.marginBottom, styles.row]}
          onPress={()=> setModalOpen(!modalOpen)}>
            <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
            <Text> Who can post?</Text>
          </TouchableOpacity>
          <View style={[styles.card, styles.row]}>
            <Text><Text style={styles.h4}>Resident: </Text>{resident}</Text>             
              {residentList.length>1 && 
              <View style={[styles.row, styles.pushRight]}>
                <TouchableOpacity
                  disabled= {loading}
                  onPress={()=> navigation.navigate({
                    name: 'Selector',
                    params: { value: resident,
                      options:residentList.map(item=> item.FirstName+' '+item.LastName+'('+item.UserName+')'),
                      prevScreen:'New Post',
                      setting:'resident'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>}
          </View>
          <View style={styles.card}>
            <Text style={styles.h4}>Caption</Text>
            <TextInput                 
            style={styles.input}
            onChangeText={setStatusText}
            value={statusText}
            disabled ={ loading }
            placeholder="Say something..."/>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={[styles.h4,{flex:1}]}>Media</Text>
              <TouchableOpacity
                  disabled = {loading}
                  style={styles.pushRight}
                  onPress={()=> navigation.navigate({
                    name:'Album',
                  })}>
                  <Text style={styles.link}>Select Media</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {selectedMedia.map((item,key)=>(
                <View key={key} style={styles.grid}>
                  <Image source={{uri:item.uri}}
                    style={{ width: width / 4, height: width / 4 }}/>
                  <TouchableOpacity
                    style={{position:'absolute', top:4, right:4}}
                    onPress={()=> removeSelected(item.id)}>
                    <AntDesign name='minuscircleo' size={20} color='red'/>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
        </ScrollView>
        {!authenticated && <Subscribe navigation = {navigation}/>}
        <Modal
        animationType="fade"
        transparent={false}
        withOverlay={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalVisible(!modalOpen);
        }}>
        <View style={styles.centered}>
          <View style={styles.card}>
            <Text style={styles.marginBottom}> 
              One of the family members takes the role of family admin and is reponsible for approving new users and new content.
              Posts can be made by users authorized by the family admin, such as care staff, primary physician and friends.
            </Text>
          </View>
          <TouchableOpacity
              style={[styles.button,{marginTop:-20}]}
              onPress={() => setModalOpen(!modalOpen)}>
              <Text style={styles.buttonText}>Got it! Let's move on.</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    );
}

export default NewPostScreen
