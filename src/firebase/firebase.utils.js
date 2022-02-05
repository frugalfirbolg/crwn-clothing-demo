import { initializeApp }  from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import FIREBASE_CONFIG from './firebase.config';

const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => (signInWithPopup(auth, provider));

export default firebaseApp;