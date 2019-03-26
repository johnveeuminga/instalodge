import React, { Component } from 'react';
import { 
  Card,
  Text,
  CardItem,
  Icon,
} from 'native-base';
import { 
  Image, 
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { getPropertyFeaturedPhoto } from '../../lib/properties';
import material from '../../../native-base-theme/variables/material';

export default class PropertyCard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      featuredImg: null
    }
  }

  componentDidMount() {
    this.getFeaturedImage();
  }

  async getFeaturedImage () {
    const { property } = this.props;

    const featuredImg = await getPropertyFeaturedPhoto(property.uid);

    console.log(featuredImg);

    this.setState((prevState) => {
      return {
        ...prevState,
        featuredImg,
      }
    })
  }

  propertyClicked () {
    this.props.onPropertyClick(this.props.property.uid);
  }

  render () {
    const { property, onPropertyClick } = this.props;

    const CardImg = () => {
      if (this.state.featuredImg) {
        return (
          <Image 
            source={{ uri: this.state.featuredImg.imgPath }} 
            style={{height: 215, width: null, flex: 1}}
            resizeMode={'cover'}
          />
        )
      }

      return (
        <View style={styles.propertyImageContainer}></View>
      )
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => this.propertyClicked() }
      >
        <Card>
          <CardItem 
            cardBody
            style={styles.propertyImageContainer}
          >
            <CardImg />
          </CardItem>
          <CardItem
            style={{ paddingBottom: 5, flexWrap: 'wrap' }}
          >
            <Text style={ styles.propertyHead }>{ property.name }</Text>
            <Text style={{ fontWeight: '700', width: '100%' }}>{ property.location }</Text>
          </CardItem>
          <CardItem
            style={{ flexWrap: 'wrap' }}
          >
            <Text>₱{ property.rate } per night</Text>
            <View style={ styles.propertyRating }>
              {
                [...Array(Math.round(property['average_rating']))].map((_, index) => (
                  <Icon
                    name='star'
                    style={ styles.propertyRatingStar }
                    key={ index }
                  />
                )
              ) }
            </View>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  propertyImageContainer: {
    height: 215,
    width: '100%',
    backgroundColor: '#ddd',
  },
  propertyHead: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    color: material.brandPrimary,
  },
  propertyRating: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  propertyText: {
    marginBottom: 10,
    width: '100%',
  },
  propertyRatingStar: {
    color: material.brandSecondary,
    fontSize: 18,
    marginRight: 0,
    width: null,
  },
})
