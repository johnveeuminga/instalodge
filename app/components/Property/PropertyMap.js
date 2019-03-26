import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { H3, Button, Text, Container, Content, Header, Left, Icon, Right, Body } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateProperty } from '../../lib/properties';
import { SET_USER_PROPERTY, SET_PROPERTIES } from '../../constants/actionTypes';
import FullScreenLoader from '../general/FullScreenLoader';


class PropertyMap extends Component {
  mapRef;

  constructor() {
    super();
    this.state = {
      showModal: false,
      showLoading: false,
    }
  }

  toggleLocationModal () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showModal: !prevState.showModal,
      }
    })
  }

  toggleLoadingModal () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showLoading: !prevState.showLoading,
      }
    })
  }

  async setLocation (latLng, location) {
    const { property } = this.props;

    const newProperty = {
      ...property,
      latLng,
      location,
    };

    this.toggleLocationModal();
    this.toggleLoadingModal();

    const updatedProperty = await updateProperty(property.uid, newProperty);

    this.props.setUserProperty({ userProperty: {
      ...property,
      ...updatedProperty,
    } } );

    const propertyArray = this.props.properties.map(rec => {
      if (rec.uid === property.uid) {
        return {
          ...rec,
          ...updatedProperty
        }
      }

      return rec;
    })

    this.props.setProperties({ properties: propertyArray });

    if (this.mapRef) {
      this.mapRef.animateToRegion({
        ...latLng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 300);
  
      this.toggleLoadingModal();
    }

  }

  render () {
    const { property } = this.props;

    return (
      <View style={{ marginTop: 16 }}>
        <Modal
          transparent={false}
          visible={this.state.showModal}
        >
          <Container>
            <Header
              style={{ elevation: 0, }}
            >
              <Left>
                <Button 
                  transparent
                  onPress={() => this.toggleLocationModal()}
                >
                  <Icon
                    name='arrow-back'
                  />
                </Button>
              </Left>
              <Body></Body>
              <Right></Right>
            </Header>
            <Content>
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                currentLocation={false}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setLocation({
                    latitude: details.geometry.location.lat, 
                    longitude: details.geometry.location.lng, 
                  }, details.formatted_address);
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAsG_sx5X2rrkjOS5kfY8sOoBKKgdhZApo',
                }}
          
              />
            </Content>
          </Container>
        </Modal>
        <H3 style={{color: material.brandPrimary, fontWeight: '700'}}>Location</H3>
        {
          property && property.latLng &&
          <View
            style={{ position: 'relative', width: '100%', height: 300, marginTop: 16, marginBottom: 16 }}
          >
            <MapView
              initialRegion={{
                latitude: property.latLng.latitude,
                longitude: property.latLng.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              ref={(ref) => this.mapRef = ref}
              style={{...StyleSheet.absoluteFillObject}}
            >
              <Marker 
                coordinate={{
                  latitude: property.latLng.latitude,
                  longitude: property.latLng.longitude,
                }}
              />
            </MapView>
          </View>
        } 
        <Button
          onPress={() => this.toggleLocationModal()}
        >
          <Text>Set Location</Text>
        </Button>
        <FullScreenLoader 
          visible={this.state.showLoading}
          text={'Updating location'}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: payload => {
    dispatch({ type: SET_USER_PROPERTY, payload });
  },

  setProperties: payload => {
    dispatch({ type: SET_PROPERTIES, payload });
  },
});

const mapStateToProps = state => {
  return {
    properties: state.properties.data, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyMap);
