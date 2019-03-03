import React, { Component } from 'react'
import { Container, Content, Icon, Item, Input, List, ListItem, Text } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { ADD_HOMEOWNER, SEARCH_HOMEOWNERS, SET_HOMEOWNERS } from '../../../constants/actionTypes';

import FullScreenLoader from '../general/FullScreenLoader';
import SearchScreenResults from './SearchScreenResults';

class SearchScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-search'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  };

  constructor (props) {
    super(props);

    this.state = {
      searchText: false,
      isLoading: true,
      homeOwners: this.props.homeOwners,
    }

    firebase.firestore().collection('users').onSnapshot((user) => {
      let homeowners = []

      user.forEach(user => {
        const userData = user.data();

        if (userData.isHomeowner) {
          homeowners = [
            ...homeowners,
            userData,
          ]
        }
      });

      this.props.setHomeowners({homeowners});
    });
  }

  async componentDidMount () {
    await this.getFirebaseUsers();
    this.toggleLoader();
  }

  toggleLoader () {
    this.setState((prevState) => {
      return {
        isLoading: !prevState.isLoading
      }
    });
  }

  async getFirebaseUsers () {
    const users = await firebase.firestore().collection('users').get();
    let homeowners = []
    users.forEach(user => {
      const userData = user.data();

      if (userData.isHomeowner) {
        homeowners = [
          ...homeowners,
          userData,
        ]
      }
    });

    this.props.setHomeowners({homeowners});
  }

  filterHomeowners (val) {
    this.props.setSearchString({val});
  }

  render () {
    return (
      <Container>
        <Content contentContainerStyle={{ padding: 16 }}>
          <FullScreenLoader 
            text={'Fetching homeowners...'}
            visible={this.state.isLoading}
          />
          <Item
            bordered
            style={{ padding: 5, borderStyle: 'solid', borderWidth: 1, borderColor: '#ddd' }}
          >
            <Input 
              placeholder='Search homeowners' 
              onChangeText={(text) => this.filterHomeowners(text)}
            />
            <Icon
              name='md-search'
            />
          </Item>
          <SearchScreenResults />
        </Content>
      </Container>
    )
  }
}

// TODO: This shouldn't be here.
const mapDispatchToProps = dispatch => ({
  addHomeOwnerToState: payload => {
    dispatch({ type: ADD_HOMEOWNER, payload });
  },

  setSearchString: payload => {
    dispatch({ type: SEARCH_HOMEOWNERS, payload });
  },

  setHomeowners: payload => {
    dispatch({ type: SET_HOMEOWNERS, payload });
  }
});

export default connect(() => ({}), mapDispatchToProps)(SearchScreen);
