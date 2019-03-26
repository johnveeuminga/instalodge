import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { 
  Container, 
  Content,
  Icon,
  Text,
  Button,
} from 'native-base';
import { NavigationEvents } from "react-navigation";
import algoliasearch from 'algoliasearch/reactnative'
import { InstantSearch, connectRange } from 'react-instantsearch-native';
import { connect } from 'react-redux';
import { SET_PROPERTIES, SET_PROPERTY } from '../constants/actionTypes';
import { getProperties } from '../lib/properties';
import ConnectedPropertySearchBox from '../containers/ConnectedPropertySearchBox';
import ConnectedPropertySearchResults from '../containers/ConnectedPropertySearchResults';
import PropertyFilterModal from '../components/Property/PropertyFilterModal';
import ConnectedIncrementDecrementInput from '../containers/ConnectedIncrementDecrementInput';

const searchClient = algoliasearch(
  'I9J7XWKBGB',
  '4ce3f133031592c9af268ccd91dd68a6'
);

const VirtualConnectedRange = connectRange(() => null)

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

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      searchState: {},
      refresh: false,
    }
  }

  componentDidMount () {
    this.getAllProperties();
  }

  async getAllProperties () {
    const properties = await getProperties();

    this.props.setProperties({ properties });
  }

  toggleModal () {
    this.setState((prevState) => {
      return {
        ...prevState,
        isModalOpen: !prevState.isModalOpen,
      }
    })
  }

  closeFilterModal () {
    console.log('close modal');
    this.setState((prevState) => {
      return {
        ...prevState,
        isModalOpen: false,
      }
    })
  }

  onSearchStateChange = searchState =>
    this.setState((prevState) => ({
      ...prevState,
      searchState,
    }));

  goToPropertyDetails (uid) {
    const property = this.props.properties.find(property => property.uid === uid);
    this.props.setSelectedProperty({ property });
    this.props.navigation.navigate('PropertyOverview');
  }


  render () {
    const { isModalOpen, searchState } = this.state;
    return (
      <Container>
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({ refresh: true }, () => {
              this.setState({ refresh: false });
            });
          }}
        />
        <Content
          contentContainerStyle={{ padding: 16 }}
          scrollEnabled={ true }
        >
          <InstantSearch
            searchClient={searchClient}
            indexName={'properties'}
            onSearchStateChange={this.onSearchStateChange}
            refresh={this.state.refresh}
          >            
            <ConnectedPropertySearchBox />
            <View style={{ marginBottom: 16 }}>
              <Button 
                bordered 
                dark
                onPress={() => this.toggleModal()}
              >
                <Text>Filters</Text>
              </Button>
            </View>

            {
              this.state.isModalOpen &&
              <View style={{ marginBottom: 16 }}>
                <ConnectedIncrementDecrementInput 
                  attribute={'no_of_bedrooms'}
                  value={0}
                  defaultRefinement={{
                    min: 0,
                    max: 9999,
                  }}
                  label={'Bedrooms'}
                />
                <ConnectedIncrementDecrementInput 
                  attribute={'no_of_bathrooms'}
                  value={0}
                  defaultRefinement={{
                    min: 0,
                    max: 9999,
                  }}
                  label={'Bathrooms'}
                />
                <ConnectedIncrementDecrementInput 
                  attribute={'no_of_guests'}
                  value={0}
                  defaultRefinement={{
                    min: 0,
                    max: 9999,
                  }}
                  label={'Guests'}
                />
                <ConnectedIncrementDecrementInput 
                  attribute={'average_rating'}
                  value={0}
                  defaultRefinement={{
                    min: 0,
                    max: 5,
                  }}
                  maximumVal={5}
                  label={'Rating'}
                />
              </View>
            }

            <ConnectedPropertySearchResults 
              onPropertyClick={(uid) => this.goToPropertyDetails(uid)}
              searchState={searchState}
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
    },
    setSelectedProperty: payload => {
      dispatch({ type: SET_PROPERTY, payload })
    },
  }
}

const mapStateToProps = state => {
  return  {
    properties: state.properties.data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
