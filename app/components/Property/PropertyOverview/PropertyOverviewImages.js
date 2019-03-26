import React from 'react';
import Swiper from 'react-native-swiper';
import { 
  View,
  StyleSheet,
  Image,
} from 'react-native';

const PropertyOverviewImages = ({ photos = [] }) => (
  <Swiper 
    height={250} 
    width={'100%'}
    autoplay={true}
    showsPagination={false}
    style={{ backgroundColor: '#ddd' }}
  >
    {
      photos.map( (photo, index) => (
        <View 
          style={styles.slide}
          key={index}
        >
          <Image
            source={{ uri: photo.imgUrl }}
            resizeMode={'cover'}
            style={styles.slideImg}
          />
        </View>
      ) )
    }
  </Swiper>
)

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    height: 220,
    backgroundColor: '#ddd',
  },
  slideImg: {
    flex: 1,
  },
});

export default PropertyOverviewImages;
