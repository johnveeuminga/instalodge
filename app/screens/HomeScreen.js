import React, { Component } from 'react';
import { 
  Container, 
  Content,
  Icon,
  Text,
} from 'native-base';
import { InstantSearch } from 'react-instantsearch-native';
import { connect } from 'react-redux';

import { SET_PROPERTIES } from '../constants/actionTypes';
import { getProperties } from '../lib/properties';
import ConnectedPropertySearchBox from '../containers/ConnectedPropertySearchBox';
import ConnectedPropertySearchResults from '../containers/ConnectedPropertySearchResults';
import IncrementDecrementInput from '../components/general/Inputs/IncrementDecrementInput';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-home'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    }
  }

  componentDidMount () {
    this.getAllProperties();
  }

  async getAllProperties () {
    const properties = await getProperties();

    this.props.setProperties({ properties });
  }

  render () {
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1, padding: 16 }}
        >
          <InstantSearch
            appId={'I9J7XWKBGB'}
            apiKey={'c61ee0c70ef9e19eeff20ddaf26ff0f5'}
            indexName={'properties'}
          >
            <ConnectedPropertySearchBox />
            <ConnectedPropertySearchResults 
              onPropertyClick={() => console.log('property clicked')}
            />
          </InstantSearch>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProperties: payload => {
      dispatch({ type: SET_PROPERTIES, payload });
    }
  }
}

export default connect(() => ({}), mapDispatchToProps)(HomeScreen);
