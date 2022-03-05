import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import styles from '../../../assets/styles'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions'

const LogoutScreen = ({navigation,route}) => {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(logoutUser(navigation))
    },[])
    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={styles.innerContainer}>
                <Text>Safely Logging Out</Text>
            </View>
        </SafeAreaView>
    )
}

export default LogoutScreen