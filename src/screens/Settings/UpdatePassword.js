import React,{useState, useLayoutEffect} from "react"
import { View, SafeAreaView, TextInput, Button } from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const UpdatePasswordScreen = ({navigation, route }) => {
    const [old, setOld] = useState('')
    const [newPass, setNewPass] = useState('')
    const [retype, setRetype] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={handleSubmit} title="Update" />
          ),
        });
    }, [navigation, handleSubmit,old,newPass,retype])

    const handleSubmit = () => {
        if(old==='' || newPass===''||retype==='')
            alert('all fields are required')
        else  alert('Password Updated')
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
    </View>
    <Subscribe navigation={navigation}/>
    </SafeAreaView>
    )
}

export default UpdatePasswordScreen
