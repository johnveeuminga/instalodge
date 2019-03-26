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
import SearchScreen from './app/components/screens/home/SearchScreen';
import PropertyOverviewScreen from './app/screens/PropertyOverviewScreen';
import PropertyDirectionsScreen from './app/screens/PropertyDirectionsScreen';
import ProfileScreenContainer from './app/screens/ProfileScreenContainer';
import UpgradeThankYou from './app/screens/UpgradeThankYou';
import MyPropertyScreenContainer from './app/screens/MyPropertyScreenContainer';
import PropertyOverviewCommentModal from './app/components/Property/PropertyOverview/PropertyOverviewCommentModal';
import MyPropertyEditScreen from './app/screens/MyPropertyEditScreen';
import MyPropertyAddScreen from './app/screens/MyPropertyAddScreen';

const SplashScreenStack = createStackNavigator({
  Splash: SplashScreen
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
} );

const ProfileStack = createStackNavigator({
  Profile: ProfileScreenContainer,
  ProfileThankYou: UpgradeThankYou,
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
);

const PropertyOverviewStack = createStackNavigator({
  PropertyOverviewMain: PropertyOverviewScreen,
  PropertyOverviewComment: PropertyOverviewCommentModal,
}, {
  headerMode: 'null',
});

const HomeStack = createStackNavigator({
  NewsFeed: HomeScreen,
  PropertyOverview: PropertyOverviewStack,
  PropertyDirections: PropertyDirectionsScreen,
}, {
  initialRouteName: 'NewsFeed',
  navigationOptions: () => ({
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='paper'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  })
});

const MyPropertiesStack = createStackNavigator({
  MyProperties: MyPropertyScreenContainer,
  MyPropertyEdit: MyPropertyEditScreen,
  MyPropertyAdd: MyPropertyAddScreen,
}, {
  navigationOptions: () => ({
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='home'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    },
    title: 'My Property',
  })
});



const HomeBottomTab = createBottomTabNavigator({
  Home: HomeStack,
  MyPropertiesStack: MyPropertiesStack,
  Profile: ProfileStack,
}, {
  initialRouteName: 'Home',
});


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Splash: SplashScreenStack,
    Auth: AuthStack,
    Home: HomeBottomTab,
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
