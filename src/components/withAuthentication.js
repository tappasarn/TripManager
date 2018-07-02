import React from 'react';

import AuthUserContext from './AuthUserContext';
import { getFireBaseAuthObject, addNewUser } from '../javascripts/firebase';

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
                return authUser
                    ? this.setState(() => {
                        return { authUser }
                    }, () => addNewUser(authUser.uid, authUser.displayName))
                    : this.setState(() => ({ authUser: null }));
            });
        }

        render() {
            const { authUser } = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

export { withAuthentication };