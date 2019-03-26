import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import MyPropertyScreen from './MyPropertyScreen';
import MyPropertyUpgradeScreen from './MyPropertyUpgradeScreen';
import { setIsHomeownerToTruePending } from '../auth';
import SignInScreen from '../components/screens/auth/SignInScreen';

class MyPropertyScreenContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  async upgradeUser () {
    await setIsHomeownerToTruePending(this.props.user.uid);
    this.props.navigation.navigate('Splash');
  }

  goToEdit () {
    console.log('Go to edit');
    this.props.navigation.navigate('MyPropertyEdit');
  }

  goToAdd () {
    console.log('Go to add');
    this.props.navigation.navigate('MyPropertyAdd');
  }

  goToDirections () {
    this.props.navigation.navigate('MyPropertyAdd');
  }


  render () {
    const { user, navigation } = this.props;
    const isNew = navigation.getParam('new', false);

    const Screen = () => {
      if (user) {
        if (user.isHomeowner && !user.isRequestPending) {
          return (
            <MyPropertyScreen 
              onEditClick={() => this.goToEdit()}
              onAddClick={() => this.goToAdd() }
              isNew={isNew}
            />
          )
        } else {
          return (
            <MyPropertyUpgradeScreen 
              user={user}
              onUpgradePressed={() => this.upgradeUser()}
            />
          )
        }
      } else {
        return (
          <SignInScreen />
        )
      }
    }

    return (
      <Screen />
    )
  }

}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, () => ({}))(MyPropertyScreenContainer)