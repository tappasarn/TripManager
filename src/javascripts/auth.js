import { getGoogleAuthProvider, getFireBaseAuthObject } from './firebase';

// Sign up with Gmail account
const signInWithGmailAcc = () => {
    const provider = getGoogleAuthProvider();

    getFireBaseAuthObject.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
};

export { signInWithGmailAcc };
