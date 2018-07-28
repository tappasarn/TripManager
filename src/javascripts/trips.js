import { fetchUserByUid, getTripInfoByIdPromise } from './firebase';

const getUserPromise = (uid) => fetchUserByUid(uid);

const getTripsNameAndDatesPromise = (uid) => {
    let promiseList = [];
    return new Promise((resolve, reject) => {
        fetchUserByUid(uid).then(user => {
            const userTripsIds = user.val().trips || [];
            userTripsIds.map(tripId => {
                promiseList.push(getTripInfoByIdPromise(tripId));
            });
            Promise.all(promiseList)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    })
}

export { getUserPromise, getTripsNameAndDatesPromise };