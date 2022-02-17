import React,{useState, useLayoutEffect} from "react"
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Modal, Button } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'

const AddUsersScreen = ({navigation, route }) => {
    const [count, setCount] = useState(2)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [result, setResult] = React.useState(null)

    const handleSubmit = () => {
        if(email==='' || phone===''||firstname==='' || lastname===''){
            alert('incomplete details')
        }
        else setCount(count-1)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={handleSubmit} title="Add" />
          ),
        });
    }, [navigation, handleSubmit,count,email,phone,firstname,lastname])

    const handlePressureButtonAsync = async()=> {
      let result = await WebBrowser.openBrowserAsync(
        'https://familycarespacestore.com/product/family-portal'
      )
      setResult(result)
    }

    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.marginBottom, styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> How to add members?</Text>
        </TouchableOpacity>
        {count>0?
        <View style={{width:'100%', alignItems:'center'}}>
            <View style={styles.card}>
                <Text>You can add {count} member(s)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="Phone"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstname}
                    placeholder="First Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastname}
                    placeholder="Last Name"
                />
            </View>
        </View>:
        <View>
            <Text>You cannot add any more members.</Text>
        </View>}
    </View>
    <Subscribe navigation={navigation}/>
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
