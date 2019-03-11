import React, { Component } from 'react';
import { Container, Text, Content, Icon } from 'native-base';

export default class HomeScreen extends Component {
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
  }


  render () {
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1 }}
        >
          <Text>This is the home screen.</Text>
        </Content>
      </Container>
    );
  }
}