import React,{useState, useLayoutEffect, useEffect} from "react"
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Modal, Button, ActivityIndicator, Alert } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import {useSelector} from 'react-redux'
import axios from "axios"

const AddUsersScreen = ({navigation, route }) => {
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('subscriber')
    const [modalOpen, setModalOpen] = useState(false)
    const [result, setResult] = React.useState(null)
    const {authenticated} = useSelector(state=>state)
    const [errors,setErrors] = useState('')
    const [loading, setLoading] = useState(true)

    const handleSubmit = () => {
        if(email==='' || username===''||firstname==='' || lastname===''|| location===''||phone==='')
            Alert.alert('','Incomplete details')
        else if(username.includes(' '))
            Alert.alert('','Username cannot have blank spaces')
        else {
          if(authenticated){
            setLoading(true)
            axios.post('/new-user',{ user:{
              username:username,
              firstname:firstname,
              lastname:lastname,
              location:location,
              phone:phone,
              email:email,
              role:role,}
            })
            .then(res=>{
              setCount(res.data.NumberOfAccounts)
              setLoading(false)
              setErrors('')
              clearFields()
              Alert.alert('User Added','Credentials will be emailed to given ID')
            })
            .catch(err=>{
              console.log(err)
              setLoading(false)
              setErrors('Unable to update. Try again.')
            })            
          }
          else setCount(count-1)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button 
            disabled={loading}
            onPress={handleSubmit} title="Add" />
          ),
        });
    }, [navigation,handleSubmit,count,email,username,firstname,lastname,phone,location,role,loading])

    useEffect(()=>{
      if(authenticated){
        setLoading(true)
        axios.get('/new-accounts-count')
        .then(res=>{
          setCount(res.data.NumberOfAccounts)
          setLoading(false)
          setErrors('')
        })
        .catch(err=>{
          console.log(err)
          setLoading(false)
          setCount(0)
          setErrors('Unable to update. Try again.')
        })
      } else setCount(2)
      return ()=> clearFields()
    },[])

    useEffect(()=>{
      if(route.params?.selected)
        setRole(route.params.selected)
    },[route.params?.selected])


    const handlePressureButtonAsync = async()=> {
      let result = await WebBrowser.openBrowserAsync(
        'https://familycarespacestore.com/product/family-portal'
      )
      setResult(result)
    }

    function clearFields(){
      setEmail('')
      setFirstName('')
      setLastName('')
      setLocation('')
      setPhone('')
      setUsername('')
      setRole('subscriber')
    }

    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> How to add members?</Text>
        </TouchableOpacity>
        {
        count>0?
        <View style={{width:'100%', alignItems:'center'}}>
            <View style={styles.card}>
                <Text style={{textAlign:'center'}}>You can add {count} member(s)</Text>
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="Phone"
                />  
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                />
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstname}
                    placeholder="First Name"
                />
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastname}
                    placeholder="Last Name"
                />
                <TextInput
                    disabled={loading}
                    style={styles.input}
                    onChangeText={setLocation}
                    value={location}
                    placeholder="Location"
                />             
            </View>
            {/***** Role ****/}
            <View style={[styles.card, styles.row,{alignItems:'center'}]}>
              <Text style={[styles.textMuted,{flex:1}]}>
                Role
              </Text>
              <View style={[styles.row, styles.pushRight,{zIndex:-1}]}>
                <Text>{role}</Text>
                <TouchableOpacity
                  disabled={loading}
                  onPress={()=> navigation.navigate({
                    name: 'Zone Selector',
                    params: { value: role,
                      options:['member','subscriber'],
                      prevScreen:'Add Members',
                      setting:'newuser'},
                  })}>
                  <MaterialIcons name='navigate-next' size={30} color='dodgerblue'/>
                </TouchableOpacity>
              </View>
            </View> 
        </View>:
        !loading &&<View>
            <Text>You cannot add any more members.</Text>
        </View>}
    {loading&& <ActivityIndicator/>}
    {errors!=='' && <Text style={{color:'tomato'}}>{errors}</Text>}
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
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
              One of the group members takes the role of family admin and can add new members to the portal.
            </Text>
            <Text style={styles.marginBottom}>
                To do this, family admin needs to buy user accounts from  <TouchableOpacity 
            onPress={handlePressureButtonAsync}>
              <Text style={{color:'dodgerblue'}}> familycarespacestore.com</Text> 
          </TouchableOpacity>
            </Text>
            <Text style={styles.marginBottom}>
                Example: If family admin buys 2 user accounts, they get the option to add 2 members from this screen.
            </Text>
          </View>
          <TouchableOpacity
              style={[styles.button,{marginTop:-20}]}
              onPress={() => setModalOpen(!modalOpen)}>
              <Text style={styles.buttonText}>Got it! Let's move on.</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
    )
}

export default AddUsersScreen
