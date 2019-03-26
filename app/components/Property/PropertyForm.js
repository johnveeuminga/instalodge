import React, { Component } from 'react';
import { 
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Textarea,
} from 'native-base';
import { connect } from 'react-redux';
import { View, Switch } from 'react-native';
import { SET_USER_PROPERTY, SET_PROPERTIES } from '../../constants/actionTypes';
import FullScreenLoader from '../general/FullScreenLoader';
import { updateProperty } from '../../lib/properties';

class PropertyForm extends Component {
  constructor (props) {
    super();

    const { name, no_of_bedrooms, no_of_bathrooms, no_of_guests, rate, description, isAvailable } = props.property;

    this.state = {
      form: {
        name: name,
        no_of_bedrooms: no_of_bedrooms || '',
        no_of_bathrooms: no_of_bathrooms || '',
        no_of_guests: no_of_guests || '',
        rate: rate || '',
        description: description || '',        
        isAvailable: isAvailable || false,
      },
      showLoading: false,
    }
  }

  toggleLoadingModal () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showLoading: !prevState.showLoading,
      }
    })
  }

  setFormValue (index, value) {
    this.setState((state) => {
      state.form[index] = value;
      console.log(state);
      return {
        ...state,
      };
    })
  }

  async submitForm () {

    if (this.props.onSubmit) {
      await this.props.onSubmit(this.state.form);
    } else {
      this.toggleLoadingModal();

      const { property } = this.props;
      const { form } = this.state;
    
      const updatedProperty = await updateProperty(property.uid, {
        ...property,
        ...form,
      } );

      console.log(updatedProperty);
  
      this.props.setUserProperty({ userProperty: {
        ...property,
        ...updatedProperty,
      } } );
  
      const propertyArray = this.props.properties.map(rec => {
        if (rec.uid === property.uid) {
          return {
            ...rec,
            ...updatedProperty,
          }
        }
  
        return rec;
      });
  
      this.props.setProperties({ properties: propertyArray });

      this.toggleLoadingModal();
    }

    if (this.props.afterSubmit) {
      this.props.afterSubmit();
    }
  }

  render () {
    const { form, showLoading } = this.state;
    const { loaderText } = this.props;

    return (
      <Form>
        <FullScreenLoader 
          text={ loaderText ||  'Updating property'}
          visible={showLoading}
        />
        <Item stackedLabel>
          <Label>Property Name</Label>
          <Input 
            value={form.name}
            onChangeText={(text) => this.setFormValue('name', text)}
          />
        </Item>
        <Item stackedLabel>
          <Label>No. of Bedrooms</Label>
          <Input 
            value={`${form.no_of_bedrooms}`}
            onChangeText={(text) => this.setFormValue('no_of_bedrooms', text)}
            keyboardType={'numeric'}
          />
        </Item>
        <Item stackedLabel>
          <Label>No. of Bathrooms</Label>
          <Input 
            value={`${form.no_of_bathrooms}`}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setFormValue('no_of_bathrooms', text)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Maximum guests</Label>
          <Input 
            value={`${form.no_of_guests}`}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setFormValue('no_of_guests', text)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Rate per night</Label>
          <Input 
            value={`${form.rate}`}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setFormValue('rate', text)}
          />
        </Item>
        <Item
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16}}
        >
          <Text>Is Available</Text>
          <Switch
            value={form.isAvailable}
            onValueChange={(val) => this.setFormValue('isAvailable', val)}
          />
        </Item>
        <Item>
          <Textarea
            value={form.description}
            placeholder='Describe your property'
            rowSpan={5}
            onChangeText={(text) => this.setFormValue('description', text)}
          />
        </Item>
        <Item style={{ paddingTop: 16, paddingBottom: 16, borderBottomWidth: 0}}>
          <Button
            onPress={() => this.submitForm()}
          >
            <Text>Submit</Text>
          </Button>
        </Item>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserProperty: payload => {
    dispatch({ type: SET_USER_PROPERTY, payload });
  },

  setProperties: payload => {
    dispatch({ type: SET_PROPERTIES, payload });
  },
});

const mapStateToProps = state => {
  return {
    properties: state.properties.data, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm);
