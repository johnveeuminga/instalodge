import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Icon, StyleProvider } from 'native-base';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import SplashScreen from './app/screens/SplashScreen';
import HomeScreen from './app/screens/HomeScreen';
import SignInScreen from './app/components/screens/auth/SignInScreen';
import store from './app/store'
import ProfileScreen from './app/components/screens/home/ProfileScreen';
import ProfileUpgrade from './app/components/screens/home/ProfileUpgrade';
import SearchScreen from './app/components/screens/home/SearchScreen';
import UpgradeThankYou from './app/components/screens/upgrade/UpgradeThankYou';
import PropertyFilterModal from './app/components/Property/PropertyFilterModal';

const SplashScreenStack = createStackNavigator({
  Splash: SplashScreen
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
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

const NewsFeedStack = createStackNavigator({
  NewsFeedHome: HomeScreen,
  Filters: PropertyFilterModal,
},{
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: () => ({
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='home'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  })
})

const defaultNavigationTabs = {
  NewsFeed: NewsFeedStack,
  Search: SearchScreen,
  Profile: ProfileStack,
};


const HomeBottomTab = createBottomTabNavigator(defaultNavigationTabs, {
  initialRouteName: 'NewsFeed',
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
