import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: 'auto',
  }
});

class ProtectedRoute extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    if (this.props.timeout) {
      this.timerId = setTimeout(() => {
        this.setState({ timedOut: true });
        this.timerId = 0;
      }, this.props.timeout);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  render() {
    const { component: Component, redirectTo, isAuthorised, timeout, classes, ...rest } = this.props;
    
    if (!isAuthorised && timeout && !this.state.timedOut) {
      return <CircularProgress className={classes.progress} />
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

export default withStyles(styles)(ProtectedRoute);