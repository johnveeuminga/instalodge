import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Content, Icon } from 'native-base';

import GoogleMap from '../../map/GoogleMap';

export default class MapScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-compass'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  };

  render () {
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1, ...StyleSheet.absoluteFillObject }}
        >
          <GoogleMap />
        </Content>
      </Container>
    );
  }
}