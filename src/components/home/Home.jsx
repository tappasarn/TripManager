import React, { Component } from 'react';
import { connect } from 'react-redux';
// own component
import { withAuthorization } from '../withAuthorization';
import { withNavigator } from '../withNavigator';
// share component
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// services
import { getUserPromise, getTripsNameAndDatesPromise } from '../../javascripts/trips';
// TODO: fetch user trips according to UID in redux state here
// should be done in component did mount
const styles = theme => ({
  root: {
    textAlign: 'left',
    position: 'fixed',
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
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
    }
  }

  componentDidMount() {
    getTripsNameAndDatesPromise(this.props.userId).then(tripInfos => {
      const convertedTripInfo = tripInfos.map(tripInfo => tripInfo.val());
      this.setState({
        trips: convertedTripInfo,
      });
    });

  }
  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root} subheader={<li />}>
        {this.state.trips.map(tripsId => (
          <li key={`section-${tripsId.id}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{`trip name: ${tripsId.name}`}</ListSubheader>
              {tripsId.dates.map(date => (
                <ListItem key={`item-${tripsId.id}-${date}`}>
                  <ListItemText primary={`${date}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
      // <List className={classes.root} subheader={<li />}>
      //   {[0, 1, 2, 3, 4, 5].map(sectionId => (
      //     <li key={`section-${sectionId}`} className={classes.listSection}>
      //       <ul className={classes.ul}>
      //         <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
      //         {[0, 1, 2].map(item => (
      //           <ListItem key={`item-${sectionId}-${item}`}>
      //             <ListItemText primary={`Item ${item}`} />
      //           </ListItem>
      //         ))}
      //       </ul>
      //     </li>
      //   ))}
      // </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.authUser.id,
  };
};

const homeWithRedux = connect(mapStateToProps)(Home);
const homeWithStyle = withStyles(styles)(homeWithRedux);
const authCondition = (authUser) => !!authUser;
const homeWithAuthorization = withAuthorization(authCondition)(homeWithStyle);
const homeWithAuthorizationAndNavigator = withNavigator('Home')(homeWithAuthorization);

export { homeWithAuthorizationAndNavigator as Home };
