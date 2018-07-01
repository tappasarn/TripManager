import React from 'react';
import { withAuthorization } from '../withAuthorization';
import { signOut } from '../../javascripts/auth';

const Home = () => {
    return (
        <div onClick={signOut}>
            Home page
        </div>
    );
};

Home.displayName = 'Home';
const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(Home);
export { homeWithAuthorization as Home };