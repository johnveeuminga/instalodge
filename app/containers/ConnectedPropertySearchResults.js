import React from 'react';
import { connectStateResults } from 'react-instantsearch-native';
import PropertyResults from '../components/Property/PropertyResults';

export default connectStateResults(({searchState, searchResults, onPropertyClick}) => {
  return (
    <PropertyResults 
      searchResults={searchResults}
      searchState={searchState}
      onPropertyClick={onPropertyClick}
    />
  )
});
