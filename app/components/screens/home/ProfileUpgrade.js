import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import HomeOwnerUpgradeForm from '../../homeowner/HomeOwnerUpgradeForm';
import { StackActions, NavigationActions } from 'react-navigation';


export default class ProfileUpgrade extends Component {
  static navigationOptions = {
    header: null,
  }

  onPaymentFinish () {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'UpgradeThankYou' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render () {
    return (
      <Container>
        <Content>
          <HomeOwnerUpgradeForm 
            onPaymentFinish={ () => this.onPaymentFinish() }
          />
        </Content>
      </Container>
    );
  }
}