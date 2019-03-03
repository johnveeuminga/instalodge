import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { Form,  Button, Item, Input, Text, Label } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import material from '../../../native-base-theme/variables/material';

import Stripe from '../../stripe/stripe';
import { UPDATE_USER } from '../../constants/actionTypes';
import { addStripeIDToUser, setIsHomeownerToTrue } from '../../auth';
import FullScreenLoader from '../screens/general/FullScreenLoader';

class HomeOwnerUpgradeForm extends Component {
  constructor (props) {
    super(props);

    console.log(props);

    this.state = {
      form: {
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: ''
      },
      showLoader: false,
    };
  }

  toggleLoader () {
    this.setState((prevState) => {
      return {
        ...prevState,
        showLoader: !prevState.showLoader,
      }
    });
  }

  onInputChange (key, value) {
    this.setState( (prevState) => {
      const state = prevState;
      state.form[key] = value;

      return state;
    });
  }

  async onFormSubmit () {
    const { form } = this.state;
    this.toggleLoader();

    const stripeObj = new Stripe();

    try {
      const token = await stripeObj.createToken(form);

      if (this.props.user && this.props.user.stripeId && !this.props.user.isHomeowner) {
        await stripeObj.createSubscription(this.props.user.stripeId);
        const user = await setIsHomeownerToTrue(this.props.user.uid);

        this.props.updateUserDetails({user});
        this.props.onPaymentFinish();    
      } else {
        if (this.props.user.isHomeowner) {
          this.toggleLoader();
          return;
        }
        
        const userDetails = {
          email: this.props.user.email,
          source: token.id
        }

        const stripeUser = await stripeObj.createCustomer(userDetails);

        await addStripeIDToUser(this.props.user.uid, stripeUser.id);
        const user = await setIsHomeownerToTrue(this.props.user.uid);

        await stripeObj.createSubscription(stripeUser.id);

        this.props.updateUserDetails({user});

        this.toggleLoader();
      
        this.props.onPaymentFinish();
      }

    } catch (err) {
      console.log(err);
      this.toggleLoader();
    }
  }

  render () {
    return (
      <Form
        style={{flex: 1, paddingVertical: 20, paddingHorizontal: 16 }}
      >
        <FullScreenLoader 
          text={'Processing your payment...'}
          visible={this.state.showLoader}
        />
        <View style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
          <Image 
            source={{ uri: this.props.user.photoURL }}
            style={{ width: 100, height: 100, borderRadius: 50, marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
        <Text
          style={{ paddingHorizontal: 16, color: material.brandPrimary, textAlign: 'center', marginTop: 16, marginBottom: 16 }}
        >
					Enter Card Details	 
			 </Text>
        <View style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
          <Image 
						source={require('../../assets/images/networks.png')}
						resizeMode={'contain'}
            style={{ width: 150, height: 32, marginLeft: 'auto', marginRight: 'auto' }}
          />
        </View>
        <Grid
          style={{ marginTop: 16 }}
				>
					<Row>
						<Col>
							<View style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center', marginBottom: 16}}>
								<Text style={{ fontWeight: '700', textAlign: 'center'}}>
									TOTAL: Php 200.00 / Month
								</Text>
							</View>
						</Col>
					</Row>
          <Row>
            <Col>
              <Item 
                stackedLabel 
                last
              >
                <Label>Card Number</Label>
                <Input 
                  onChangeText={(text) => this.onInputChange('number', text)}
                />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Item stackedLabel last>
                <Label>Month Exp. (in digits e.g January - 1)</Label>
                <Input 
                  onChangeText={(text) => this.onInputChange('exp_month', text)}
                />
              </Item> 
            </Col>
          </Row>
          <Row>
            <Col>
              <Item stackedLabel>
                <Label>Year Exp. </Label>
                <Input 
                  onChangeText={(text) => this.onInputChange('exp_year', text)}
                />
              </Item> 
            </Col>
          </Row>
          <Row>
            <Col>
              <Item stackedLabel last>
                <Label>CVC</Label>
                <Input 
                  onChangeText={(text) => this.onInputChange('cvc', text)}
                />
              </Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Button 
                block
                onPress={() => this.onFormSubmit()}  
              >
                <Text>SUBMIT</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = dispatch => ({
  updateUserDetails: payload => {
    dispatch({ type: UPDATE_USER, payload });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeOwnerUpgradeForm);
