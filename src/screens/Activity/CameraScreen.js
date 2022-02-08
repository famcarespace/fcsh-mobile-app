import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';

const CameraScreen = ({navigation, route})=> {
  const [image, setImage] = useState(null);

  const pickImage = async () => {

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Go Back" onPress={()=>navigation.goBack()} />
    </View>
  );
}

export default CameraScreen