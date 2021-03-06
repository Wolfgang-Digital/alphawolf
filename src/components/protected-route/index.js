import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { constants } from '../../utils';

const snackbarOptions = {
  variant: 'warning',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: constants.SNACKBAR_DURATION,
  action: <Button size="small">Dismiss</Button>
};

const styles = () => ({
  wrapper: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    margin: 'auto'
  }
});

class ProtectedRoute extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    if (this.props.timeout) {
      this.timer = setTimeout(() => {
        this.setState({ timedOut: true });
        if (!this.props.isAuthorised) this.props.enqueueSnackbar('You must be logged in to view this page.', snackbarOptions);
      }, this.props.timeout);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { component: Component, redirectTo, isAuthorised, timeout, classes, ...rest } = this.props;
    
    if (!isAuthorised && timeout && !this.state.timedOut) {
      return (
        <div className={classes.wrapper}>
          <CircularProgress size={52} className={classes.progress} />
        </div>
      );
    }

    return (
      <Route
        {...rest}
        render={props =>
          isAuthorised ? <Component {...props} /> :
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location }
            }}
          />
        }
      />
    );
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  isAuthorised: PropTypes.bool.isRequired,
  timeout: PropTypes.number
};

export default withStyles(styles)(withSnackbar(ProtectedRoute));