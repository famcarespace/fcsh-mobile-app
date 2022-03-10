import React,{useState, useEffect} from 'react'
import {SafeAreaView, Text, View,TouchableOpacity} from 'react-native'
import styles from '../../../assets/styles'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'
import { MaterialIcons } from '@expo/vector-icons'

const AcceptTermsScreen = ({navigation,route}) => {
    const [checked,setChecked] = useState(false)
    const [result, setResult] = useState(null)

    const handlePressureButtonAsync = async()=> {
        try{
            let result = await WebBrowser.openBrowserAsync(
            'https://familycarespacestore.com/privacy-policy'
            )
            setResult(result)
        } catch(err){console.log(err)}
    }

    const handleChange = ()=>{
        axios.put('/accept-terms')
        .then()
        .catch(err=> console.log(err)) 
        setChecked(!checked)
        navigation.navigate({name:'Enter app'})
    }

    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={[styles.innerContainer,{flex:1}]}>
                <Text style={styles.h4, styles.marginBottom}>Privacy Policy and Terms</Text>
                <TouchableOpacity 
                    onPress={handlePressureButtonAsync}>
                    <Text style={{color:'dodgerblue'}}>Click here to read the policy and terms</Text> 
                </TouchableOpacity>
                <View style={[styles.row,{marginVertical:40}]}>
                    <TouchableOpacity
                        onPress={handleChange}>
                        {checked?
                            <MaterialIcons name='check-box' size={24} color='dodgerblue'/>
                            :   
                            <MaterialIcons name='check-box-outline-blank'
                            size={24} color='lightgrey'/>
                        }
                    </TouchableOpacity>
                    <Text>I have read and aceept the terms</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default AcceptTermsScreen