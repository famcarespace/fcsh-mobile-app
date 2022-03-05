import * as React from 'react';
import { Dimensions } from 'react-native';
import { Video } from 'expo-av'
import { MEDIA_URL } from '../../redux/types';
import { useSelector } from 'react-redux';

const VideoSlide = ({blobName, StatusID, index}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height/3
  const {authenticated} = useSelector(state=>state)

  if(authenticated)
  return (
      <Video
        index={index}
        ref={video}
        style={{width:width, height:height}}
        source={{uri:`${MEDIA_URL}/${StatusID}-media/${blobName}`}}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
  )
  else return(
    <Video
    index={index}
    ref={video}
    style={{width:width, height:height}}
    source={blobName}
    useNativeControls
    resizeMode="contain"
    isLooping
    onPlaybackStatusUpdate={status => setStatus(() => status)}
  />
  )
}

export default VideoSlide