import React from 'react';
import { connectRange } from 'react-instantsearch-native';
import IncrementDecrementInput from '../components/general/Inputs/IncrementDecrementInput';

const ConnectedIncrementDecrementInput = connectRange(({currentRefinement, refine, value, label, onChange, maximumVal = 9999 }) => {
  const onChangeProp = (value) => {
    refine({ min: value, max: 9999 })

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <IncrementDecrementInput 
      value={value}
      label={label}
      onChange={(value) => onChangeProp(value)}
      maximumVal={maximumVal}
    />
  )
});

export default ConnectedIncrementDecrementInput;
