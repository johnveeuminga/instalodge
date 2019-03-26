import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Content,
  Footer,
  Icon,
  Button,
  H2,
} from 'native-base';
import { 
  View,
  Text,
} from 'react-native';
import FullScreenLoader from '../components/general/FullScreenLoader';
import { getPropertyPhotos, getPropertyUser, getPropertyComments } from '../lib/properties';
import PropertyOverviewImages from '../components/Property/PropertyOverview/PropertyOverviewImages';
import PropertyOverviewDetails from '../components/Property/PropertyOverview/PropertyOverviewDetails';
import PropertyOverviewComment from '../components/Property/PropertyOverview/PropertyOverviewComment';
import material from '../../native-base-theme/variables/material';
import { getDownloadURL } from '../lib/propertyPhotos';


class PropertyOverviewScreen extends Component {
  constructor () {
    super();

    this.state = {
      photos: [],
      user: {},
      loading: true,
      comments: [],
    };
  }

  componentDidMount () {
    this.preparePropertyDetails();
  }

  async preparePropertyDetails () {
    const { property } = this.props;
    try {
      const photos = await getPropertyPhotos(property.uid);
      const promises = photos.map( async (photo) => {
        const link = await getDownloadURL(photo.get('imgPath'));
        return {
          ...photo.data(),
          imgUrl: link,
        }
      });
      const commentsDocs = await getPropertyComments(property.uid);
      const comments = commentsDocs.map(comment => {
        return comment.data();
      });
      const photoArr = await Promise.all(promises);
      const user = await getPropertyUser(property.user_id);

      this.setState((prevState) => {
        return {
          ...prevState,
          loading: false,
          user,
          comments,
          photos: photoArr,
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  getDirections () {
    this.props.navigation.navigate('PropertyDirections');
  }

  render () {
    const { loading, photos, user, comments } = this.state;
    const { property, loggedInUser } = this.props;

    return (
      <Container>
        <Content>
          <FullScreenLoader 
            visible={loading}
            text={'Please wait...'}
          />
          <PropertyOverviewImages 
            photos={photos || []}
          />
          <PropertyOverviewDetails 
            property={property}
            user={user}
          />
          <View style={{ marginTop: 32, paddingLeft: 16, paddingRight: 16, marginBottom: 32 }}>
            <H2 style={{ fontWeight: '700', marginBottom: 12 }}>Reviews</H2>
            {
              comments.length > 0 && comments.map(comment => (
                <PropertyOverviewComment 
                  comment={comment}
                  key={comment.uid}
                />
              ) )
            }
            {
              comments.length === 0 &&
                <Text style={{ textAlign: 'center', marginBottom: 16 }}> There are no reviews for this property yet.</Text>
            }
            {
              loggedInUser && loggedInUser.uid !== property.user_id &&
                <Button
                  style={{ paddingLeft: 16, paddingRight: 16, marginTop: 12 }}
                  onPress={() => this.props.navigation.navigate('PropertyOverviewComment')}
                >
                  <Text style={{ color: '#fff' }}>Add a comment</Text>
                </Button>
            }
          </View>
        </Content>
        <Footer
          style={{ backgroundColor: '#fff', paddingHorizontal: 20, borderTopColor: material.brandPrimary, height: 60 }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
          >
            <View style={{ flexWrap: 'wrap' }}>
              <Text style={{ width: '100%', fontWeight: '700' }}>₱ {property.rate} per night</Text>
              <View style={{ flexDirection: 'row' }}>
                {
                  [...Array(Math.round(property['average_rating']))].map((_, index) => (
                    <Icon
                      name='star'
                      style={{ 
                        color: material.brandSecondary,
                        fontSize: 16,
                        marginRight: 0,
                        width: null,
                      }}
                      key={ index }
                    />
                  )
                ) }
              </View>           
            </View>
            <View>
              <Button
                transparent
                secondary
                style={{ paddingLeft: 16, paddingRight: 16 }}
                textStyle={{ fontWeight: '700' }}
                onPress={() => this.getDirections() }
              >
                <Text style={{ fontWeight: '700', color: '#fff' }}>Get Directions</Text>
              </Button>
            </View>
          </View>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    property: state.properties.selected,
    loggedInUser: state.auth.user,
  }
}

export default connect(mapStateToProps, () => ({}))(PropertyOverviewScreen);
