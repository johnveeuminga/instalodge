import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Button, H3, Icon, Text } from 'native-base';
import material from '../../../native-base-theme/variables/material';
import { connect } from 'react-redux';
import { showImagePicker } from 'react-native-image-picker';
import { SET_USER_PROPERTY_PHOTOS } from '../../constants/actionTypes';
import { uploadPhoto, deletePhotoRecord, updatePhoto, setFeatured } from '../../lib/propertyPhotos';
import FullScreenLoader from '../general/FullScreenLoader';

class PropertyEditGallery extends Component {
  constructor () {
    super();
    this.state = {
      loading: false,
    }
  }

  async addImage () {

    const options = {
      title: 'Select Image',
    }

    const { photos, propertyId } = this.props;

    showImagePicker(options, async (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.toggleLoading();

        const photo = await uploadPhoto(response.path, propertyId);
        console.log(photo);
        this.props.setUserPropertyPhotos({userPropertyPhotos: [
          ...photos,
          photo,
        ]})

        this.toggleLoading();
      }
    });

  }

  async editPhoto (photo) {

    const { photos } = this.props;

    const options = {
      title: 'Select Image',
    }

    showImagePicker(options, async (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.toggleLoading();

        const newPhoto = await updatePhoto(response.path, photo)
        const photoArr = photos.map(rec => {
          if (rec.uid === photo.uid) {
            return newPhoto;
          }
          return rec
        });

        this.props.setUserPropertyPhotos({userPropertyPhotos: photoArr});

        this.toggleLoading();
      }
    });

  }

  async removeImage (photo) {
    this.toggleLoading();
    const { photos } = this.props;
    await deletePhotoRecord(photo.uid);

    const photoArr = photos.filter(rec => rec.uid !== photo.uid);

    this.props.setUserPropertyPhotos({userPropertyPhotos: photoArr});
    this.toggleLoading();
  }

  async setFeatured (photo) {
    this.toggleLoading();
    const { photos } = this.props;
    await setFeatured(photo.uid, photo.property_id);

    const photoArr = photos.map(rec => {
      if ( rec.isFeatured === true ) {
        return {
          ...rec,
          isFeatured: false,
        }
      }
      if (rec.uid === photo.uid) {
        return {
          ...photo,
          isFeatured: true,
        }
      }

      return rec
    });

    this.props.setUserPropertyPhotos({userPropertyPhotos: photoArr});
    this.toggleLoading();
  }

  toggleLoading () {
    this.setState((prevState) => {
      return {
        ...prevState,
        loading: !prevState.loading,
      }
    })
  }

  render () {
    const { photos } = this.props;
    const { loading } = this.state;

    return (
      <View style={{ marginTop: 16 }}>
      <FullScreenLoader 
        visible={loading}
        text={'Please wait....'}
      />
        <H3 style={{color: material.brandPrimary, fontWeight: '700'}}>Gallery</H3>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}
        >
          {
            photos && photos.map((photo, index) => (
              <View
                style={{ paddingHorizontal: 5, paddingVertical: 5, width: '100%', position: 'relative' }}
                key={index}
              >
                <View
                  style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', justifyContent: 'flex-end', zIndex: 10 }}
                >
                 <Button 
                    primary
                    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 2, paddingBottom: 2, color: '#000',marginRight: 2 }}
                    onPress={() => this.editPhoto(photo)}
                  >
                    <Icon 
                      name={'create'}
                      style={{ color: '#fff'}}
                    />
                  </Button>
                  {
                    !photo.isFeatured && 
                      <Button 
                        success
                        style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 2, paddingBottom: 2, color: '#000',marginRight: 2 }}
                        onPress={() => this.setFeatured(photo)}
                      >
                        <Icon 
                          name={'eye'}
                          style={{ color: '#fff'}}
                        />
                      </Button>
                  }
                  <Button 
                    danger
                    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 2, paddingBottom: 2, color: '#000' }}
                    onPress={() => this.removeImage(photo)}
                  >
                    <Icon 
                      name={'close'}
                      style={{ color: '#fff' }}
                    />
                  </Button>
                </View>
                <Image
                  source={{ uri: photo.imgUrl }}
                  style={{ width: '100%', height: 215 }}
                  resizeMode={'cover'}
                  resizeMethod={'resize'}
                />
              </View>
            ) )
          }
          <Button
            onPress={() => this.addImage()}
          >
            <Text>Add New</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUserPropertyPhotos: payload => {
    dispatch({ type: SET_USER_PROPERTY_PHOTOS, payload });
  }
});

export default connect(() => ({}), mapDispatchToProps)(PropertyEditGallery)
