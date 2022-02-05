import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

import styles from "../../assets/styles"

const Subscribe = ({ navigation }) => {
    return (
      <View style={[styles.card, styles.pushBottom,{backgroundColor:'aliceblue'}]}>
        <Text>
          This is a demonstration.
          <TouchableOpacity 
          onPress={()=> navigation.navigate({
          name: 'Subscribe'})}>
            <Text style={[styles.link]}>Click Here</Text>
          </TouchableOpacity>
           to find out how to subscribe.
        </Text>
      </View>
    );
}

export default Subscribe
