import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { signInWithGmailAcc } from '../../javascripts/auth';
import { withRouter } from 'react-router-dom';
import * as route from '../../constant/routes';
import { getFireBaseAuthObject } from '../../javascripts/firebase';

const styles = theme => ({
    root: theme.mixins.gutters({
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '30em',
        height: '18em',
        marginTop: '-9em', /*set to a negative number 1/2 of your height*/
        marginLeft: '-17em', /*set to a negative number 1/2 of your width*/
    }),
    header: {
        marginTop: '50px',
        marginBottom: '20px'
    },
    paragraph: {
        marginTop: '60px',
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

class SignIn extends Component {
    componentDidMount() {
        getFireBaseAuthObject().onAuthStateChanged(authUser => {
            if (!!authUser) {
                this.redirectToHomePage();
            }
        });
    }
    getCssClass = () => {
        const { classes } = this.props;
        return classes;
    }
    getRouteHistoryOnject = () => {
        const { history } = this.props;
        return history;
    }
    onSignIn = (event) => {
        signInWithGmailAcc();
        event.preventDefault();
    }
    redirectToHomePage = () => {
        this.getRouteHistoryOnject().push(route.HOME);
    }
    render() {
        return (
            <div className='SignIn'>
                <Paper className={this.getCssClass().root} elevation={4}>
                    <Typography className={this.getCssClass().header} variant="headline" component="h1">
                        Sign In to your account
                    </Typography>
                    <hr />
                    <Typography className={this.getCssClass().paragraph} component="p">
                        Start using ShallWe with following service
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
const SignInWithStyleAndRedirect = withRouter(signInWithStyle);
export { SignInWithStyleAndRedirect as SignIn }; 