import firebase from 'react-native-firebase';

const storage = firebase.storage();
const storageRef = storage.ref('HomeStayImages');
/**
 * Gets the download URL of a file
 */
export async function getDownloadURL (fileName) {
  console.log(fileName);
  const file = await storageRef.child(fileName);
  const downloadUrl = await file.getDownloadURL();

  return downloadUrl;
}

/**
 * Uploads a photo
 */
export async function uploadPhoto (uri, propertyId) {
  const sessionId = new Date().getTime();
  const fileName = `${sessionId}_${propertyId}.jpg`

  const imageRef = storageRef.child(fileName);

  return imageRef.putFile(uri).then(async (result) => {
    console.log(result);

    const photo = await addPhotoRecord(fileName, propertyId)
    return {
      ...photo,
      imgUrl: result.downloadURL,
    };
  }).catch(err => {
    console.log(err)
  }) 
}

export async function deletePhoto (imgPath) {
  try {
    const file = await storageRef.child(imgPath);
    await file.delete();

  } catch(err) {
    console.log("File upload error:", err);
  }
}


export async function addPhotoRecord(fileName, propertyId) {
  const photoRef = firebase.firestore().collection('property_photos').doc();

  const photoDetails = {
    uid: photoRef.id,
    imgPath: fileName,
    property_id: propertyId,
    isFeatured: false,
  }

  await photoRef.set(photoDetails);

  return photoDetails;
}

export async function updatePhoto(filePath, photo) {
  await deletePhoto(photo.imgPath);
  const sessionId = new Date().getTime();
  const fileName = `${sessionId}_${photo.propertyId}.jpg`

  const imageRef = storageRef.child(fileName);

  return imageRef.putFile(filePath).then(async (result) => {
    await updatePhotoPath(photo.uid, fileName);

    return {
      ...photo,
      imgUrl: result.downloadURL,
    };
  }).catch(err => {
    console.log(err)
  })
  
}

export async function updatePhotoPath (uid, imgPath) {
  const photoRef = firebase.firestore().collection('property_photos').doc(uid);

  const photoSnap = await photoRef.get();

  photoRef.set({
    ...photoSnap.data(),
    imgPath,
  });
}


export async function deletePhotoRecord(uid) {
  const photoRef = firebase.firestore().collection('property_photos').doc(uid);

  const photo = await photoRef.get();

  const file = await storageRef.child(photo.get('imgPath'));

  console.log(file);

  await file.delete();
  await photoRef.delete();
}

export async function setFeatured (uid, propertyId) {
  const oldFeaturedRec = firebase.firestore().collection('property_photos').where(
    'property_id',
    '==',
    propertyId
  ).where(
    'isFeatured',
    '==',
    true
  );

  const oldFeaturedSnapDocs = await oldFeaturedRec.get();

  if (!oldFeaturedSnapDocs.empty) {
    const oldFeaturedSnap = oldFeaturedSnapDocs.docs[0];
    await oldFeaturedSnap.ref.set({
      ...oldFeaturedSnap.data(),
      isFeatured: false,
    });
  }


  const newFeaturedRec = firebase.firestore().collection('property_photos').doc(uid);

  const newFeaturedDoc = await newFeaturedRec.get();

  await newFeaturedRec.set({
    ...newFeaturedDoc.data(),
    isFeatured: true,
  });
}
