import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Content,
  Footer,
  Icon,
  Button,
  Text,
} from 'native-base';
import { 
  View,
} from 'react-native';
import FullScreenLoader from '../components/general/FullScreenLoader';
import { getPropertyPhotos, getPropertyUser } from '../lib/properties';
import PropertyOverviewImages from '../components/Property/PropertyOverview/PropertyOverviewImages';
import PropertyOverviewDetails from '../components/Property/PropertyOverview/PropertyOverviewDetails';
import material from '../../native-base-theme/variables/material';
import { getDownloadURL } from '../lib/propertyPhotos';
import { SET_USER_PROPERTY_PHOTOS } from '../constants/actionTypes';


class MyPropertyScreen extends Component {
  constructor () {
    super();

    this.state = {
      photos: [],
      user: {},
      loading: true,
    };
  }

  componentDidMount () {
    this.preparePropertyDetails();
  }

  async preparePropertyDetails () {
    const { property } = this.props;
    try {
      const photos = await getPropertyPhotos(property.uid);
      const promises = photos.map( async (photo) => {
        const link = await getDownloadURL(photo.get('imgPath'));
        return {
          ...photo.data(),
          imgUrl: link,
        }
      });
      const photoArr = await Promise.all(promises);
      console.log(photoArr);
      const user = await getPropertyUser(property.user_id);

      if (photoArr) {
        this.props.setPropertyPhotos({userPropertyPhotos: photoArr})
      }

      this.setState((prevState) => {
        return {
          ...prevState,
          loading: false,
          user,
          photos: photoArr,
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  getDirections () {
    this.props.navigation.navigate('PropertyDirections');
  }

  onEditclick () {
    console.log('Pressed edit');
    this.props.onEditClick();
  }

  render () {
    const { loading, photos, user } = this.state;
    const { property, onEditClick, onAddClick, isNew } = this.props;

    const Overview = () => {
      if (property) {
        return (
          <Container>
            <Content>
              <FullScreenLoader 
                visible={loading}
                text={'Please wait...'}
              />
              <PropertyOverviewImages
                photos={property.photos || []}
              />
              <PropertyOverviewDetails 
                property={property}
                user={user}
                isOwner={true}
                onEditClick={() => this.onEditclick()}
                isNew={isNew}
              />
            </Content>
            <Footer
              style={{ backgroundColor: '#fff', paddingHorizontal: 20, borderTopColor: material.brandPrimary, height: 60 }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
              >
                <View style={{ flexWrap: 'wrap' }}>
                  <Text style={{ width: '100%', fontWeight: '700' }}>₱ {property.rate} per night</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {
                      [...Array(Math.floor(property['average_rating']))].map((_, index) => (
                        <Icon
                          name='star'
                          style={{ 
                            color: material.brandSecondary,
                            fontSize: 16,
                            marginRight: 0,
                            width: null,
                          }}
                          key={ index }
                        />
                      )
                    ) }
                  </View>           
                </View>
                <View>
                  {
                    property.latLng && property.user_id !== user.uid &&
                    <Button
                      transparent
                      secondary
                      style={{ paddingLeft: 16, paddingRight: 16 }}
                      textStyle={{ fontWeight: '700' }}
                      onPress={() => this.getDirections() }
                    >
                      <Text style={{ fontWeight: '700', color: '#fff' }}>Get Directions</Text>
                    </Button>
                  }
                </View>
              </View>
            </Footer>
          </Container>
        )
      } else {
        return (
          <Container>
            <Content 
              contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              <View
                style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ marginBottom: 16 }}>You don't have any approved properties yet.</Text>
                <Button
                  primary
                  style={{ alignSelf: 'center' }}
                  onPress={() => onAddClick()}
                >
                  <Text style={{ color: '#fff' }}>Add a Property</Text>
                </Button>
              </View>
            </Content>
          </Container>
        )
      }
    }
      
    return (
      <Overview />
    )
  }
}

const mapStateToProps = state => {
  return {
    property: state.properties.userProperty,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => ({
  setPropertyPhotos: payload => {
    dispatch({ type: SET_USER_PROPERTY_PHOTOS, payload })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPropertyScreen);
