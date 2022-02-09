import React from "react"
import { View, Text, Pressable } from "react-native"
import styles from "../../assets/styles"
import * as WebBrowser from 'expo-web-browser'

const Subscribe = ({ navigation }) => {
    const [result, setResult] = React.useState(null)

    const handlePressureButtonAsync = async()=> {
      let result = await WebBrowser.openBrowserAsync(
        'https://familycarespacestore.com'
      )
      setResult(result)
    }

    return (
      <View style={[styles.card, styles.pushBottom,{backgroundColor:'aliceblue'}]}>
        <Text>
          This sample data exhibits power of the Family Portal.
        </Text>
        <Text>To setup your account, visit 
          <Pressable 
            onPress={handlePressureButtonAsync}>
              <Text style={{color:'dodgerblue'}}> familycarespacestore</Text> 
          </Pressable>
        </Text>
      </View>
    );
}

export default Subscribe
