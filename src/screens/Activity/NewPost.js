import React, {useEffect, useState, useLayoutEffect} from "react"
import { View, Text, TouchableOpacity, Modal, Button,
  TextInput, Dimensions, Image, ScrollView} from "react-native"
import {AntDesign} from '@expo/vector-icons'
import styles from "../../../assets/styles"
import Subscribe from "../../components/Subscribe"
import {MaterialIcons} from '@expo/vector-icons'

const NewPostScreen = ({ navigation, route }) => {

    const [statusText, setStatusText] = useState('')
    const [selectedMedia, setSelectedMedia] = useState([])
    const {width} = Dimensions.get('window');
    const [modalOpen, setModalOpen] = useState(false)

    const handleSubmit = () => {
      if(statusText || selectedMedia.length>0)
      alert('Post sent for approval to Family Admin')
      setSelectedMedia([])
      setStatusText('')
    }

    const removeSelected = (id) => {
      var temp = selectedMedia.filter(item => (item.id !== id))
      setSelectedMedia(temp)
    }

    useEffect(()=>{
      if(route.params?.selected)
        setSelectedMedia(route.params.selected)
    },[route.params?.selected])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={handleSubmit} title="Post" />
        ),
      });
    }, [navigation])

    return (
      <View style={styles.mainContentContainer}>
        <ScrollView>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={[styles.marginBottom, styles.row]}
          onPress={()=> setModalOpen(!modalOpen)}>
            <MaterialIcons name='info-outline' color='dodgerblue' size={20}/>
            <Text> Who can post?</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.h4}>Caption</Text>
            <TextInput                 
            style={styles.input}
            onChangeText={setStatusText}
            value={statusText}
            placeholder="Say something..."/>
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={[styles.h4,{flex:1}]}>Media</Text>
              <TouchableOpacity
                  style={styles.pushRight}
                  onPress={()=> navigation.navigate({
                    name:'Album',
                  })}>
                  <Text style={styles.link}>Select Media</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {selectedMedia.map((item,key)=>(
                <View key={key} style={styles.grid}>
                  <Image source={{uri:item.uri}}
                    style={{ width: width / 4, height: width / 4 }}/>
                  <TouchableOpacity
                    style={{position:'absolute', top:4, right:4}}
                    onPress={()=> removeSelected(item.id)}>
                    <AntDesign name='minuscircleo' size={20} color='red'/>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
        </ScrollView>
        <Subscribe navigation = {navigation}/>
        <Modal
        animationType="fade"
        transparent={false}
        withOverlay={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalVisible(!modalOpen);
        }}>
        <View style={styles.centered}>
          <View style={styles.card}>
            <Text style={styles.marginBottom}>
              Posts can be made by care providers from care agency, administrators from care agency, or family members. 
              One of the family members takes the role of family admin and is reponsible for approving new content.
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

export default NewPostScreen
