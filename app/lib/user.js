import firebase from 'react-native-firebase';

/**
 * Gets the user from a given UID
 * 
 * @param {String} uid The UID of the user
 */
export async function getUserFromUID (uid) {
  try {
    const firebaseUserRef = await firebase.firestore().collection('users').doc(uid)

    const firebaseUserDoc = await firebaseUserRef.get();

    return firebaseUserDoc.data();
  } catch (err) {
    console.log(err);
  }
}