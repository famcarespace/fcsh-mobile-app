import React from "react"
import { FlatList, View, Image, Text, TouchableOpacity, Modal } from "react-native"
import styles from "../../../assets/styles"
import {approvePost} from '../../utils/activity-stream.js'
import MediaSlider from "../../components/Activity/MediaSlider"
import {MaterialIcons} from '@expo/vector-icons'
import Subscribe from '../../components/Subscribe'


const ActivityStreamScreen = ({ navigation, route }) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  const renderItem = ({item}) => (
    <View style={[styles.card]}>
      <View style={[styles.row, styles.marginBottom,{alignItems:'center'}]}>
        <Image source={item.UserPic}
          style={styles.userAvatar}/>
        <View>
          <Text>{item.UserName}</Text>
          <Text style={styles.textMuted}>
            {item.RoleName}
          </Text>
        </View>
      </View>
      <View style={{marginLeft:-20}}>
        <MediaSlider mediaArray={item.media}/>
      </View>
      <Text style={{marginVertical:15}}>{item.StatusText}</Text>
      <View style={styles.hr}/>
      <View style={[styles.row,{justifyContent:'space-around', marginTop:20}]}>
        <TouchableOpacity onPress={()=> alert('Post will be added to activity stream')}>
          <View style={styles.row}>
            <MaterialIcons name='check-circle' size={30} color='green'/>
            <Text>Approve</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> alert('Post will be rejected')}>
          <View style={styles.row}>
              <MaterialIcons name='cancel' size={30} color='red'/>
              <Text>Reject</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.mainContentContainer}>
      <View style={[styles.innerContainer, styles.marginBottom]}>
      <TouchableOpacity style={[styles.row]}
        onPress={()=> setModalOpen(!modalOpen)}>
          <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
          <Text> Who approves new posts?</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={approvePost}
        renderItem={renderItem}
        keyExtractor={item=> item.StatusID}
        extraData={navigation}
      />
      <Subscribe navigation={navigation}/>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalVisible(!modalOpen);
        }}>
        <View style={styles.centered}>
          <View style={styles.card}>
            <Text style={styles.marginBottom}>
              One of the family members takes the role of family admin and is reponsible for approving new content
              and adding new members to the app.
            </Text>
          </View>
          <TouchableOpacity
              style={[styles.button,{marginTop:-20}]}
              onPress={() => setModalOpen(!modalOpen)}>
              <Text style={styles.buttonText}>Got it! Let's move on.</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default ActivityStreamScreen
