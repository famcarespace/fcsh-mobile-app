import React,{useState, useLayoutEffect} from "react"
import { View, SafeAreaView, TextInput, Button, ActivityIndicator, Text } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from "../../redux/actions"

const UpdatePasswordScreen = ({navigation, route }) => {
    const [old, setOld] = useState('')
    const [newPass, setNewPass] = useState('')
    const [retype, setRetype] = useState('')
    const {authenticated} = useSelector(state=>state)
    const [errors,setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={handleSubmit} title="Update" disabled={loading} />
          ),
        });
    }, [navigation, handleSubmit,old,newPass,retype])

    const handleSubmit = () => {
        if(old==='' || newPass===''||retype==='')
            setErrors('all fields are required')
        else if(newPass!==retype)
            setErrors('New password and retype password do not match')
        else{
            if(authenticated){
                setLoading(true)
                axios.put('/update-login',{
                    old:password.old,
                    current:password.newPass
                })
                .then(()=>{
                    setLoading(false)
                    dispatch(logoutUser(navigation))
                })
                .catch(err=>{
                    console.log(err)
                    setErrors('Unable to update. Try again.')
                    setLoading(false)
                })
            }
            else Alert.alert('Password updated')
        }
    }
    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
       <View style={styles.card}>
            <TextInput
                style={styles.input}
                onChangeText={setOld}
                value={old}
                secureTextEntry={true}
                autoCapitalize="none"                
                placeholder="Old password"
            />
            <TextInput
                style={styles.input}
                onChangeText={setNewPass}
                value={newPass}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Enter new password"
            />
            <TextInput
                style={styles.input}
                onChangeText={setRetype}
                value={retype}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Retype new password"
            />
            {errors!==''&&<Text style={{textAlign:'center', color:'tomato'}}>{errors}</Text>}
            {loading && <ActivityIndicator/>}
        </View>
    </View>
    {!authenticated && <Subscribe navigation={navigation}/>}
    </SafeAreaView>
    )
}

export default UpdatePasswordScreen
