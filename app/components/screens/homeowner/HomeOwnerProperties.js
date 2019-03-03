import React, { Component } from 'react';
import { Container, Text, Content, Icon, Button } from 'native-base';

export default class MapScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-home'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  };

  render () {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>You haven't uploaded any properties yet.</Text>
        </Content>
      </Container>
    );
  }
}