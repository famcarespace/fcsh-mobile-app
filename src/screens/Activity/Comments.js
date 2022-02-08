import React from "react"
import { SafeAreaView, View, Text, Image} from "react-native"
import styles from "../../../assets/styles"
import CommentFeed from "../../components/Activity/Comment";
import Subscribe from "../../components/Subscribe"
import CommentForm from "../../components/Activity/CommentForm"

const CommentsScreen = ({ navigation, route }) => {
    const {item} = route.params
    const [commentFeed, setCommentFeed] = React.useState(item.Comments)
    return (
      <SafeAreaView style={styles.mainContentContainer}>
            <View style={[styles.card]}>
                <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
                    <Image source={item.UserPic}
                    style={styles.userAvatar}/>
                    <Text>{item.StatusText}</Text>
                </View>

            <View style={styles.hr}/>
            <CommentFeed comments={commentFeed}/>
            <CommentForm comments={commentFeed} setCommentFeed={setCommentFeed}/>

        </View>
        <Subscribe navigation={navigation}/>
        </SafeAreaView>
    );
}

export default CommentsScreen
