import React from 'react';
import PropertyCard from './PropertyCard';
import { ScrollView } from 'react-native';

const PropertyList = ({ properties = [], onPropertyClick }) => {
  return (
    // <ScrollView>
    //   {
      properties.map(property => (
        property.isAvailable &&
          <PropertyCard
            key={property.uid}
            property={property}
            onPropertyClick={onPropertyClick}
          />
      ) ) 
      // }
    // </ScrollView>
  )
}

export default PropertyList;
