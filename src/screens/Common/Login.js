import React,{useState} from 'react'
import {SafeAreaView, Text, View, 
    TextInput, Image, TouchableOpacity} from 'react-native'
import styles from '../../../assets/styles'
import logo from '../../../assets/images/logo.png'

const LoginScreen = ({navigation,route}) => {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={[styles.innerContainer,{flex:1}]}>
                <Image source={logo} style={{width:180,
                                        height:70,
                                        resizeMode:"contain"}}/>
                <TextInput style={styles.input}
                    onChangeText = {setUsername}
                    value={username}
                    placeholder = 'Username/email'/>
                <TextInput style={styles.input}
                    onChangeText = {setPassword}
                    value={password}
                    placeholder = 'Password'/>
                <TouchableOpacity
                    style={styles.marginBottom}
                    onPress={()=>handleSubmit}>
                        <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.pushBottom]}
                    onPress={()=>navigation.navigate({
                        name:'Enter app'
                    })}>
                        <Text style={styles.buttonText}>Not a registered user?</Text>
                        <Text style={styles.buttonText}>Tap to browse the app as guest user</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen