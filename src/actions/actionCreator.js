import { addNewUser } from '../javascripts/firebase';

// action creator start to have too much logic
// TODO: keep action creator clean by moving thunk logic some where else
const addAuthUser = authUser => {
    return dispatch => {
         dispatch({
            type: 'ADD_AUTH_USER',
            authUser,
        });
        addNewUser(authUser.uid, authUser.name);
    };
}

export { addAuthUser };
