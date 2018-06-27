import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { signInWithGmailAcc } from '../../javascripts/auth';

const styles = theme => ({
    root: theme.mixins.gutters({
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '30em',
        height: '18em',
        marginTop: '-9em', /*set to a negative number 1/2 of your height*/
        marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
    }),
    header: {
        marginTop: '50px',
    },
    paragraph: {
        marginTop: '80px',
    },
    button: {
        marginTop: '20px',
        border: '1px solid #dd4b39',
        color: '#dd4b39',
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    leftIcon: {
        marginLeft: theme.spacing.unit,
    },   
});

const initState = {
    userName: null,
    isLogin: false,
}

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {...initState};
    }
    getCssClass = () => {
        const { classes } = this.props;
        return classes;
    }
    signInFullfillment = (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.displayName);
    }
    onSignIn = () => {
        const signInPromise = signInWithGmailAcc();
        signInPromise
            .then(this.signInFullfillment)
            .catch(((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
            }));
    }
    render() {
        return (
            <div className='SignIn'>
                <Paper className={this.getCssClass().root} elevation={4}>
                    <Typography className={this.getCssClass().header} variant="headline" component="h1">
                        Sign In to your account
                    </Typography>
                    <Typography className={this.getCssClass().paragraph} component="p">
                        Start using TripManager with following service
                    </Typography>
                    <Button variant="outlined" className={this.getCssClass().button} onClick={this.onSignIn}>
                        Sign In with Google
                    </Button>
                </Paper>
            </div>
        );
    }
}

const signInWithStyle = withStyles(styles)(SignIn);
export { signInWithStyle as SignIn }; 