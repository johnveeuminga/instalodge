import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import FilteredProperties from '../../containers/FilteredProperties';

const PropertyResults = (({searchResults, onPropertyClick}) => {
  if (searchResults && searchResults.nbHits === 0) {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>No results found</Text>
      </View>
    );
  } else {
    return (
      <FilteredProperties 
        onPropertyClick={onPropertyClick}
      />
    )
  }
} )

export default PropertyResults;
