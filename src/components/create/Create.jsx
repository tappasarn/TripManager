import React, {Component} from 'react';
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    [theme.breakpoints.down('xs')]: {
      padding: '20px 50px',
    },
  },
  dateContainerLeft: {
    marginRight: '20px',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    border: '1px solid #303f9f',
    color: '#303f9f',
    '&:hover': {
      backgroundColor: '#303f9f',
      color: 'white',
    },
  },
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
class Create extends Component {
  constructor(props){
    super(props);
    this.state = {
      tripName: '',
      startDate: '',
      startTime: '07:30',
      endDate: '',
      endTIme: '08:30',
    }
  }
  handleChangeHof = (name) => {
    return (event) => {
      this.setState({[name]: event.target.value});
    }
  }
  // defaultValue={`${today.year}-${today.month}-${today.date}`}
  render() {
    const { classes } = this.props;
    const today = GetTodayDate();
    return (
      <div className='Create'>
        <Paper className={classes.root} elevation={4}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="trip-name"
              label="Your trip name"
              className={classes.textField}
              margin="normal"
              value={this.state.tripName}
              onChange={this.handleChangeHof('tripName')}
            />
            <div className={classes.dateContainerLeft}>
              <TextField
                id="start-date"
                label="Start Date"
                type="date"   
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.startDate}
                onChange={this.handleChangeHof('startDate')}
              />
              <TextField
                id="end-date"
                label="End Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.endDate}
                onChange={this.handleChangeHof('endDate')}
              />
            </div>
            <div>
            <TextField
                id="start-time"
                label="Start Time"
                type="time"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                value={this.state.startTime}
                onChange={this.handleChangeHof('startTime')}
              />
              <TextField
                id="end-time"
                label="End Time"
                type="time"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                value={this.state.endTIme}
                onChange={this.handleChangeHof('endTIme')}
              />
            </div>
            <Button variant="outlined" className={classes.button} onClick={this.onSignIn}>
              Create Your Trip
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

Create.displayName = 'Create';

const authCondition = (authUser) => !!authUser;
const CreateWithStyle = withStyles(styles)(Create);
const createWithAuthorization = withAuthorization(authCondition)(CreateWithStyle);
const createWithAuthorizationAndNavigator = withNavigator('Create')(createWithAuthorization);

export { createWithAuthorizationAndNavigator as Create };