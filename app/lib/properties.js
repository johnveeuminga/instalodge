import firebase from 'react-native-firebase';


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

  return featured.data() || photos[0].data();
}