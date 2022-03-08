import React from "react"
import {SafeAreaView, Text, 
    View, Pressable,
Button} from "react-native"
import styles from "../../../assets/styles"
import { MaterialIcons } from '@expo/vector-icons'




const CheckboxScreen = ({ navigation, route }) => {
    const { value, options, setting } = route.params
    const [checked, setChecked] = React.useState(value)

    const handleChange = (key) => {
        let temp = {...checked}
        temp[key] = temp[key]==='1'?'0':'1'
        setChecked(temp)
    }

    return(
        <SafeAreaView style={styles.mainContentContainer}>
            <View style={styles.card}>
                {options.map((opt, key)=>(
                    <View key={key} style={[styles.row, styles.marginBottom]}>
                    <Text style={{flex:1}}>{opt}</Text>
                        <View style={[styles.row, styles.pushRight]}>
                            <Pressable
                                key={key}
                                onPress={()=>handleChange(key)}>
                                {checked[key]==='1'?
                                    <MaterialIcons name='check-box' size={24} color='dodgerblue'/>
                                    :   
                                    <MaterialIcons name='check-box-outline-blank'
                                    size={24} color='lightgrey'/>
                                }
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
            <Button
                title="Back"
                onPress={()=>{
                    navigation.navigate({
                        name:'New Alert',
                        params: {checked: Object.values(checked),
                        setting:setting},
                        merge:true
                    })
                }}
            />
        </SafeAreaView>
  )
}

export default CheckboxScreen
