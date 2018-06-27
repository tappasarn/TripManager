import { getGoogleAuthProvider, getFireBaseAuthObject } from './firebase';

// Sign in with Gmail account
const signInWithGmailAcc = () => {
    const provider = getGoogleAuthProvider();
    // Add Promise.resolve here to unsure a genuine Promise object 
    // return singInPopup Promise
    return Promise.resolve(getFireBaseAuthObject().signInWithPopup(provider));
};

// Sign out
const signOut = () => {
    getFireBaseAuthObject().signOut();
};

export { signInWithGmailAcc };
