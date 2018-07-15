import React from 'react';
// shared component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
// redux
import { Link } from 'react-router-dom';
// own component
import { signOut } from '../javascripts/auth';
import * as route from '../constant/routes';

// styles constant
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        backgroundColor: 'black',
    },
    link: {
        textDecoration: 'none',
    }
};

const withNavigator = (pageName) => Component => {
    class WithNavigator extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isDrawerOpen: false,
            }
        }
        toggleDrawer = isOpen => () => {
            this.setState({
                isDrawerOpen: isOpen,
            });
        }
        getToggleSideList = () => {
            return (
                <List>
                    <ListItem button={false}>
                        <ListItemText primary="WhoIsGone" />
                    </ListItem>
                    <Divider />
                    <Link to={route.HOME} className={this.props.classes.link}>
                        <ListItem button>
                                <ListItemIcon>
                                    <i className="fas fa-home"></i>
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    <Link to={route.CREATE} className={this.props.classes.link}>
                        <ListItem button>
                                <ListItemIcon>
                                    <i className="fas fa-plus-circle"></i>
                                </ListItemIcon>
                                <ListItemText primary="Create" />
                        </ListItem>
                    </Link>
                </List>
            );
        }

        // Navigator consis of AppBar and Drawer
        // these two are page skeleton
        // TODO: should clear user in redux everytime signout perform
        render() {
            const { classes } = this.props;
            return (
                <div>
                    <div className={classes.root}>
                        <AppBar position="static" className={classes.appBar}>
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                                    <i className="fas fa-bars"></i>
                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                    {pageName}
                        </Typography>
                                <Button color="inherit" onClick={signOut}>Logout</Button>
                            </Toolbar>
                        </AppBar>
                        <Drawer open={this.state.isDrawerOpen} onClose={this.toggleDrawer(false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                            >
                                {this.getToggleSideList()}
                            </div>
                        </Drawer>
                    </div>
                    <Component/>
                </div>
            );
        }
    }
    const navigatorWithStyle = withStyles(styles)(WithNavigator);
    return navigatorWithStyle;
}

export { withNavigator };