import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import PropertyForm from '../components/Property/PropertyForm';
import { SET_PROPERTIES, SET_USER_PROPERTY } from '../constants/actionTypes';
import { addProperty } from '../lib/properties';
import FullScreenLoader from '../components/general/FullScreenLoader';
import { StackActions, NavigationActions } from 'react-navigation';


class MyPropertyAddScreen extends Component {
  constructor () {
    super();

    this.state = {
      showLoader: false,
    }
  }

  toggleLoadingModal () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showLoader: !prevState.showLoader,
      }
    })
  }

  async onFormSubmit (propertyDetails) {
    this.toggleLoadingModal();

    const updatedProperty = await addProperty(this.props.user.uid, propertyDetails);

    this.props.addProperty({
      properties: [
        ...this.props.propertyes || [],
        updatedProperty,
      ]
    });
    
    this.props.setUserProperty({
      userProperty: updatedProperty,
    });

    this.toggleLoadingModal();

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ 
        routeName: 'MyProperties', 
        params: {
          new: true,
        } 
      } ) ]
    });
    this.props.navigation.dispatch(resetAction);

    return;
  }


  render () {
    return (
      <Container>
        <Content>
          <FullScreenLoader 
            text={'Adding your property'}
            visible={this.state.showLoader}
          />
          <PropertyForm 
            property={{}}
            onSubmit={(propertyDetails) => this.onFormSubmit(propertyDetails)}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    properties: state.properties.data,
  }
};

const mapDispatchToProps = dispatch => ({
  addProperty: payload => {
    dispatch({ type: SET_PROPERTIES, payload });
  },

  setUserProperty: payload => {
    dispatch({ type: SET_USER_PROPERTY, payload });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPropertyAddScreen)
