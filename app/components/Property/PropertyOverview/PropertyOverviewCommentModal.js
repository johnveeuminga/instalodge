import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Content,
  Text,
  H1,
  Button,
  Form,
  Textarea,
  Icon,
  Item,
} from 'native-base';
import { View } from 'react-native';
import { 
  StackActions, 
  NavigationActions 
} from 'react-navigation';
import material from '../../../../native-base-theme/variables/material';
import { addPropertyComment } from '../../../lib/properties';
import FullScreenLoader from '../../general/FullScreenLoader';
import moment from 'moment';

class PropertyOverviewCommentModal extends Component {
  constructor () {
    super();
    this.state = {
      rating: 0,
      comment: '',
      loading: false,
    }
  }

  setComment (comment) {
    this.setState((prevState) => {
      return {
        ...prevState,
        comment,
      }
    })
  }

  setRating (rating) {
    this.setState((prevState) => {
      return {
        ...prevState,
        rating,
      }
    })
  }

  toggleLoader() {
    this.setState((prevState) => {
      return {
        ...prevState,
        loading: !prevState.loading,
      }
    });
  }

  async submitForm () {
    const { rating, comment } = this.state;
    const { user, property } = this.props;
    this.toggleLoader();
    
    const date = moment().format('MMMM YYYY');

    const commentData = {
      rating,
      comment,
      date,
      user_id: user.uid,
      property_id: property.uid,
    }

    const savedComment = await addPropertyComment(commentData);
    console.log(savedComment);
    this.toggleLoader();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'PropertyOverviewMain' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render () {
    const { rating, loading } = this.state;
    return (
      <Container>
        <Content
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, paddingTop: 32, paddingBottom: 32 }}
        >
          <FullScreenLoader 
            text={'Submitting your comment'}
            visible={loading}
          />
          <H1 style={{ color: material.brandPrimary, fontWeight: '700', marginBottom: 16}}>
            Rate your stay
          </H1>
          <Form>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 16 }}>How many stars would you rate the property?</Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                {
                  [...Array(5)].map((_, index) => (
                    <Button 
                      transparent
                      onPress={() => this.setRating(index + 1)}
                      key={ index }
                      style={{ paddingLeft: 0, paddingRight: 0, }}
                    >
                      <Icon
                        name='star'
                        style={{ 
                          color: rating >= index + 1 ? material.brandSecondary: '#ddd',
                          fontSize: 32,
                          marginRight: 0,
                          width: null,
                        }}
                      />
                    </Button>
                  ) )
                }
              </View>
            </View>
            <Textarea 
              placeholder={'Additional comments...'}
              onChangeText={(text) => this.setComment(text)}
              bordered
              rowSpan={5}
              style={{ marginBottom: 12 }}
            />
            <Button
              onPress={() => this.submitForm() }
            >
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    property: state.properties.selected,
  }
}

export default connect(mapStateToProps, () => ({}))(PropertyOverviewCommentModal);
