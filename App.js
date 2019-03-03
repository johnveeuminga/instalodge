import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Icon, StyleProvider } from 'native-base';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import SplashScreen from './app/components/screens/SplashScreen';
import SignInScreen from './app/components/screens/auth/SignInScreen';
import store from './app/store'
import MapScreen from './app/components/screens/home/MapScreen';
import ProfileScreen from './app/components/screens/home/ProfileScreen';
import ProfileUpgrade from './app/components/screens/home/ProfileUpgrade';
import SearchScreen from './app/components/screens/home/SearchScreen';
import HomeOwnerProperties from './app/components/screens/homeowner/HomeOwnerProperties';
import UpgradeThankYou from './app/components/screens/upgrade/UpgradeThankYou';

const SplashScreenStack = createStackNavigator({
  Splash: SplashScreen
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
} );

const HomeOwnerProfileStack = createStackNavigator({
  Properties: HomeOwnerProperties,
}, {
  navigationOptions: () => ({
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-home'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  })
} );

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
},
{
  navigationOptions: () => ({
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-contact'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  })
}
)

const defaultNavigationTabs = {
  Map: MapScreen,
  Search: SearchScreen,
  Profile: ProfileStack,
};


const HomeBottomTab = createBottomTabNavigator(defaultNavigationTabs, {
  initialRouteName: 'Map',
});

const HomeBottomHomeOwnerTab = createBottomTabNavigator({
  ...defaultNavigationTabs,
  Properties: HomeOwnerProfileStack,
}, {
  initialRouteName: 'Map',
});

const UpgradeStack = createStackNavigator({
  UpgradeProfile: ProfileUpgrade,
  UpgradeThankYou: UpgradeThankYou,
}, {
  initialRouteName: 'UpgradeProfile',
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Splash: SplashScreenStack,
    Auth: AuthStack,
    Home: HomeBottomTab,
    HomeOwner: HomeBottomHomeOwnerTab,
    Upgrade: UpgradeStack,
  },
  {
    initialRouteName: 'Splash',
  },
));

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <AppContainer /> 
        </StyleProvider>
      </Provider>
    );
  }
}
