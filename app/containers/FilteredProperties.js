import React from 'react';
import { connectHits } from 'react-instantsearch-native';
import PropertyList from '../components/Property/PropertyList';


const FilteredProperties = connectHits(({hits, onPropertyClick}) => {
  return (
    <PropertyList 
      properties={hits}
      onPropertyClick={onPropertyClick}
    />
  )
} );

export default FilteredProperties
