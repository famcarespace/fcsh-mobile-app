import React, {Component} from "react"
import Carousel, {Pagination} from 'react-native-snap-carousel'
//https://github.com/intellidev1991/react-native-image-slider-box/blob/master/dist/SliderBox.js
import { View, Dimensions, Image, Text, SafeAreaView} from "react-native"
import styles from "../../../assets/styles"
import { Video } from 'expo-av'
import screen1 from '../../../assets/images/activityStream.mp4'
import screen2 from '../../../assets/images/smart-devices-notification.png'
import screen3 from '../../../assets/images/share-with-everyone.png'
import { connect } from "react-redux"

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height/2
 
export class LandingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          currentImage:0,
          carouselItems: [
            {
                id:1,
                src:screen1,
                type:'video',
                caption:`Appropriate and timely alerts create a safer place for loved ones.\n
Families have peace of mind knowing how their loved one is doing.\n
Photo/Video updates from care providers ensure transparency of care.`,
            },
            {
                id:2,
                type:'image', 
                src: screen2,
                caption:`The non-intrusive smart sensors detect many situations and activities.\n
Customizable alerts are sent to designated members when an action is required.\n
Loved ones can stay at home longer and safer.\n
Pre-empt unwanted situations from occurring.`,
            },
            {
                id:3,
                type:'image', 
                src: screen3,
                caption:`Easily add more users such as care providers, primary physicians, friends and family.\n
Easily bring everyone together on the same page.\n
The ultimate platform designed for seniors aging in place at home.`,
            },
            {
                id:4,
                type:'text',
                caption:''
            }
        ]
      }
      this._renderItem = this._renderItem.bind(this);
      this.onSnap = this.onSnap.bind(this);
      this._ref=null
      this._videoref=null
    }

    componentDidMount(){
        if(this.props.authenticated){
            this.props.navigation.navigate({
                name:'Enter App'
            })
        }
    }
    
    onSnap(index) {

        if(index===3){
            this.props.navigation.navigate({
                name:'Enter App'
            })
        }
        else this.setState({currentImage: index});
    }

    _renderItem({item, index}) {
        return (
        <View style={{
            flex:1,
            justifyContent:'center'
        }}>
            <Text style={{
                paddingHorizontal:25,
                marginBottom:15
               // position:'absolute',
               // top:'10%'
            }}>
                {item.caption}
            </Text>
            {(item.type==='video')?   
                 <Video
                 index={index}
                 ref={(v) => (this._videoref = v)}
                 style={{width:width, height:height}}
                 source={item.src}
                 resizeMode="contain"
                 shouldPlay={true}
                 isLooping={true}
               />
                :
                <Image
                    style={{
                        width: width,
                        height: height,
                    }}
                    source={item.src}
                    resizeMethod='resize'
                    resizeMode='contain'
                />
            }
        </View>
        )
    }

    render(){
        return(
        <SafeAreaView style={styles.mainContentContainer}>
            <Carousel
            layout='default'
            useScrollView={true}
            data={this.state.carouselItems}
            ref={(c) => (this._ref = c)}
            loop={false}
            enableSnap={true}
            autoplay={false}
            itemWidth={width}
            sliderWidth={width}
            sliderHeight={height}
            renderItem={this._renderItem}
            onSnapToItem = {(index)=> this.onSnap(index)}
            />
            <Pagination
                borderRadius={2}
                dotsLength={3}
                activeDotIndex={this.state.currentImage}
                dotStyle={styles.dotStyle}
                dotColor={'#BDBDBD'}
                inactiveDotColor={'dodgerblue'}
                inactiveDotScale={0.8}
                carouselRef={this._ref}
                inactiveDotOpacity={0.8}
                tappableDots={!!this._ref}
                containerStyle={styles.paginationBoxStyle}
            />
      </SafeAreaView>
        )
    }

}

function mapStateToProps(state){
    return {authenticated: state.authenticated}
}

export default connect(mapStateToProps)(LandingScreen)
