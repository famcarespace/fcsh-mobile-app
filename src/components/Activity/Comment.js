import React from "react"
import { View, Text, FlatList } from "react-native"

import styles from '../../../assets/styles'

const CommentFeed = ({ comments }) => {

    const renderItem= ({item}) => (
        <View>
            <View style={{marginVertical:10}}>
                <Text>
                    <Text style={{fontWeight:'600'}}>
                        {item.UserName+'  '}
                    </Text>
                    {item.CommentText}
                </Text>
            </View>
            <View style={styles.hr}/>
        </View>
    )
    return (
      <FlatList
        data={comments}
        keyExtractor={item=> item.Id}
        renderItem={renderItem}
      />
    )
}

export default CommentFeed
