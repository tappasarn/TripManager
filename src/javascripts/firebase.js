import * as firebase from 'firebase';
import 'firebase/auth';
import userModel from '../javascripts/models/userModel';
let database;
let auth; 

const init = () => {
    var config = {
        apiKey: "AIzaSyAXS9CtZHkoSM-7cwOHyzfqivuDua9UoCc",
        authDomain: "tripmanager-67d37.firebaseapp.com",
        databaseURL: "https://tripmanager-67d37.firebaseio.com",
        projectId: "tripmanager-67d37",
        storageBucket: "tripmanager-67d37.appspot.com",
        messagingSenderId: "94998285485"
    };
    firebase.initializeApp(config);
    database = firebase.database()
    auth = firebase.auth();
};

const getTripInfoByIdPromise = (tripId) => {
    return Promise.resolve(database.ref().child('trips').child(tripId.toString()).once('value'));
};

/**
 * this function is only to verify and add new user to firebase
 */
const addNewUser = (uid, name) => {
    return new Promise((resolve, reject) => {
        database.ref().child('users').once('value').then((usersDb) => {
            let users = usersDb.val() || [];
            // only add if new user
            if(!users[uid]){
                const updatedUser = {...users, [uid]: userModel(uid, name)};
                database.ref().child('users').set(updatedUser)
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            }
        });
    });
}

const fetchUserByUid = (uid) => {
    return Promise.resolve(database.ref().child('users').child(uid.toString()).once('value'));
}

// return new Promise((resolve, reject) => {
//     database.ref().child('users').child(uid.toString()).once('value').then((usersDb) => {
//         let users = usersDb.val() || [];
//         if(users[uid]){
//            return users[uid].trips || []; 
//         }
//         return [];
//     });
// });

// const addNewTrip = (id, name) => {
//     return new Promise((resolve, reject) => {
//         database.ref().child('trips').once('value').then((tripDb) => {
//             let trips = tripDb.val() || [];
//             let key = database.ref().child('trips').push().key;
//              trips.push(tripModel(key, name));
//              database.ref().child('trips').set(trips)
//                 .then( res => {resolve(res)})
//                 .catch( error => {reject(error)})
//         });
//     });
// };

const getGoogleAuthProvider = () => {
    return new firebase.auth.GoogleAuthProvider();
}

const getFireBaseAuthObject = () => {
    return auth || console.log('auth is being call before firebase is init');
};

export {
    init,
    getTripInfoByIdPromise,
    addNewUser,
    getGoogleAuthProvider,
    getFireBaseAuthObject,
    fetchUserByUid,
};