import React from 'react';
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: theme.mixins.gutters({
    textAlign: 'left',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60em',
    height: '40em',
    marginTop: '-18em', /*set to a negative number 1/2 of your height*/
    marginLeft: '-30em', /*set to a negative number 1/2 of your width*/
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '92vh',
      marginTop: 0,
      marginLeft: 0,
      position: 'relative',
      top: 0,
      left: 0,
    },
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  }),
});

const Create = (props) => {
  const { classes } = props;
  return (
    <div className='Create'>
      <Paper className={classes.root} elevation={4}>
      </Paper>
    </div>
  );
}

Create.displayName = 'Create';

const authCondition = (authUser) => !!authUser;
const CreateWithStyle = withStyles(styles)(Create);
const createWithAuthorization = withAuthorization(authCondition)(CreateWithStyle);
const createWithAuthorizationAndNavigator = withNavigator('Create')(createWithAuthorization);

export { createWithAuthorizationAndNavigator as Create };