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
              score: votes.score
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