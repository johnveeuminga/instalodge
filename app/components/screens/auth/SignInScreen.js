import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text, StyleProvider, Button, Icon } from 'native-base';
import { Image } from 'react-native';

import FullScreenLoader from '../general/FullScreenLoader'
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { fbLogin, googleLogin, storeUserUIDToStorage, FB_PROVIDER, GP_PROVIDER } from '../../../auth'
import { LOGIN } from '../../../constants/actionTypes';

class SignInScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor (props) {
    super(props);

    this.state = {
      showLoader: false,
    };
  }

  toggleLoader () {
    this.setState((prevState) => {
      return {
        showLoader: !prevState.showLoader
      }
    });
  }

  async socialLogin (provider) {
    this.toggleLoader();

    try {
      let user
      switch(provider) {
        case FB_PROVIDER: 
          user = await fbLogin();
          break;
        case GP_PROVIDER:
          user = await googleLogin();
          break;
        default:
          console.log('No provider specified');
      }
  
      this.props.onSocialAuthSuccess({user});
      await storeUserUIDToStorage(user.uid);
      this.toggleLoader();

      this.props.navigation.navigate(user.isHomeowner ? 'HomeOwner' : 'Home');
    } catch(err) {
      console.log(err)
    }
  }

  render () {
    return(
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Content contentContainerStyle={ { flex: 1, padding: 16, alignItems: "center", justifyContent: "center", backgroundColor: material.brandPrimary }}>
            <FullScreenLoader
              text="Logging you in..."
              visible={this.state.showLoader}
            />
            <Image 
              source={require('../../../assets/images/instalodge-logo.png')}
              style={{ width: 200, height: 200 }}
            />
            <Button
              block
              info
              onPress={() => this.socialLogin(FB_PROVIDER)}
              style={{ marginBottom: 16,  paddingVertical: 20, justifyContent: 'flex-start', paddingLeft: 20, backgroundColor: '#1649b3' }}
              textStyle={{ textTransform: "none", fontSize: 16, fontWeight: 500 }}              
            >
              <Icon 
                name={'logo-facebook'}
                style={{ marginRight: 10, width: 40 }}
              />
              <Text>Sign in with Facebook</Text>
            </Button>
            <Button
              block
              info
              onPress={() => this.socialLogin(GP_PROVIDER)}
              style={{ backgroundColor: '#ed5807', paddingVertical: 20, fontSize: 34, justifyContent: 'flex-start', paddingLeft: 20 }}
              textStyle={{ textTransform: "none", fontSize: 16, fontWeight: 500 }}              
            >
              <Icon 
                name={'logo-google'}
                style={{ marginRight: 10, width: 40 }}
              />
              <Text>Sign in with Google</Text>
            </Button>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

// TODO: This shouldn't be here.
const mapDispatchToProps = dispatch => ({
  onSocialAuthSuccess: payload => {
    dispatch({ type: LOGIN, payload });
  }
});

export default connect(() => ({}), mapDispatchToProps)(SignInScreen);
