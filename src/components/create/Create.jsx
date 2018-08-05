import React from 'react';
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    marginBottom: '40px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 200px',
  },
  dateContainer: {
    marginRight: '20px',
  }
});

const GetTodayDate = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  return {
    date: dd,
    month: mm,
    year: today.getFullYear(),
  }
}
const Create = (props) => {
  const { classes } = props;
  const today = GetTodayDate();
  console.log(`${today.year}-${today.month}-${today.date}`);
  return (
    <div className='Create'>
      <Paper className={classes.root} elevation={4}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="trip-name"
            label="Your trip name"
            className={classes.textField}
            margin="normal"
          />
          <div className={classes.dateContainer}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              defaultValue={`${today.year}-${today.month}-${today.date}`}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="start-time"
              label="Start Time"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          <div>
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              defaultValue={`${today.year}-${today.month}-${today.date}`}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end-time"
              label="End Time"
              type="time"
              defaultValue="08:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
        </form>
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