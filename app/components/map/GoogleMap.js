import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { } from 'react-native-maps';

import FullScreenLoader from '../screens/general/FullScreenLoader';

export default class GoogleMap extends Component {
  mapRef;

  constructor (props) {
    super(props);

    this.state = {
      userPosition: null,
      showLoader: true,
    };

    this.mapRef = React.createRef();
  }

  onLocationSuccess (position) {
    this.setUserPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

  }

  toggleLoader () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showLoader: !prevState.showLoader,
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
    console.log("Component did mount");
    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (err) => console.log(err),
      {
        timeout: 10000,
        enableHighAccuracy: false,
      }
    );
  }

  onMapReady () {
    let position;

    if (this.state.userPosition) {
      position = this.state.userPosition;
    } else {
      position = {
        lat: 15.8949,
        lng: 120.2863,
      }
    }

    this.mapRef.current.animateToRegion({
      latitude: position.lat,
      longitude: position.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 500);

    this.toggleLoader();
  }

	render () {
    return (
      <View
        style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}
      >
        <FullScreenLoader
          text="Fetching your location"
          visible={this.state.showLoader}
        />
        <MapView 
          style={styles.map}
          ref={this.mapRef}
          onMapReady={() => this.onMapReady()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }
})
