import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import material from '../../native-base-theme/variables/material';

export default class MyPropertyUpgradeScreen extends Component {
  render () {
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: material.brandPrimary, alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>You are not a registered homeowner or your request hasn't been approved yet.</Text>
        </Content>
      </Container>
    )
  }
}
