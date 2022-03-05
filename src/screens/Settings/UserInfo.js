import React from "react"
import { SafeAreaView, View, Text } from "react-native"
import styles from "../../../assets/styles"

const UserInfoScreen = ({navigation, route}) => {
    const {user} = route.params

    return (
      <SafeAreaView style={styles.mainContentContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
            <Text>
              <Text style={styles.textMuted}>Username: </Text>
              {user.UserName}
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Location: </Text>
              {user.Location}
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Contact: </Text>
              {user.Phone}
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Email: </Text>
              {user.Email}
          </Text> 
          <Text>
              <Text style={styles.textMuted}>Role: </Text>
              {user.RoleName}
          </Text> 
        </View>
      </View>
      </SafeAreaView>
    );
}

export default UserInfoScreen
