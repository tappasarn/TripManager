import _ from 'lodash';
import userModel from '../javascripts/models/userModel';

let initialState = {
    authUser: null,
};

const addUser = (state, authUser) => {
    return {
        ...state,
        authUser: userModel(authUser.uid, authUser.name),
    };
}

export default (state = initialState, action) => {
    // let newState = _.merge({}, state);
    switch (action.type) {
        case('ADD_AUTH_USER'):
            return addUser(state, action.authUser);
        default:
            return state;
    }
}