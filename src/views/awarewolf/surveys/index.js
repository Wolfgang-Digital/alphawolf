import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { awarewolfAPI, errorHandler, constants, format } from '../../../utils';
import { Button } from '@material-ui/core';
import { ResultsTable } from '../../../components';

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
  { id: 'numQuestions', numeric: true, disablePadding: false, label: 'Questions' },
  { id: 'numResponses', numeric: true, disablePadding: false, label: 'Responses' }
];

class Surveys extends Component {
  state = {
    surveys: [],
    loading: false
  };

  componentDidMount() {
    const { user, enqueueSnackbar } = this.props;

    this.setState({ loading: true }, async () => {

      this.timer = setTimeout(() => {
        this.setState({ loading: false });
        enqueueSnackbar('Connection timeout.', snackbarOptions);
      }, constants.FETCH_TIMEOUT);

      const res = await awarewolfAPI.fetchData({
        endpoint: 'surveys',
        token: user.token
      });

      clearTimeout(this.timer);
      this.setState({ loading: false });

      if (res && res.success) {
        this.setState({
          surveys: res.data.map(n => {
            return {
              _id: n._id,
              date: Date.parse(n.createdAt),
              title: n.title,
              author: format.toTitleCase(n._author.username),
              numQuestions: n.questions.length,
              numResponses: n.userResponses.length
            }
          })
        });
      } else {
        const error = errorHandler.parseServerMessage(res);
        enqueueSnackbar(error, snackbarOptions);
      }
    });
  }

  render() {
    const { surveys, loading } = this.state;

    return (
      <ResultsTable
        tableTitle='Survey Results'
        data={surveys}
        rows={rows}
        loading={loading}
      />
    );
  }
}

Surveys.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(Surveys);