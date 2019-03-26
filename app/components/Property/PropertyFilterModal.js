import React from 'react';
import { 
  Container, 
  Content, 
  Header,
  Left,
  Right,
  Button,
  Icon,
  Text
} from 'native-base';
import { Modal } from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import ConnectedIncrementDecrementInput from '../../containers/ConnectedIncrementDecrementInput';

const PropertyFilterModal = ({
  isModalOpen,
  searchClient,
  searchState,
  onSearchStateChange,
  onCloseClicked,
}) => {
  const bedrooms = searchState.range && searchState.range.no_of_bedrooms && searchState.range.no_of_bedrooms.min;
  const bathrooms = searchState.range && searchState.range.no_of_bathrooms && searchState.range.no_of_bathrooms.min;
  const guests = searchState.range && searchState.range.no_of_guests && searchState.range.no_of_guests.min;
  return (
      <Modal
      visible={isModalOpen}
      transparent={false}
      animationType={'slide'}
    >
      <Container>
        <Header>
          <Left>
            <Button 
              transparent
              onPress={ () => onCloseClicked() }  
            >
              <Icon
                name={'close'}
              />
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Text>Clear filters</Text>
            </Button>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}
        >
          <InstantSearch
            searchClient={searchClient}
            indexName={'properties'}
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
          >
            <ConnectedIncrementDecrementInput
              attribute='no_of_bedrooms'
              value={bedrooms || 0}
              defaultRefinement={{
                min: 0,
                max: 9999,
              }}
              label={'Bedrooms'}
            />
            <ConnectedIncrementDecrementInput
              attribute='no_of_bathrooms'
              value={bathrooms || 0}          
              defaultRefinement={{
                min: 0,
                max: 9999,
              }}
              label={'Bathrooms'}
            />
            <ConnectedIncrementDecrementInput
              attribute='no_of_guests'
              value={guests || 0}            
              defaultRefinement={{
                min: 0,
                max: 9999,
              }}
              label={'Guests'}
            />
          </InstantSearch>
        </Content>
      </Container>
    </Modal>
  )
}

export default PropertyFilterModal;
