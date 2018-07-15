import React from 'react';
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';

const Home = () => {
  return <div>This is home page</div>
}

Home.displayName = 'Home';

const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(Home);
const homeWithAuthorizationAndNavigator = withNavigator('Home')(homeWithAuthorization);
export { homeWithAuthorizationAndNavigator as Home };