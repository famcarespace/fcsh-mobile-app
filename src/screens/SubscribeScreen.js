import React from "react"
import { View, Text } from "react-native"

import styles from "../../assets/styles"

const SubscribeScreen = ({ navigation, route }) => {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>How to Subscribe</Text>
        </View>
      </View>
    );
}

export default SubscribeScreen
