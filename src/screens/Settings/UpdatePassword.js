import React,{useState} from "react"
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const UpdatePasswordScreen = ({navigation, route }) => {
    const [old, setOld] = useState('')
    const [newPass, setNewPass] = useState('')
    const [retype, setRetype] = useState('')

    const submitLocation = () => {
        if(old.length>0 && newPass.length>0 && retype.length>0)
            alert('Password Updated')
    }
    return (
    <SafeAreaView style={styles.mainContentContainer}>
    <View style={styles.innerContainer}>
       <View style={styles.card}>
            <TextInput
                style={styles.input}
                onChangeText={setOld}
                value={old}
                placeholder="Old password"
            />
            <TextInput
                style={styles.input}
                onChangeText={setNewPass}
                value={newPass}
                placeholder="Enter new password"
            />
            <TextInput
                style={styles.input}
                onChangeText={setRetype}
                value={retype}
                placeholder="Retype new password"
            />
        </View>
        
        <TouchableOpacity 
            onPress={submitLocation}>
                <Text style={styles.link}>Update</Text>
        </TouchableOpacity>
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
    )
}

export default UpdatePasswordScreen
