import * as React from 'react';
import { Dimensions } from 'react-native';
import { Video } from 'expo-av'


const VideoSlide = ({src, index}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height/3
  return (
      <Video
        index={index}
        ref={video}
        style={{width:width, height:height}}
        source={src}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
  )
}

export default VideoSlide