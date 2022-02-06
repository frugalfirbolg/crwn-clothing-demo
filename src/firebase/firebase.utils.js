import { initializeApp }  from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot } from 'firebase/firestore';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
    } from "firebase/auth";
import FIREBASE_CONFIG from './firebase.config';

export const createUserProfileDocument = async (userAuth, additionalData, snapshotListener) => {
    if (!userAuth) return;

    const usersRef =  collection(firestore, 'users');
    const userRef = doc(usersRef, userAuth.uid);

    if (snapshotListener) {
        onSnapshot(userRef, snapshotListener);
    }

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

export const createUserWithEmailAndPasswordProxy = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmailAndPasswordProxy = (email, password) => signInWithEmailAndPassword(auth, email, password);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => (signInWithPopup(auth, provider));

export default firebaseApp;