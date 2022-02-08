import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

import styles from "../../assets/styles"

const Subscribe = ({ navigation }) => {
    return (
      <View style={[styles.card, styles.pushBottom,{backgroundColor:'aliceblue'}]}>
        <Text>
          This sample data presents possibilities of the app.
          <TouchableOpacity 
          onPress={()=> navigation.navigate({
          name: 'Subscribe'})}>
            <Text style={{color:'dodgerblue'}}>Find out how to subscribe and setup your app</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
}

export default Subscribe
