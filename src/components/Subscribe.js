import React from "react"
import { View, Text, Pressable } from "react-native"
import styles from "../../assets/styles"
import * as WebBrowser from 'expo-web-browser'
import {MaterialIcons} from '@expo/vector-icons'

const Subscribe = ({ navigation }) => {
    const [result, setResult] = React.useState(null)
    const [visible, setVisible] = React.useState(true)

    const handlePressureButtonAsync = async()=> {
      let result = await WebBrowser.openBrowserAsync(
        'https://familycarespacestore.com'
      )
      setResult(result)
    }
    if(visible)
    return (
      <View style={[styles.card, styles.pushBottom,{backgroundColor:'aliceblue'}]}>
        <Pressable
          onPress={()=> setVisible(false)}
          style={{position:'absolute', right:20}}>
            <MaterialIcons name='cancel' color='tomato' size={20}/>
          </Pressable>
        <Text>
          This is sample data. To unleash the full power of Family Portal, visit 
          <Pressable 
            onPress={handlePressureButtonAsync}>
              <Text style={{color:'dodgerblue'}}> familycarespacestore</Text> 
          </Pressable>
        </Text>
      </View>
    );
    else return null
}

export default Subscribe
