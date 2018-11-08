import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { awarewolfAPI, errorHandler, constants } from '../../utils';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const snackbarOptions = {
  variant: 'error',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: 2000,
  action: <Button size="small">Dismiss</Button>
};

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, loading } = this.state;
    const { enqueueSnackbar, userLogin, history } = this.props;

    if (!loading) {
      this.setState({ loading: true, error: '' }, async () => {

        this.timer = setTimeout(() => {
          this.setState({ loading: false });
          enqueueSnackbar('Connection timeout.', snackbarOptions);
        }, constants.LOGIN_TIMEOUT);

        const res = await awarewolfAPI.login({ email, password });

        clearTimeout(this.timer);
        this.setState({ loading: false });

        if (res.success) {
          if (res.data.roles.includes('admin')) {
            userLogin(res.data);
            history.push('/manage-posts');
          } else {
            enqueueSnackbar('Unauthorised access.', snackbarOptions);
          }
        } else {
          const error = errorHandler.parseServerMessage(res);
          enqueueSnackbar(error, snackbarOptions);
        }
      });
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <LoginForm
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        loading={loading}
      />
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withRouter(withSnackbar(Login));