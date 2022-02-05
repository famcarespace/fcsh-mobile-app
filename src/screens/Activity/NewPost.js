import React, {useState} from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import {MaterialIcons} from '@expo/vector-icons'
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"

const NewPostScreen = ({ navigation, route }) => {

    const [statusText, setStatusText] = useState('')

    const handleSubmit = () => {
      alert('Post sent for approval to Family Admin')
    }

    return (
      <View style={styles.mainContentContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <Text style={styles.h4}>Media</Text>
              <TouchableOpacity 
                onPress={()=> navigation.navigate({
                  name:'Camera'
                })}>
                <MaterialIcons name='camera-alt' size={30} color='gray'/>
              </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.h4}>Caption</Text>
            <TextInput                 
            style={styles.input}
            onChangeText={setStatusText}
            value={statusText}
            placeholder="Say something..."/>
          </View>
          <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.link}>Post</Text>
            </TouchableOpacity>
        </View>
        <Subscribe navigation = {navigation}/>
      </View>
    );
}

export default NewPostScreen
