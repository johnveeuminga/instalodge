import React, { Component } from 'react';
import { ActivityIndicator, Image } from 'react-native'
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';

import { LOGIN } from '../../constants/actionTypes';
import { getStoredUserUID, getUserFromUID } from '../../auth';

class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount () {
    this.getStoredUserAndDetails();
  }

  async getStoredUserAndDetails () {
    const uid = await getStoredUserUID();
    const user = await getUserFromUID(uid);

    this.props.storeUserLoginDetails({user});
    if (uid) {
      this.props.navigation.navigate(user.isHomeowner ? 'HomeOwner' : 'Home');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render () {
    return (
      <Container>
        <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%', backgroundColor: '#6e9de9' }}>
          <Image 
            source={require('../../assets/images/instalodge-logo.png')}
            style={{ width: 200, height: 200 }}
          />
          <ActivityIndicator size="large" color='#bc6864'/>
          <Text style={{ color: '#fff' }}>Preparing your app...</Text>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  storeUserLoginDetails: payload => {
    dispatch({ type: LOGIN, payload });
  }
});

export default connect (() => ({}), mapDispatchToProps)(SplashScreen)
