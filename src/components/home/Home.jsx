import React from 'react';
import { withAuthorization } from '../withAuthorization';

const Home = () => {
    return (
        <div>
            Home page
        </div>
    );
};

Home.displayName = 'Home';
const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(Home);
export { homeWithAuthorization as Home };