import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDp52aqDlZJYb9ux9tFUXZvEDU0V4Su8Pk",
  authDomain: "crwn-db-d7947.firebaseapp.com",
  databaseURL: "https://crwn-db-d7947.firebaseio.com",
  projectId: "crwn-db-d7947",
  storageBucket: "crwn-db-d7947.appspot.com",
  messagingSenderId: "910138514552",
  appId: "1:910138514552:web:c6c30fac9dbd1e55df218d",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creatung new user" + error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
