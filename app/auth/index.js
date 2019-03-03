import storage from '../storage';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { USER_UID_STORAGE_KEY } from '../constants/storageKeys';

// Constants
export const FB_PROVIDER = 'FACEBOOK';
export const GP_PROVIDER = 'GOOGLE';

/**
 * Login using Facebook
 */
export async function fbLogin() {
  try {
    await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

    const token = await AccessToken.getCurrentAccessToken();

    const credential = await firebase.auth.FacebookAuthProvider.credential(token.accessToken)

    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    const firebaseUser = await updateUserDetails(firebaseUserCredential)

    return firebaseUser
  } catch (err) {
    console.log(err)
  }
}

/**
 * Login using Google
 */
export async function googleLogin() {
  try {
    await GoogleSignin.configure({
      
    });

    const data = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    const firebaseUser = await updateUserDetails(firebaseUserCredential)
    
    return firebaseUser
  } catch (err) {
    console.log(err)
  }
}

export async function logout () {
	try {
		await removeStoredUserUIDFromStorage();
	} catch (err) {
		console.log(err);
	}
}


/**
 * Sets or update the user details to the Firestore Database
 * 
 * @param {Object} firebaseUserCredential Firebase User Credentials
 */
async function updateUserDetails (firebaseUserCredential) {
  try {
    const firebaseUserRef = await firebase.firestore().collection('users').doc(firebaseUserCredential.user.uid)

    const firebaseUserDoc = await firebaseUserRef.get();

    const userDetails = {
      uid: firebaseUserCredential.user.uid,
      name: firebaseUserCredential.user.displayName,
      email: firebaseUserCredential.user.email,
      photoURL: firebaseUserCredential.user.photoURL,
      phoneNumber: firebaseUserCredential.user.phoneNumber,
      isHomeowner: firebaseUserCredential.user.isHomeowner ? true : false,
      stripeId: firebaseUserCredential.user.stripeId ? firebaseUserCredential.user.stripeId : null,
    }

    if (firebaseUserDoc.exists) {
      await firebaseUserRef.set(userDetails);

      return firebaseUserDoc.data();
    }

    await firebaseUserRef.set({
      ...userDetails,
      isHomeowner: false,
    });

    const newUser = await firebaseUserRef.get();
    
    return newUser.data();
  } catch (err) { 
    console.log(err);
  }
}

/**
 * Stores the UID of the user to the storage.
 * 
 * @param {String} uid The user ID
 */
export async function storeUserUIDToStorage (uid) {
  try {
    await storage.setItem(USER_UID_STORAGE_KEY, uid)
  } catch (err) {
    console.log(err);
  }
}

/**
 * Removes the stored UID from stroage.
 */
export async function removeStoredUserUIDFromStorage (uid) {
	try {
		await storage.removeItem(USER_UID_STORAGE_KEY);
	} catch (err) {
		console.log(err);	
	}
}

/**
 * Gets the stored UID if there's any.
 */
export async function getStoredUserUID () {
  try {
    const uid = await storage.getItem(USER_UID_STORAGE_KEY);


    return uid;
  } catch(err) {
    console.log(err)
  }
}

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

/**
 * Adds a stripeID field to the user record
 * 
 * @param {String} uid Id of the user
 * @param {String} stripeId Stripe ID
 */
export async function addStripeIDToUser (uid, stripeId) {
  try {
    const userRef = await firebase.firestore().collection('users').doc(uid);

    const userDoc = await userRef.get();
    
    userRef.set({
      ...userDoc.data(),
      stripeId,
    });

    const newUserDoc = await userRef.get();

    return newUserDoc.data();
  } catch (err) {
    console.log(err)
  }
}

/**
 * Changes the `isHomeowner` flag to true
 * 
 */
export async function setIsHomeownerToTrue (uid) {
  try {
    const userRef = await firebase.firestore().collection('users').doc(uid);

    const userDoc = await userRef.get();
    
    userRef.set({
      ...userDoc.data(),
      isHomeowner: true,
    });

    const newUserDoc = await userRef.get();

    return newUserDoc.data();
  } catch (err) {
    console.log(err)
  }
}
