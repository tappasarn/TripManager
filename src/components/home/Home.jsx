import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withAuthorization } from '../withAuthorization';
import { signOut } from '../../javascripts/auth';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
};

class Home extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
     console.log('call');
    this.setState({
      [side]: open,
    });
  };

  mockListItem = () => {
    return (
      <ListItem button>
        <ListItemIcon>
          <i className="fab fa-angellist"></i>
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
    );
  }

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          {this.mockListItem()}
          {this.mockListItem()}
          {this.mockListItem()}
          {this.mockListItem()}
          {this.mockListItem()}
        </List>
        <Divider />
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <i className="fas fa-bars"></i>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              WhosGone's Home
          </Typography>
            <Button color="inherit" onClick={signOut}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  };
}

Home.displayName = 'Home';

const homeWithStyle = withStyles(styles)(Home);

const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(homeWithStyle);
export { homeWithAuthorization as Home };