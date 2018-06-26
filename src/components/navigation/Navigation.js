import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constant/routes';

const Navigation = () => {
    <div>
        <ul>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to={routes.HOME}>HOME</Link></li>
        </ul>
    </div>
};

Navigation.displayName = 'Navigation';

export default Navigation;