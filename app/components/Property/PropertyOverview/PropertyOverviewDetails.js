import React from 'react';
import { 
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { H1, Text, Icon, H3, Button } from 'native-base';
import material from '../../../../native-base-theme/variables/material';
import { Grid, Row, Col } from 'react-native-easy-grid';

const PropertyOverviewDetails = ({ property, user, isOwner, onEditClick, isNew }) => (
  <View style ={ styles.wrapper }>
    <View style={ styles.container }>
      {
        isNew && 
        <Text style={{ color: material.brandSuccess, marginBottom: 16 }}>You have created your property! To make your listing better, upload photos and set your location by clicking on "Edit" below.</Text>
      }
      <H1 style={ styles.heading }>{ property.name }</H1>
      {
        property.location !== null && property.location !== '' &&
          <View
            style={ styles.viewRow }
          >
            <Icon
              name='pin'
              style={ styles.icon }
            />
            <Text>{ property.location }</Text>
          </View>
      }
      <View
        style={ styles.viewRow }
      >
        <Icon
          name='person'
          style={ styles.icon }
        />
        <Text>{ user.name }</Text>
      </View>
      <Text>Contact through: </Text>
      <View
        style={ styles.viewRow }
      >
        <Icon
          name='mail'
          style={ styles.icon }
        />
        <Text>{ user.email }</Text>
      </View>
      <View
        style={ styles.viewRow }
      >
        <Icon
          name='call'
          style={ styles.icon }
        />
        {
          user.phoneNumber !== null  && user.phoneNumber !== '' &&
            <Text>{ user.phoneNumber }</Text>
        }
        {
          !user.phoneNumber && 
            <Text>-</Text>
        }
      </View>
      {
        isOwner &&
        <View
          style={styles.viewRow}
        >
          <Button 
            primary
            style={styles.actionButton}
            onPress={onEditClick}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </Button>
        </View>
      }
    </View>
    <View style={ styles.container }>
      <Grid>
        <Row>
          <Col>
            <View style={ styles.detailRow }>
              <Text style={ styles.detailHeading }>Bedrooms: </Text>
              <Text>{property.no_of_bedrooms}</Text>
            </View>
          </Col>
          <Col>
            <View style={ styles.detailRow }>
              <Text style={ styles.detailHeading }>Bathrooms: </Text>
              <Text>{property.no_of_bathrooms}</Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <View style={ styles.detailRow }>
              <Text style={ styles.detailHeading }>Guests: </Text>
              <Text>{property.no_of_guests}</Text>
            </View>
          </Col>
        </Row>
      </Grid>
    </View>
    {
      property.description !== '' && property.description !== null &&
        <View style={{ ...styles.container, ...styles.containerNoBorder }}>
          <Text>{ property.description }</Text>
        </View>
    }
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  containerNoBorder: {
    borderBottomWidth: 0,
  },
  heading: {
    fontWeight: '700',
    marginBottom: 12,
    color: material.brandPrimary,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: null,
    color: '#5a5a5a',
    fontSize: 18,
    marginRight: 5
  },
  userContainer: {
    paddingTop: 12,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailRow: {
    flexWrap: 'wrap',
  },
  detailHeading: {
    fontWeight: '700',
    width: '100%',
    color: '#5a5a5a',
  },
  actionButton: {
    marginRight: 10
  },
  actionButtonText: {
    fontWeight: '700',
  }
});

export default PropertyOverviewDetails;
