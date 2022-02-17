import React from "react"
import { View, Button } from "react-native"
import styles from "../../../assets/styles"
import ImageBrowser from "../../components/MultiImagePicker/ImageBrowser"

const ImageGalleryScreen = ({ navigation, route }) => {
    var selected= []

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button title="Select"
            onPress={()=> navigation.navigate({
                name:'New Post',
                params:{
                    selected:selected
                }
            })}
            />
          ),
        })
      }, [navigation]);

    return (
      <View style={styles.mainContentContainer}>
          <ImageBrowser
            max={10}
            callback={(callback)=> {
                selected = callback._W
            }}
            />
      </View>
    );
}

export default ImageGalleryScreen
