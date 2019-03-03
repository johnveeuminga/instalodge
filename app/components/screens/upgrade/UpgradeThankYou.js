import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Icon, Text, Button } from 'native-base';
import material from '../../../../native-base-theme/variables/material';

export default class UpgradeThankYou extends Component {
  static navigationOptions = {
    header: null,
  }

  goToHome () {
    this.props.navigation.navigate('HomeOwner');
  }

  render () {
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, padding : 16, alignItems: 'center', justifyContent: 'center', backgroundColor: material.brandPrimary}}>
          <Icon 
            name={'md-checkmark-circle-outline'}
            fontSize={112}
            style={{ fontSize: 112, color: material.brandSuccess }}
          />
          <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', marginBottom: 16 }}>Thank you for upgrading. You're profile is now upgraded as a homeowner</Text>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onPress={() => this.goToHome()}
              style={{ backgroundColor: material.brandSecondary }}
            >
              <Text>Back to Home</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}