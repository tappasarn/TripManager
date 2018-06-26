import _ from 'lodash';

let initialState = {
    trips: [],
};

export default (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        default:
            return state;
    }
}