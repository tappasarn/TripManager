import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withAuthorization } from '../withAuthorization';
import { signOut } from '../../javascripts/auth';
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

const Home = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <i className="fas fa-bars"></i>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            WhosGone's Home
          </Typography>
          <Button color="inherit" onClick={signOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Home.displayName = 'Home';

const homeWithStyle = withStyles(styles)(Home);

const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(homeWithStyle);
export { homeWithAuthorization as Home };