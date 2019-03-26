import React, { Component } from 'react';
import {
  Container,
  Content,
  H1,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import PropertyForm from '../components/Property/PropertyForm';
import material from '../../native-base-theme/variables/material';
import PropertyEditGallery from '../components/Property/PropertyEditGallery';
import PropertyMap from '../components/Property/PropertyMap';

class MyPropertyEditScreen extends Component {
  render () {
    const { property, navigation } = this.props;
    const newlyCreated = navigation.getParam('new', false);
    return (
      <Container>
        <Content padder>
          {
            newlyCreated && 
              <Text style={{ color: material.brandSuccess, marginBottom: 16 }}> You have created your property. You can upload photos and set your location below so to make your listing better </Text>
          }
          <PropertyForm 
            property={property}
          />
          <PropertyEditGallery 
            photos={property.photos || []}
            propertyId={property.uid}
          />
          <PropertyMap 
            property={property}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    property: state.properties.userProperty,
  }
}

export default connect(mapStateToProps, () => ({}))(MyPropertyEditScreen);
