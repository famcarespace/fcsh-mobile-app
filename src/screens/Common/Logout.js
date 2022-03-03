import React from 'react'
import {SafeAreaView, Text, View, 
    TouchableOpacity} from 'react-native'
import styles from '../../../assets/styles'

const LogoutScreen = ({navigation,route}) => {
    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={[styles.innerContainer,{flex:1}]}>
                <Text style={[styles.h4,styles.marginBottom]}>Thank you for using Family Home Portal</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate({
                        name:'Login'
                    })}>
                        <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
                <View style={[styles.hr,{marginVertical:30}]}/>
                <TouchableOpacity
                    onPress={()=>navigation.popToTop()}>
                        <Text style={styles.link}>Checkout the portal as a guest user</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default LogoutScreen