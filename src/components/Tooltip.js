import React, {useState} from 'react'
import { View, Pressable, Dimensions,
    StyleSheet, Text,} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

const {width} = Dimensions.get('window')

const Tooltip = ({msg}) => {
    const [visible, setVisible] = useState(false)

    return(
        <Pressable
         onPress={()=> setVisible(!visible)}>
            <MaterialIcons name='info-outline' color='gray' size={15}
                     style={styles.tooltipIcon}/>
            {visible && 
            <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{msg}</Text>
            </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tooltip:{
        position:'absolute',
        left:20,
        top:-5,
        backgroundColor:'aliceblue',
        padding:5,
        borderColor:'lightblue',
        borderWidth:1,
        width:width/2,
        borderRadius:2,
        elevation:3,
        zIndex:1,
    },
    tooltipText: {
        fontSize:12,
    },
    tooltipIcon:{
        marginLeft:1
    }
})

export default Tooltip