import React,{useEffect, useState} from "react"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import styles from '../../../assets/styles'
import axios from 'axios'
import { useSelector } from "react-redux"

const CommentFeed = ({ StatusID, dummyComments }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const {authenticated} = useSelector(state=> state)

    useEffect(()=>{
        if(authenticated){
            setLoading(true)
            axios.get(`/comments/${StatusID}`)
            .then(res=>{
                setComments(res.data.slice(0,3))
                setLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setLoading(false)
            })
        } else {
            setComments(dummyComments)
            setLoading(false)
        }
    },[])

    const renderItem= ({item}) => (
        <View>
            <View style={{marginVertical:10}}>
                <Text>
                    <Text style={{fontWeight:'600'}}>
                        {item.FirstName+'  '+item.LastName+' '}
                    </Text>
                    {item.CommentText}
                </Text>
            </View>
            <View style={styles.hr}/>
        </View>
    )

    if(loading)
        return <ActivityIndicator/>
    else
    return (
      <FlatList
        data={comments}
        keyExtractor={item=> item.CommentID}
        renderItem={renderItem}
      />
    )
}

export default CommentFeed
