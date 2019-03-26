import firebase from 'react-native-firebase';
import { getDownloadURL } from './propertyPhotos';

const db = firebase.firestore();

/**
 * Gets all the properties from Firebase.
 */
export async function getProperties () {
  const properties = await db.collection('properties').get();

  return properties.docs.map(property => property.data());
}

/**
 * Gets all the property photos.
 */
export async function getPropertyPhotos (uid) {
  const photos = await db.collection('property_photos').where(
    'property_id',
    '==',
    uid,
  ).get();

  return photos.empty ? [] : photos.docs;
}

/**
 * Gets only the featured property photo.
 */
export async function getPropertyFeaturedPhoto (uid) {
  const photos = await getPropertyPhotos(uid);

  const featured = photos.find(photo => photo.get('isFeatured'));

  const link = await getDownloadURL(featured.get('imgPath'));

  return {
    ...featured.data(),
    imgPath: link,
  }
}

/**
 * Gets the user of the property.
 */
export async function getPropertyUser (userId) {
  const user = await db.collection('users').doc(userId).get();

  return user.empty ? null : user.data();
}

/**
 * Gets the property comments.
 */
export async function getPropertyComments (propertyId) {
  const comments = await db.collection('property_comments').where(
    'property_id',
    '==',
    propertyId,
  ).get();

  return comments.empty ? [] : comments.docs;
}

/**
 * Adds a comment to the property
 * 
 * @param {Object} comment The comment to add
 */
export async function addPropertyComment (comment) {
  const commentData = await db.collection('property_comments').add(comment);

  return commentData;
}

/**
 * Update property
 */
export async function updateProperty (uid, propertyDetails) {
  if (uid) {
    const propertyRef = db.collection('properties').doc(uid);

    const propertySnap = await propertyRef.get();
    
    const propertyData = {
      ...propertySnap.data(),
      ...propertyDetails, 
    }

    const { name, no_of_bedrooms, no_of_bathrooms, no_of_guests, rate, description, isAvailable } = propertyData;

    await propertyRef.set({
      ...propertyData,
      name: name,
      no_of_bedrooms: no_of_bedrooms ? parseInt(no_of_bedrooms) : 0,
      no_of_bathrooms: no_of_bathrooms ? parseInt(no_of_bathrooms) : 0,      
      no_of_guests: no_of_guests ? parseInt(no_of_guests) : 0,
      rate: rate ? parseInt(rate) : 0,
      description: description || '',
      isAvailable: isAvailable || false,
    });

    const newPropertyDetails =  await propertyRef.get();

    return newPropertyDetails.data();
  }
}

export async function addProperty (userId, propertyDetails) {
  const propertyRef = db.collection('properties').doc();
    
    const propertyData = {
      ...propertyDetails, 
    }

    const { name, no_of_bedrooms, no_of_bathrooms, no_of_guests, rate, description, isAvailable } = propertyData;

    await propertyRef.set({
      uid: propertyRef.id,
      name: name,
      no_of_bedrooms: no_of_bedrooms ? parseInt(no_of_bedrooms) : 0,
      no_of_bathrooms: no_of_bathrooms ? parseInt(no_of_bathrooms) : 0,      
      no_of_guests: no_of_guests ? parseInt(no_of_guests) : 0,
      rate: rate ? parseInt(rate) : 0,
      description: description || '',
      isAvailable: isAvailable || false,
      user_id: userId,
      average_rating: 0,
    });

    const newPropertyDetails =  await propertyRef.get();

    return newPropertyDetails.data();
}
