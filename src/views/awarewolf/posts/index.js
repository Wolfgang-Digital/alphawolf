import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants } from '../../../utils';
import { Button } from '@material-ui/core';
import PostTable from './PostTable';

const snackbarOptions = {
  variant: 'error',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: constants.SNACKBAR_DURATION,
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
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, constants.FETCH_TIMEOUT);

      const res = await awarewolfAPI.fetchData({
        endpoint: 'posts',
        token: user.token
      });

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res && res.success) {
        this.setState({ posts: res.data });
      } else {
        const error = errorHandler.parseServerMessage(res);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <PostTable
        posts={posts}
        loading={loading}
      />
    );
  }
}

Posts.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(Posts);