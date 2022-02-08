import React,{useState, useEffect} from "react"
import { SafeAreaView, View, Text } from "react-native"
import styles from "../../../assets/styles"

const UserInfoScreen = () => {

    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
            <Text>
              <Text style={styles.textMuted}>Username: </Text>
              guestuser
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Location: </Text>
              New Hampshire
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Contact: </Text>
              +1-(321)-236-4777
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Email: </Text>
              info@familycarespace.com
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Role: </Text>
              Family Admin
          </Text> 
        </View>
      </View>
      </SafeAreaView>
    );
}

export default UserInfoScreen
