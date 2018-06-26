import * as firebase from 'firebase';
import tripModel from '../javascripts/models/trip';
let database;

export const init = () => {
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
};

export const getTripDbRef = () => {
    return database.ref().child('trips').once('value');
};

export const addNewTrip = (id, name) => {
    return new Promise((resolve, reject) => {
        database.ref().child('trips').once('value').then((tripDb) => {
            let trips = tripDb.val() || [];
            let key = database.ref().child('trips').push().key;
             trips.push(tripModel(key, name));
             database.ref().child('trips').set(trips)
                .then( res => {resolve(res)})
                .catch( error => {reject(error)})
        });
    });
};