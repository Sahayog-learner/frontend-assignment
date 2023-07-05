import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const config = {
  apiKey: "AIzaSyAoA0lJPcbYJfLeYflXutr1q3IqcAvv6TM",
  authDomain: "ecommerce-db-7136f.firebaseapp.com",
  projectId: "ecommerce-db-7136f",
  storageBucket: "ecommerce-db-7136f.appspot.com",
  messagingSenderId: "846256566553",
  appId: "1:846256566553:web:27feb0524afc7822189588",
  measurementId: "G-YLX978WDKX"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,createAt,
        ...additionalData
      })

    }catch(error){
      console.log('error creating user',error.message);

    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth =firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase; 

