import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants, format } from '../../../utils';
import { Button } from '@material-ui/core';
import { ResultsTable } from '../../../components';
import Actions from './Actions';

const snackbarOptions = {
  variant: 'error',
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top'
  },
  autoHideDuration: constants.SNACKBAR_DURATION,
  action: <Button size="small">Dismiss</Button>
};

const rows = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'numComments', numeric: true, disablePadding: false, label: 'Comments' },
  { id: 'likes', numeric: true, disablePadding: false, label: 'Likes' },
  { id: 'dislikes', numeric: true, disablePadding: false, label: 'Dislikes' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Score' },
  { id: 'actions', numeric: true, disablePadding: false, label: '' }
];

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
        this.setState({
          posts: res.data.map(n => {
            const votes = format.countVotes(n._votes);
            return {
              _id: n._id,
              date: Date.parse(n.createdAt),
              title: n.title,
              author: format.toTitleCase(n._author.username),
              numComments: format.countChildren(n._comments),
              likes: votes.likes,
              dislikes: votes.dislikes,
              score: votes.score,
              isPinned: n.isPinned,
              isResolved: n.isResolved
            }
          })
        });
      } else {
        const error = errorHandler.parseServerMessage(res);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  openPost = id => {
    window.open(`https://awarewolf.netlify.com/posts/${id}`, '_blank');
  };

  pinPost = async id => {
    const { enqueueSnackbar, user } = this.props;

    const res = await awarewolfAPI.makeRequest({
      endpoint: `/api/posts/${id}/pin`,
      payload: {
        method: 'PUT',
        headers: {
          token: user.token
        }
      }
    });

    if (res && res.success) {
      const { posts } = this.state;
      const votes = format.countVotes(res.data._votes);
      const post = {
        _id: res.data._id,
        date: Date.parse(res.data.createdAt),
        title: res.data.title,
        author: format.toTitleCase(res.data._author.username),
        numComments: format.countChildren(res.data._comments),
        likes: votes.likes,
        dislikes: votes.dislikes,
        score: votes.score,
        isPinned: res.data.isPinned,
        isResolved: res.data.isResolved
      };

      const index = posts.findIndex(n => n._id === id);
      posts.splice(index, 1, post); 
      this.setState({ posts: [...posts] });

      const options = Object.assign({}, snackbarOptions, { variant: 'success' });
      enqueueSnackbar(res.message, options);
    }
  };

  resolvePost = async id => {
    const { enqueueSnackbar, user } = this.props;

    const res = await awarewolfAPI.makeRequest({
      endpoint: `/api/posts/${id}/resolve`,
      payload: {
        method: 'PUT',
        headers: {
          token: user.token
        }
      }
    });

    if (res && res.success) {
      const { posts } = this.state;
      const votes = format.countVotes(res.data._votes);
      const post = {
        _id: res.data._id,
        date: Date.parse(res.data.createdAt),
        title: res.data.title,
        author: format.toTitleCase(res.data._author.username),
        numComments: format.countChildren(res.data._comments),
        likes: votes.likes,
        dislikes: votes.dislikes,
        score: votes.score,
        isPinned: res.data.isPinned,
        isResolved: res.data.isResolved
      };

      const index = posts.findIndex(n => n._id === id);
      posts.splice(index, 1, post); 
      this.setState({ posts: [...posts] });

      const options = Object.assign({}, snackbarOptions, { variant: 'success' });
      enqueueSnackbar(res.message, options);
    }
  };

  render() {
    const { posts, loading } = this.state;

    return (
      <ResultsTable
        tableTitle='Manage Posts'
        data={posts}
        rows={rows}
        loading={loading}
        actionBar={Actions}
        openInApp={this.openPost}
        pinPost={this.pinPost}
        resolvePost={this.resolvePost}
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