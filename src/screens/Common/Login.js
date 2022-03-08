import React,{useState} from 'react'
import {SafeAreaView, Text, View, ActivityIndicator,
    TextInput, Image, TouchableOpacity} from 'react-native'
import styles from '../../../assets/styles'
import logo from '../../../assets/images/logo.png'
import axios from 'axios'
import { setCurrUser, interpretErrorCode } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const LoginScreen = ({navigation,route}) => {
    const [name,setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = () =>{
        if(name!=='' && password!==''){
            setError('')
            setLoading(true)
            axios.post('/login',{name,password})
            .then(res=>{
                setLoading(false)
                if(res.data.error)
                    setError(res.data.msg)
                else {
                    dispatch(setCurrUser(`Bearer ${res.data.token}`))
                     navigation.navigate({
                        name:'Enter app'
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                if (err.response?.status) setError(interpretErrorCode(err.response.status))
                setLoading(false)
            })
        }   
    }

    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={[styles.innerContainer,{flex:1}]}>
                <Image source={logo} style={{width:180,
                                        height:70,
                                        resizeMode:"contain"}}/>
                <View style={{width:'80%'}}>
                    <TextInput style={styles.input}
                        onChangeText = {setName}
                        value={name}
                        autoCapitalize="none"
                        placeholder = 'Username/email'/>
                    <TextInput style={styles.input}
                        onChangeText = {setPassword}
                        value={password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder = 'Password'/>
                </View>
                <TouchableOpacity
                    style={styles.marginBottom}
                    disabled={loading}
                    onPress={handleSubmit}>
                        <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
                {error!=='' && <Text style={{color:'tomato'}}>{error}</Text>}
                {loading && <ActivityIndicator size="small"/> }
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen