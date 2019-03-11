import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties = [], prop }) => {
  return (
    properties.map(property => (
      <PropertyCard
        key={property.uid}
        property={property}
      />
  ) ) )
}

export default PropertyList;
