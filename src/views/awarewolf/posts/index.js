import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler } from '../../../utils';
import { Button } from '@material-ui/core';
import { Menu } from '../../../components';

const TIMEOUT = 1000 * 5;

const snackbarOptions = {
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: 2000,
  action: <Button size="small">Dismiss</Button>
};

class Posts extends Component {
  state = {
    posts: [],
    loading: false
  };

  async componentDidMount() {
    const { user, enqueueSnackbar } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false });
        snackbarOptions.variant = 'error';
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, TIMEOUT);

      const res = await awarewolfAPI.fetchPosts(user.token);

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res.success) {
        this.setState({ posts: res.data });
      } else {
        const error = errorHandler.parseServerMessage(res.messages);
        snackbarOptions.variant = 'error';
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  render() {
    return (
      <Menu>
        {this.state.posts.map((n, i) => <li key={i}>{n.title}</li>)}
      </Menu>
    );
  }
}

Posts.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired
};

export default withSnackbar(Posts);