import { getGoogleAuthProvider, getFireBaseAuthObject } from './firebase';

// Sign up with Gmail account
const signInWithGmailAcc = () => {
    const provider = getGoogleAuthProvider();
    console.log(getFireBaseAuthObject());
    getFireBaseAuthObject().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
    }).catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
    });
};

export { signInWithGmailAcc };
