import React from "react"
import { View, Text, Image } from "react-native"
import gateway from '../../../assets/images/gateway.png'
import styles from "../../../assets/styles"

const UserInfoScreen = ({ navigation, route }) => {
    return (
        <View
        style={[styles.card, styles.row]}>
        {<Image style={styles.imgIcon}
        source={gateway}/>}
        <View>
          <Text style={styles.cardHeader}>Gateway</Text>
          <Text style={styles.textMuted}>
            30:ae:7b:f1:e3:65
          </Text>
          <Text>
            <Text style={styles.textMuted}>IP: </Text>
            http://192.168.0.112
          </Text> 
        </View>
      </View>
    );
}

export default UserInfoScreen
