import React from 'react';
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';

const Create = () => {
  return <div>This is create page</div>
}

Create.displayName = 'Create';

const authCondition = (authUser) => !!authUser;
const createWithAuthorization = withAuthorization(authCondition)(Create);
const createWithAuthorizationAndNavigator = withNavigator('Create')(createWithAuthorization);
export { createWithAuthorizationAndNavigator as Create };