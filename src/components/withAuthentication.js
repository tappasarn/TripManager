import React from 'react';

import AuthUserContext from './AuthUserContext';
import { getFireBaseAuthObject } from '../javascripts/firebase';

const withAuthentication = (Component) =>
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            getFireBaseAuthObject().onAuthStateChanged(authUser => {
                console.log('withAuthentication componentDidMount', authUser);
                return authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: null }));
            });
        }

        render() {
            const { authUser } = this.state;
            console.log('withAuthentication render', authUser);
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

export { withAuthentication };