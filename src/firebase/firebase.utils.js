import { initializeApp }  from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';

import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import FIREBASE_CONFIG from './firebase.config';

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const usersRef =  collection(firestore, 'users');
    const userRef = doc(usersRef, userAuth.uid);

    const snapShot = await getDoc(userRef);

    if(!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.error('error creating user', error.message);
        }
    }
};

const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => (signInWithPopup(auth, provider));

export default firebaseApp;