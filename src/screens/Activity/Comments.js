import React,{useState, useEffect} from "react"
import { SafeAreaView, View, Text, Image, ActivityIndicator, FlatList, TextInput, TouchableOpacity} from "react-native"
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import { MEDIA_URL } from "../../redux/types"
import axios from 'axios'
import { useSelector } from "react-redux"

const CommentsScreen = ({ navigation, route }) => {
    const {item} = route.params
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [newComment, setNewComment] = React.useState('')
    const [errors, setErrors] = useState('')
    const {authenticated} = useSelector(state=>state)

    useEffect(()=>{
        refreshFeed()
    },[])

    const refreshFeed = () =>{
        if(authenticated){
            setLoading(true)
            axios.get(`/comments/${item.StatusID}`)
            .then(res=>{
                setComments(res.data)
                setLoading(false)
                setErrors('')
            })
            .catch(err=>{
                console.log(err)
                setLoading(false)
                setErrors('Unable to get data. Try again.')
            })
        }
        else {
            setComments(item.Comments)
            setLoading(false)
        }
    }

    const handleSubmit = () => {
        if(newComment!==''){
            if(authenticated){
                setLoading(true)
                axios
                .post('/new-comment', {
                    postId: item.StatusID,
                    body: newComment
                    },
                {
                'Content-Type':'application/json',
                'Content-Length':'<calculated when request is sent>'
                })
                .then(res=>{
                    refreshFeed()
                    setErrors('')
                })
                .catch(err=>{
                    console.log(err)
                    setErrors('Unable to process request. Try again.')
                    setLoading(false)
                })
            }
            else setComments([...comments, {
                FirstName:'Guest',
                LastName:'User',
                CommentText:newComment,
                CommentId:40
            }])
        }
        setNewComment('')
    }

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

    return (
      <SafeAreaView style={styles.mainContentContainer}>
        <View style={[styles.card]}>
            <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
                <Image source={{uri:`${MEDIA_URL}/${item.StatusUserByID}-profile/Profile.jpeg`}}
                style={[styles.userAvatar,{flex:1}]}/>
                <Text style={{flex:6}}>{item.StatusText}</Text>
            </View>
            <View style={styles.hr}/>
            <FlatList
                data={comments}
                keyExtractor={item=> item.CommentID}
                renderItem={renderItem}
            />
            <View style={styles.row}>
                <TextInput                 
                style={[styles.input,{flex:5}]}
                onChangeText={setNewComment}
                value={newComment}
                placeholder="Add a comment"/>
                <TouchableOpacity 
                    disabled={loading}
                    onPress={handleSubmit}
                    style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={styles.link}>Post</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator/>}
        </View>
        <Subscribe navigation={navigation}/>
        </SafeAreaView>
    );
}

export default CommentsScreen
