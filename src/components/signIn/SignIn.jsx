import React from 'react';
import { signInWithGmailAcc } from '../../javascripts/auth';

const SignIn = () => {
    return (
        <div onClick={signInWithGmailAcc}>
            Sign In Page
        </div>
    );
};

SignIn.displayName = 'SignIn';
export { SignIn };