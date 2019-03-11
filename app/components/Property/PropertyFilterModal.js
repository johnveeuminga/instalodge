import React from 'react';
import { 
  Container, 
  Content 
} from 'native-base';
import InstantSearch from 'react-instantsearch-native';
import ConnectedIncrementDecrementInput from '../../containers/ConnectedIncrementDecrementInput';

const PropertyFilterModal = ({
  searchState,
  onSearchStateChange,
}) => (
  <Container>
    <Content>
      <InstantSearch
        appId={'I9J7XWKBGB'}
        apiKey={'c61ee0c70ef9e19eeff20ddaf26ff0f5'}
        indexName={'properties'}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <ConnectedIncrementDecrementInput
          attribute='no_of_bedrooms'
          value={0}
          defaultRefinement={{
            min: 0,
            max: 9999,
          }}
          label={'Bedrooms'}
        />
        <ConnectedIncrementDecrementInput
          attribute='no_of_bathrooms'
          value={0}
          defaultRefinement={{
            min: 0,
            max: 9999,
          }}
          label={'Bathrooms'}
        />
        <ConnectedIncrementDecrementInput
          attribute='no_of_guests'
          value={0}
          defaultRefinement={{
            min: 0,
            max: 9999,
          }}
          label={'Guests'}
        />
      </InstantSearch>
    </Content>
  </Container>
);

export default PropertyFilterModal;
