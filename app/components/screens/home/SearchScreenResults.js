import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Text } from 'native-base';

class SearchScreenResults extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <List>
        {
          this.props.homeowners.map((homeowner, index) => (
          
            <ListItem
              key={index}
            >
              <Text>{ homeowner.name }</Text>
            </ListItem>
          ) )
        }
      </List>
    )
  }
}

const getFilteredHomeowners = (homeowners, searchString) => {
  if (searchString) {
    return homeowners.filter(homeowner => {
      const lowercaseName = homeowner.name.toLowerCase();
      const lowercaseText = searchString.toLowerCase();
  
      return lowercaseName.indexOf(lowercaseText) !== -1
    });
  } else {
    return homeowners;
  }
}

const mapStateToProps = state => {
  return {
    homeowners: getFilteredHomeowners(state.homeOwners.homeowners, state.homeOwners.searchString),
  }
};

export default connect(mapStateToProps, () => ({}))(SearchScreenResults);
