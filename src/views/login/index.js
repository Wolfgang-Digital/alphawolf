import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { awarewolfAPI } from '../../utils';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    success: false
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    awarewolfAPI.login({ email, password })
      .then(res => {
        if (res.success) {
          this.props.userLogin(res.data);
        } else {

        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { email, password } = this.state;
    return (
      <LoginForm
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired
};

export default Login;