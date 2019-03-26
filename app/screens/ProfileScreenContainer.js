import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ProfileScreen from '../components/screens/home/ProfileScreen';
import SignInScreen from '../components/screens/auth/SignInScreen';


class ProfileScreenContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  navigateToHome() {
    this.props.navigation.navigate('Home');
  }

  onUpgradePressed () {
    this.props.navigation.navigate('ProfileThankYou');
  }

  render () {
    const { user } = this.props;

    const Screen = () => {
      if (user) {
        return (
          <ProfileScreen 
            onUpgradePressed={() => this.onUpgradePressed()}
            afterLogout={() => this.navigateToHome()}
          />
        )
      } else {
        return (
          <SignInScreen />
        )
      }
    }

    return(
      <Screen />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, () => ({}))(ProfileScreenContainer)
