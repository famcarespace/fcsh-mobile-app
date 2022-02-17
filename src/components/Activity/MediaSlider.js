import React, {Component} from "react"
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { View, Dimensions, Image} from "react-native"
import styles from "../../../assets/styles"
import VideoSlide from "./VideoSlide"

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height/3
 
export class MediaSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentImage: 0,
          loading: [],
        }
        this._renderItem = this._renderItem.bind(this);
        this.onSnap = this.onSnap.bind(this);
    }

    onSnap(index) {
        this.setState({currentImage: index});
    }

    _renderItem({item, index}) {
        return (
        <View
            style={{
            position: 'relative',
            justifyContent: 'center',
            }}> 
            {(item.type==='video')?   
                <VideoSlide index={index} src={item.src}/>  
                :
                <Image
                    style={{
                        width: width,
                        height: height,
                        alignSelf: 'center',
                    }}
                    source={item.src}
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                />
            }
        </View>
        )
    }

    render(){
        return(
        <View>
            <Carousel
            layout={'default'}
            useScrollView={true}
            data={this.props.mediaArray}
            ref={(c) => (this._ref = c)}
            loop={false}
            enableSnap={true}
            autoplay={false}
            itemWidth={width}
            sliderWidth={width}
            loopClonesPerSide={5}
            renderItem={this._renderItem}
            onSnapToItem = {(index)=> this.onSnap(index)}
            />
            <Pagination
                borderRadius={2}
                dotsLength={this.props.mediaArray.length}
                activeDotIndex={this.state.currentImage}
                dotStyle={styles.dotStyle}
                dotColor={'#BDBDBD'}
                inactiveDotColor={'dodgerblue'}
                inactiveDotScale={0.8}
                carouselRef={this._ref}
                inactiveDotOpacity={0.8}
                tappableDots={!!this._ref}
                containerStyle={styles.paginationBoxStyle}
                onSnapToItem={(index) => this.onSnap(index)}
            />
      </View>
        )
    }

}

export default MediaSlider