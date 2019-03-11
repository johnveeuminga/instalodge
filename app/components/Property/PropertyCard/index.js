import React, { Component } from 'react';
import { 
  Card,
  Text,
  CardItem,
} from 'native-base';
import { Image, StyleSheet } from 'react-native';

import { getPropertyFeaturedPhoto } from '../../../lib/properties';

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

  render () {
    const { property } = this.props;

    return (
      <Card>
        <CardItem cardBody>
          {this.state.featuredImg &&
            <Image 
              source={{ uri: this.state.featuredImg.imgPath }} 
              style={{height: 150, width: null, flex: 1}}
              resizeMode={'cover'}
            />
          }
        </CardItem>
        <CardItem header>
          <Text>{ property.name }</Text>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  propertyImageContainer: {

  }
})
