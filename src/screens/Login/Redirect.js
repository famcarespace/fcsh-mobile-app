import React, {useEffect} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import styles from '../../../assets/styles'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

const RedirectScreen = ({navigation,route}) => {
    const {authenticated} = useSelector(state=> state)

    useEffect(()=>{
        if(authenticated)
            navigation.navigate({name:'Enter App'})
    },[])
    return(
        <View style={styles.mainContentContainer}>
            <LinearGradient
                colors={['#65479c','#5cabe1','#5cc8ff','#65479c']}
                end={{x:0.5, y:1}}
                locations={[0.1, 0.4, 0.5,0.9]}
                style={{flex:1}}>
            <View style={[styles.innerContainer,{flex:1}]}>
                <Text style={[styles.h4,styles.marginBottom,{color:'#1f1f1f'}]}>Have an Account</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate({
                        name:'Login'
                    })}>
                        <Text style={{color:'#fff', fontSize:18}}>Login</Text>
                </TouchableOpacity>
                <View style={[styles.hr,{marginVertical:30}]}/>
                <Text style={[styles.h4,styles.marginBottom,{color:'#1f1f1f'}]}>Just Exploring</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate({
                        name:'Landing Screen'
                    })}>
                        <Text style={{color:'#fff', fontSize:18}}>Checkout the portal as a guest user</Text>
                </TouchableOpacity>
            </View>
            </LinearGradient>
        </View>
    )
}

export default RedirectScreen