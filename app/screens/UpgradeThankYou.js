import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Icon, Text, Button } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import material from '../../native-base-theme/variables/material';

class UpgradeThankYou extends Component {
  static navigationOptions = {
    header: null,
  }

  goToHome () {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Profile' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render () {
    const { user } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, padding : 16, alignItems: 'center', justifyContent: 'center', backgroundColor: material.brandPrimary}}>
          <Icon 
            name={'md-checkmark-circle-outline'}
            fontSize={112}
            style={{ fontSize: 112, color: material.brandSuccess }}
          />
          <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', marginBottom: 16 }}>Thank you for your interest. We will send an email to {user.email} for the next steps to do. You'll receive an email within 1 to 2 workding day/s.</Text>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onPress={() => this.goToHome()}
              style={{ backgroundColor: material.brandSecondary }}
            >
              <Text>Back</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, () => ({}))(UpgradeThankYou);
