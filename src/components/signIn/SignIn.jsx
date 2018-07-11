import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { signInWithGmailAcc } from '../../javascripts/auth';
import { withRouter } from 'react-router-dom';
import * as route from '../../constant/routes';
import { getFireBaseAuthObject } from '../../javascripts/firebase';
import { connect } from 'react-redux';
import { addAuthUser } from '../../actions/actionCreator';

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
        [theme.breakpoints.down('xs')]: {
            width: '18em',
            height: '17em',
            marginTop: '-13.5em',
            marginLeft: '-10em',
        }
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
            backgroundColor: '#dd4b39',
            color: 'white',
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
                // Sync FireBase authUser object and Redux authUser object here
                // TODO: this logic need to be moved to a better place
                if (!this.props.authUser) {
                    const customAuthUser = {
                        uid: authUser.uid,
                        name: authUser.displayName,
                    };
                    this.props.addAuthUser(customAuthUser);
                }
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
        signInWithGmailAcc()
            .then(authUser => {
                const customAuthUser = {
                    uid: authUser.user.uid,
                    name: authUser.user.displayName,
                };
                this.props.addAuthUser(customAuthUser);
                // no need to redirect to home page here
                // it is already handled in componentDidMount
            })
            .catch((e) => {
                this.props.addAuthUser(null);
            });
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
                        Start using WhosGone with following service
                    </Typography>
                    <Button variant="outlined" className={this.getCssClass().button} onClick={this.onSignIn}>
                        Sign In with Google
                    </Button>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.user.authUser,
    };
};

const mapDispatchToProps = dispatch => ({
    addAuthUser: value => dispatch(addAuthUser(value))
});

const signInWithStyle = withStyles(styles)(SignIn);
const SignInWithStyleAndRedirect = withRouter(signInWithStyle);
const SignInWithRedux = connect(mapStateToProps, mapDispatchToProps)(SignInWithStyleAndRedirect);

export { SignInWithRedux as SignIn };
