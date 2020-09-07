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

export const addCollectionAndDocuments = async (collectionKey, itemsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  itemsToAdd.forEach((item) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, item);
  });

  return await batch.commit();
};

export const converstCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((collection) => {
    const { title, items } = collection.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: collection.id,
      title,
      items,
    };
  });
  return transformedCollections.reduce((accumolator, collection) => {
    accumolator[collection.title.toLowerCase()] = collection;
    return accumolator;
  }, {});
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
