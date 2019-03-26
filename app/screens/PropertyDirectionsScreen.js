import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { 
  Container, 
  Content,
  Text,
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import FullScreenLoader from '../components/general/FullScreenLoader';
import MapViewDirections from 'react-native-maps-directions';
import material from '../../native-base-theme/variables/material';

class PropertyDirectionsScreen extends Component {
  mapRef;

  constructor () {
    super();
    this.state = {
      userLocation: null,
      loading: true,
    }
  }

  onLocationSuccess (position) {
    const { latitude, longitude } = position.coords;

    this.setUserPosition({
      latitude,
      longitude,
    });

    this.hideLoader();
  }

  hideLoader () {
    this.setState((prevState) => {
      return {
        ...prevState,
        loading: false,
      }
    });
  }

  setUserPosition (userPosition) {
    this.setState((prevState) => {
      return {
        ...prevState,
        userPosition,
      }
    });
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (err) => console.log(err),
      {
        timeout: 30000,
        enableHighAccuracy: false,
      }
    );
  }

  render () {
    const { loading, userPosition } = this.state;
    const { property } = this.props;
    const propertyLatLng = {
      latitude: property.latLng.latitude,
      longitude: property.latLng.longitude,
    };
    return (
      <Container>
        <Content
          style={{ height: '100%', flex: 1 }}
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', ...StyleSheet.absoluteFillObject }}
        >
          <FullScreenLoader 
            visible={loading}
            text={'Getting directions...'}
          />
          <MapView 
            ref={(ref) => this.mapRef = ref}
            onLayout = {() => this.mapRef.fitToCoordinates([userPosition, propertyLatLng], { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
            style={{ ...StyleSheet.absoluteFillObject }}
          >
            <MapViewDirections
              origin={userPosition}
              destination={propertyLatLng}
              apikey={'AIzaSyBQcCL0haEzmeridZVvnFbYu-c-BWSuMVs'}
              strokeWidth={3}
              strokeColor={material.brandSecondary}
            />
            {
              userPosition && userPosition.latitude && userPosition.longitude &&
              <Marker
                coordinate={userPosition}
              />
            }
            <Marker
              coordinate={propertyLatLng}
            />
          </MapView>
        </Content>
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {
    property: state.properties.selected,
  }
}

export default connect(mapStateToProps, () => ({}))(PropertyDirectionsScreen);
