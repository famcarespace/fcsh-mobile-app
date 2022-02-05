import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import styles from '../../../assets/styles'

const CommentForm = ({comments, setCommentFeed}) => {
    const [newComment, setNewComment] = React.useState('')

    const handleSubmit = () => {
        setCommentFeed([...comments,{
            CommentText:newComment,
            Id: Math.random(),
            UserName:'Guest User'
        }])
        alert('Thanks! Subscribe the App')
    }
    
    return (
        <View style={styles.row}>
            <TextInput                 
            style={styles.input}
            onChangeText={setNewComment}
            value={newComment}
            placeholder="Add a comment"/>
            <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.link}>Post</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CommentForm
